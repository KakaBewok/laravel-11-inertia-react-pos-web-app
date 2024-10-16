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

            $product = Product::create([
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
            $this->productRepository->update($product->id, $data);
        } catch (\Exception $e) {
            Log::error('Error when updating product: '. $e->getMessage());
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
