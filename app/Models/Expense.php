<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'amount',
        'description',
        'expense_date'
    ];

    protected $casts = [
        'expense_date' => 'date'
    ];

    public function getExpenseDateAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
}
