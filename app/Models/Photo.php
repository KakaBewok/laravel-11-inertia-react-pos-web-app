<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo',
        'product_id'
    ];

    public function product(): BelongsTo
    {
        return $this->BelongsTo(Product::class, 'product_id');
    }
}
