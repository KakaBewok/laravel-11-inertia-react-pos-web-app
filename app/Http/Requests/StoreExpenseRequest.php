<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'expense_date' => [
                'required', 
                'date', 
                function ($attribute, $value, $fail) {
                    $expenseDate = Carbon::parse($value);
                    $today = Carbon::today();
                    $tomorrow = $today->copy()->addDay();
                    
                    if ($expenseDate->gte($tomorrow)) {
                        $fail('The expense date cannot be tomorrow or in the future.');
                    }
                }
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.min' => 'Category must contain at least 3 character(s).',
            'amount.required' => 'The amount field is required.',
            'amount.numeric' => 'The amount must be a valid number.',
            'amount.min' => 'Minimal amount is 0.',
            'expense_date.required' => 'The expense date is required.',
            'expense_date.date' => 'The expense date must be a valid date.',
        ];
    }
}
