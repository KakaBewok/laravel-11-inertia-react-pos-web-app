<?php

namespace App\Observers;

use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class CategoryObserver
{
    /**
     * Handle the Category "deleting" event.
     */
    public function deleting(Category $category): void
    {
        if($category->products->isNotEmpty()){
            foreach ($category->products as $product) {
                if ($product->photos->isNotEmpty()) {
                    foreach ($product->photos as $photo) {
                        if (Storage::disk('public')->exists($photo->photo)) {
                            Storage::disk('public')->delete($photo->photo);
                        }
                    }
                }
            }
        }
    }
}
