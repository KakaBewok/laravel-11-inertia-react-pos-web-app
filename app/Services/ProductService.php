<?php

namespace App\Services;

use App\Repositories\ProductRepo;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    protected $productRepository;

    // Constructor injection
    public function __construct(ProductRepo $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function store(array $validatedData)
    {
        try {
            $photoPaths = [];
            if (!empty($validatedData['photos'])) {
                foreach ($validatedData['photos'] as $photo) {
                    if ($photo instanceof UploadedFile) {
                        // store image to storage/public/images
                        $photoPath = $photo->store('images', 'public');
                        $photoPaths[] = $photoPath;
                    } else {
                        $photoPaths[] = $photo;
                    }
                }
            }

            $product = $this->productRepository->store([
                'name' => $validatedData['name'],
                'price' => $validatedData['price'],
                'category_id' => $validatedData['category_id'],
                'description' => $validatedData['description'] ?? "",
                'unit' => $validatedData['unit'],
                'stock_quantity' => $validatedData['stock_quantity'],
            ]);

            if (!empty($photoPaths)) {
                $product->photos()->createMany(
                    array_map(function ($path) {
                        return ['photo' => $path];
                    }, $photoPaths)
                );
            }
        } catch (\Exception $e) {
            Log::error('Error when creating product: ' . $e->getMessage());
        }
    }

    public function getAllProducts()
    {
        return $this->productRepository->all();
    }

    public function getDetailProduct(int $id)
    {
        return $this->productRepository->find($id);
    }

    public function update(Product $product, array $data)
    {
        try {
            // Update existing product fields
            $updatedProduct = [
                'name' => $data['name'],
                'price' => $data['price'],
                'category_id' => $data['category_id'],
                'description' => $data['description'] ?? '',
                'unit' => $data['unit'],
                'stock_quantity' => $data['stock_quantity'],
            ];
            $this->productRepository->update($product->id, $updatedProduct);

            // Handle photos
            $photoPaths = [];
            if (!empty($data['photos'])) {
                foreach ($data['photos'] as $photo) {
                    if ($photo instanceof UploadedFile) {
                        // If it's a new photo, store the image to storage/public/images
                        $photoPath = $photo->store('images', 'public');
                        $photoPaths[] = $photoPath;
                    } else {
                        // If it's an existing photo, keep the original path
                        $photoPaths[] = $photo;
                    }
                }
            } else {
                // If no photos are uploaded, delete all existing photos
                $existingPhotos = $product->photos()->pluck('photo')->toArray();
                foreach ($existingPhotos as $oldPhoto) {
                    if (Storage::disk('public')->exists($oldPhoto)) {
                        Storage::disk('public')->delete($oldPhoto); // Delete the old photo file
                    }
                }
                // Delete from the database
                $product->photos()->delete();
            }   

            // Sync photos: remove old ones and add new ones
            if (!empty($photoPaths)) {
                // Delete old photos that are not included in the updated list
                $existingPhotos = $product->photos()->pluck('photo')->toArray();
                $photosToDelete = array_diff($existingPhotos, $photoPaths);
                if (!empty($photosToDelete)) {
                    foreach ($photosToDelete as $oldPhoto) {
                        if (Storage::disk('public')->exists($oldPhoto)) {
                            Storage::disk('public')->delete($oldPhoto); // Delete the old photo file
                        }
                    }
                    // Delete from the database
                    $product->photos()->whereIn('photo', $photosToDelete)->delete();
                }

                // Add new photos that are not yet in the database
                foreach ($photoPaths as $path) {
                    if (!in_array($path, $existingPhotos)) {
                        $product->photos()->create(['photo' => $path]);
                    }
                }
            }
        } catch (\Exception $e) {
            Log::error('Error when updating product: ' . $e->getMessage());
        }
    }

    public function delete(int $id)
    {
        try {
            $this->productRepository->delete($id);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'id' => $id,
                'error_message' => $e->getMessage(),
            ]);
        }
    }

    public function multipleDelete(array $ids)
    {
        try {
            $this->productRepository->deleteMany($ids);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'ids' => $ids,
                'error_message' => $e->getMessage(),
            ]);
        }
    }
}
