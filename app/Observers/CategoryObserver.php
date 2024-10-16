<?php

namespace App\Observers;

use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class CategoryObserver
{
    /**
     * Handle the Category "created" event.
     */
    public function created(Category $category): void
    {
        //
    }

    /**
     * Handle the Category "updated" event.
     */
    public function updated(Category $category): void
    {
        //
    }

    /**
     * Handle the Category "deleted" event.
     */
    public function deleted(Category $category): void
    {
        if ($category->products->isNotEmpty()) {
            $category->products->each(function ($product) {
                if ($product->photos->isNotEmpty()) {
                    $product->photos->each(function ($photo) {
                        if (Storage::disk('public')->exists($photo->photo)) {
                            Storage::disk('public')->delete($photo->photo);
                        }
                    });
                }
            });
        }
    }

    /**
     * Handle the Category "restored" event.
     */
    public function restored(Category $category): void
    {
        //
    }

    /**
     * Handle the Category "force deleted" event.
     */
    public function forceDeleted(Category $category): void
    {
        //
    }
}
