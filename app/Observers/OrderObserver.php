<?php

namespace App\Observers;

use App\Models\Order;
use Illuminate\Support\Str;

class OrderObserver
{
    public function creating(Order $order)
    {
        if (empty($order->transaction_id)) {
            $order->transaction_id = (string) Str::uuid();
        }
    }
}
