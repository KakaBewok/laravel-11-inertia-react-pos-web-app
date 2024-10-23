<?php

namespace App\Services;

use App\Repositories\ExpenseRepo;
use Illuminate\Support\Facades\Log;
use App\Models\Expense;
use Carbon\Carbon;

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
        try {
            $this->expenseRepository->store([
                'name' => $validatedData['name'],
                'amount' => $validatedData['amount'],
                'description' => $validatedData['description'] ?? "",
                'expense_date' => $validatedData['expense_date'],
            ]);
        } catch (\Exception $e) {
            Log::error('Error when creating expense: ' . $e->getMessage());
        }
    }

    public function getAllExpenses()
    {
        return $this->expenseRepository->all();
    }

    public function update(Expense $expense, array $data)
    {
        try {
            $updatedExpense = [
                'name' => $data['name'],
                'amount' => $data['amount'],
                'description' => $data['description'] ?? "",
                'expense_date' => $data['expense_date'],
            ];
            $this->expenseRepository->update($expense->id, $updatedExpense);
        } catch (\Exception $e) {
            Log::error('Error when updating expense: ' . $e->getMessage());
        }
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

