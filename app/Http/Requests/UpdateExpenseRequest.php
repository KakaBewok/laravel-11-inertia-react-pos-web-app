<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class UpdateExpenseRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|min:3',
            'amount' => 'sometimes|numeric|min:0', 
            'description' => 'nullable|string',
            'expense_date' => [
                'sometimes', 
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

    /**
     * Custom messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.sometimes' => 'The name field is optional but must be valid if provided.',
            'name.min' => 'Category must contain at least 3 character(s).',
            'amount.sometimes' => 'The amount field is optional but must be valid if provided.',
            'amount.numeric' => 'The amount must be a valid number.',
            'amount.min' => 'Minimal amount is 0.',
            'expense_date.sometimes' => 'The expense date is optional but must be valid if provided.',
            'expense_date.date' => 'The expense date must be a valid date.',
        ];
    }
}
