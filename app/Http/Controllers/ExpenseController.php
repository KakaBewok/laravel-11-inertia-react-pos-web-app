<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ExpenseService;

class ExpenseController extends Controller
{
    protected $expenseService;

    // Constructor injection
    public function __construct(ExpenseService $expenseService)
    {
        $this->expenseService = $expenseService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = $this->expenseService->getAllExpenses();
        return Inertia::render('Expense/index', [
            'expenses' => $expenses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Expense/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $validatedData = $request->validated();
        $this->expenseService->store($validatedData);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        return Inertia::render('Expense/edit', [
            'expense' => $expense
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        $validatedData = $request->validated();
        $this->expenseService->update($expense, $validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->expenseService->delete($id);
    }

    /**
     * Remove many resource from storage.
     */
    public function destroy_bulk(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'string',
        ]);
        $this->expenseService->multipleDelete($validated['ids']);
    }
}
