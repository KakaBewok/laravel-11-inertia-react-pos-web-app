<?php

namespace App\Services;

use App\Repositories\CategoryRepo;
use Illuminate\Support\Facades\Log;
use App\Models\Category;

class CategoryService
{
    protected $categoryRepository;

    // Constructor injection
    public function __construct(CategoryRepo $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function store(array $validatedData)
    {
        try {
            $this->categoryRepository->store([
                'name' => $validatedData['name'],
                'description' => $validatedData['description'] ?? "",
            ]);
        } catch (\Exception $e) {
            Log::error('Error when creating category: ' . $e->getMessage());
        }
    }

    public function getAllCategories()
    {
        return $this->categoryRepository->all();
    }

    public function update(Category $category, array $data)
    {
        try {
            // Update existing category fields
            $updatedCategory = [
                'name' => $data['name'],
                'description' => $data['description'] ?? ''
            ];
            $this->categoryRepository->update($category->id, $updatedCategory);
        } catch (\Exception $e) {
            Log::error('Error when updating category: ' . $e->getMessage());
        }
    }

    public function delete(int $id)
    {
        try {
            return $this->categoryRepository->delete($id);
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
            return $this->categoryRepository->deleteMany($ids);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'ids' => $ids,
                'error_message' => $e->getMessage(),
            ]);
        }
    }
}
