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
            'order_items' => 'required|array|min:1',
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
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
            'order_items.required' => 'At least one product must be ordered.',
            'order_items.*.product_id.required' => 'Product ID is required.',
            'order_items.*.product_id.exists' => 'The selected product was not found.',
            'order_items.*.quantity.required' => 'Product quantity is required.',
            'order_items.*.quantity.integer' => 'Product quantity must be a number.',
        ];
    }
}
