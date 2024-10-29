<?php

namespace App\Services;

use App\Repositories\OrderRepo;

class OrderService {
    protected $orderRepository;

    public function __construct(OrderRepo $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    public function getAllOrders() {
        return $this->orderRepository->all();
    }
}
