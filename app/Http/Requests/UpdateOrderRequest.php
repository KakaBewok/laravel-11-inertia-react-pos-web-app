<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class UpdateOrderRequest extends FormRequest
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
            'customer_name' => 'required|string|min:3',
            'order_date' => [
                'required', 
                'date', 
                function ($attribute, $value, $fail) {
                    $orderDate = Carbon::parse($value);
                    $today = Carbon::today();
                    $tomorrow = $today->copy()->addDay();
                    
                    if ($orderDate->gte($tomorrow)) {
                        $fail('The order date cannot be tomorrow or in the future.');
                    }
                }
            ],
            'total_amount' => 'required|numeric|min:0',
            'changes' => 'required|numeric|min:0',
            'status' => 'required|string|min:3',
            'notes' => 'nullable|string',
            'payment_method_id' => 'required|string|min:1',
            'products' => 'required|array|min:1', 
            'products.*' => 'string|min:1', 
        ];
    }

    public function messages()
    {
        return [
            'customer_name.required' => 'Customer name is required.',
            'customer_name.min' => 'Customer name must contain at least 3 characters.',
            'total_amount.required' => 'Total amount is required.',
            'total_amount.numeric' => 'Total amount must be a number.',
            'total_amount.min' => 'Total amount must be greater than or equal to 0.',
            'changes.required' => 'Changes is required.',
            'changes.numeric' => 'Changes must be a number.',
            'changes.min' => 'Changes must be greater than or equal to 0.',
            'status.required' => 'Status is required.',
            'status.min' => 'Status must contain at least 3 characters.',
            'payment_method_id.required' => 'Payment method is required.',
            'products.required' => 'The products field is required.',
            'products.array' => 'The products field must be an array.',
            'products.*.string' => 'Each product must be a valid string.',
            'products.*.min' => 'Each product must contain at least 1 character.',
        ];
    }
}
