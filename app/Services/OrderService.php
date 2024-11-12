<?php

namespace App\Services;

use App\Repositories\OrderRepo;
use App\Models\Order;

class OrderService
{
    protected $orderRepository;

    public function __construct(OrderRepo $orderRepository)
    {
        $this->orderRepository = $orderRepository;
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
}
