<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_method_id',
        'customer_name',
        'order_date',
        'total_amount',
        'status'
    ];

    protected $casts = [
        'order_date' => 'date'
    ];

    public function paymentMethod(): BelongsTo
    {
        return $this->BelongsTo(PaymentMethod::class);
    }

    public function orderProducts(): HasMany
    {
        return $this->HasMany(OrderProduct::class);
    }
}
