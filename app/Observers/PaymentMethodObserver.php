<?php

namespace App\Observers;

use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Storage;

class PaymentMethodObserver
{
    /**
     * Handle the Product "deleting" event.
     */
    public function deleting(PaymentMethod $paymentMethod): void
    {
        $bank_logo = $paymentMethod->bank_logo;
        $qris_image = $paymentMethod->qris_image;
        
        if (!empty($bank_logo) && Storage::disk('public')->exists($bank_logo)) {
            Storage::disk('public')->delete($bank_logo);
        }
        if (!empty($qris_image) && Storage::disk('public')->exists($qris_image)) {
            Storage::disk('public')->delete($qris_image);
        }
    }
}
