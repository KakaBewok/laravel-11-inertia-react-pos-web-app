<?php

namespace App\Services;

use App\Models\Order;
use App\Repositories\OrderProductRepo;
use App\Repositories\OrderRepo;
use App\Repositories\ProductRepo;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class OrderService
{
    protected $orderRepository;
    protected $productRepository;
    protected $orderProductRepository;

    public function __construct(OrderRepo $orderRepository, ProductRepo $productRepository, OrderProductRepo $orderProductRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
        $this->orderProductRepository = $orderProductRepository;
    }

    public function store(array $validatedData)
    {
        try {
            DB::transaction(function () use ($validatedData) {
                $orderData = $this->prepareOrderData($validatedData);
                $newOrder = $this->orderRepository->store($orderData);
                $orderProducts = $this->prepareOrderProducts($validatedData['items'], $newOrder->id, $validatedData['status']);

                foreach ($orderProducts as $orderProduct) {
                    $this->orderProductRepository->store($orderProduct);
                }

                Log::info('Order created successfully: ' . $newOrder->transaction_id);

                // Generate PDF Invoice
                $pdf = Pdf::loadView('invoices.template', compact('newOrder'));
                $filePath = 'invoices/invoice-' . $newOrder->transaction_id . '.pdf';

                Storage::disk('public')->put($filePath, $pdf->output()); // Save PDF to storage

                return response()->json([
                    'message' => 'Order created successfully.',
                    'invoice_url' => Storage::url($filePath), // Return the accessible URL
                ]);
            });
        } catch (\Exception $e) {
            Log::error('Error when creating order: ' . $e->getMessage());
        }
    }

    protected function prepareOrderData(array $data): array
    {
        $isUnpaid = $data['status'] === 'Pending' || $data['status'] === 'Cancelled';
        return [
            'payment_method_id' => $data["payment_method_id"],
            'customer_name' => $data["customer_name"],
            'order_date' => $data["order_date"],
            'total_amount' => $data["total_amount"],
            'changes' => $isUnpaid ? 0 : $data['changes'],
            'status' => $data["status"],
            'notes' => $data["notes"] ?? "",
            'total_paid' => $isUnpaid ? 0 : ($data['total_amount'] + $data['changes']),
        ];
    }

    protected function prepareOrderProducts(array $items, string $orderId, string $status): array
    {
        $orderProducts = [];
        foreach ($items as $item) {
            $product = $this->productRepository->find($item['product_id']);
            if (!$product) {
                throw new \Exception('Product not found: ' . $item['product_id']);
            }

            if ($status === 'Paid') {
                $this->checkAndUpdateStock($product, $item['quantity']);
            }

            // Append to order products array
            $orderProducts[] = [
                'order_id' => $orderId,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['quantity'] * $product->price,
            ];
        }
        return $orderProducts;
    }

    protected function checkAndUpdateStock($product, int $quantity): void
    {
        if ($product->stock_quantity < $quantity) {
            throw new \Exception('Insufficient stock for product: ' . $product->name);
        }
        $product->decrement('stock_quantity', $quantity);
    }

    public function getAllOrders()
    {
        return $this->orderRepository->all();
    }

    public function mappingProductsDetails(Order $order)
    {
        $productsOrdered = [];
        foreach ($order->orderProducts as $orderProduct) {
            $product = $orderProduct->product;
            $productsOrdered[] = [
                'id' => $orderProduct->id,
                'product_name' => $product->name,
                'price' => $product->price,
                'unit' => $product->unit,
                'quantity' => $orderProduct->quantity,
                'total_price' => $orderProduct->price,
            ];
        }
        return $productsOrdered;
    }

    public function mappingProductsEdit(Order $order)
    {
        $productsOrdered = [];
        foreach ($order->orderProducts as $orderProduct) {
            $product = $orderProduct->product;
            $productsOrdered[] = [
                'id' => $product->id,
                'product_name' => $product->name,
                'price' => $product->price,
                'unit' => $product->unit,
                'quantity' => $orderProduct->quantity,
                'total_price' => $orderProduct->price,
                'photos' => $product->photos
            ];
        }
        return $productsOrdered;
    }

    public function update(int $orderId, array $validatedData)
    {
        try {
            DB::transaction(function () use ($orderId, $validatedData) {
                $existingOrder = $this->orderRepository->find($orderId);
                if (!$existingOrder) {
                    throw new \Exception("Order not found: " . $orderId);
                }

                $orderData = $this->prepareOrderData($validatedData);
                $this->orderRepository->update($orderId, $orderData);

                $this->orderProductRepository->deleteByOrderId($orderId);

                $orderProducts = $this->prepareOrderProducts($validatedData['items'], $orderId, $validatedData['status']);
                foreach ($orderProducts as $orderProduct) {
                    $this->orderProductRepository->store($orderProduct);
                }

                Log::info('Order updated successfully: ' . $existingOrder->transaction_id);
            });
        } catch (\Exception $e) {
            Log::error('Error when updating order: ' . $e->getMessage());
        }
    }

    public function delete(int $id)
    {
        try {
            $this->orderRepository->delete($id);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'id' => $id,
                'error_message' => $e->getMessage(),
            ]);
        }
    }

    public function multipleDelete(array $ids)
    {
        try {
            $this->orderRepository->deleteMany($ids);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'ids' => $ids,
                'error_message' => $e->getMessage(),
            ]);
        }
    }
}
