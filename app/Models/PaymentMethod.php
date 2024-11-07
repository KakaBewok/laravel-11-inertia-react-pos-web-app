<?php

namespace App\Models;

use App\Observers\PaymentMethodObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([PaymentMethodObserver::class])]
class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'bank_name',
        'bank_logo',
        'qris_image',
        'status',
        'is_cash',
        'description',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
