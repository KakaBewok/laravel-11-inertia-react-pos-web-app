<?php

namespace App\Services;

use App\Repositories\CategoryRepo;
use Illuminate\Support\Facades\Log;

class CategoryService
{
    protected $categoryRepository;

    // Constructor injection
    public function __construct(CategoryRepo $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAllCategories()
    {
        return $this->categoryRepository->all();
    }

    public function delete(int $id)
    {
        try {
            return $this->categoryRepository->delete($id);
            Log::info("Deleted category id: ", $id);
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
            Log::info("Deleted category ids: ", $ids);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'ids' => $ids,
                'error_message' => $e->getMessage(),
            ]);
        }
    }
}
