<?php

namespace App\Services;

use App\Repositories\OrderRepo;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class OrderService
{
    protected $orderRepository;

    public function __construct(OrderRepo $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function store(array $validatedData)
    {
        //  protected $fillable = [
        //     'payment_method_id', --
        //     'customer_name', --
        //     'order_date', --
        //     'total_amount', --
        //     'total_paid', --
        //     'changes', --
        //     'status', --
        //     'notes', --
        //     'transaction_id' --
        // ];

        try {
            // 1. buat data total_paid = total_amount + changes --
            // 2. edit field stock di data product (jika statusnya completed), stock = stock - quantity yang dibeli
            // 3. kumpulkan semua field di variable --
            // 4. simpan ke db dengan db::transaction()
            // 5. simpan juga di order_product
            // 6. logs
            DB::transaction(function () use ($validatedData) {

                $orderData = [
                    'payment_method_id' => $validatedData["payment_method_id"],
                    'customer_name' => $validatedData["customer_name"],
                    'order_date' => $validatedData["order_date"],
                    'total_amount' => $validatedData["total_amount"],
                    'changes' => $validatedData["changes"],
                    'status' => $validatedData["status"],
                    'notes' => $validatedData["notes"] ?? "",
                    'transaction_id' => $validatedData["transaction_id"],
                    'total_paid' => $validatedData["total_amount"] + $validatedData["changes"]
                ];

                $this->orderRepository->store($orderData);
            });

            // DB::transaction(function () use ($request, $product) {
            //     $validated = $request->validated();

            //     if ($request->hasFile('thumbnail')) {
            //         $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
            //         $validated['thumbnail'] = $thumbnailPath;
            //     }

            //     $product->update($validated);
            // });

            // return redirect()->route('admin.products.index');

        } catch (\Exception $e) {
            Log::error('Error when creating order: ' . $e->getMessage());
        }
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
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'unit' => $product->unit,
                'stock_quantity' => $orderProduct->quantity,
                'category_id' => $product->category_id,
            ];
        }
        return $productsOrdered;
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
