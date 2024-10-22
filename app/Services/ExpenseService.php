<?php

namespace App\Services;

use App\Repositories\ExpenseRepo;
use Illuminate\Support\Facades\Log;
use App\Models\Expense;

class ExpenseService
{
    protected $expenseRepository;

    // Constructor injection
    public function __construct(ExpenseRepo $expenseRepository)
    {
        $this->expenseRepository = $expenseRepository;
    }

    public function store(array $validatedData)
    {
        // try {
        //     $this->categoryRepository->store([
        //         'name' => $validatedData['name'],
        //         'description' => $validatedData['description'] ?? "",
        //     ]);
        // } catch (\Exception $e) {
        //     Log::error('Error when creating category: ' . $e->getMessage());
        // }
    }

    public function getAllExpenses()
    {
        return $this->expenseRepository->all();
    }

    public function update(Expense $expense, array $data)
    {
        // try {
        //     // Update existing category fields
        //     $updatedCategory = [
        //         'name' => $data['name'],
        //         'description' => $data['description'] ?? ''
        //     ];
        //     $this->categoryRepository->update($category->id, $updatedCategory);
        // } catch (\Exception $e) {
        //     Log::error('Error when updating category: ' . $e->getMessage());
        // }
    }

    public function delete(int $id)
    {
        try {
            return $this->expenseRepository->delete($id);
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
            return $this->expenseRepository->deleteMany($ids);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'ids' => $ids,
                'error_message' => $e->getMessage(),
            ]);
        }
    }
}

