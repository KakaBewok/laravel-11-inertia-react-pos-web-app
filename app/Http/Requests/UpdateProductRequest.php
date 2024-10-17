<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|string|min:1',
            'description' => 'nullable|string',
            'unit' => 'required|string|min:1',
            'stock_quantity' => 'required|numeric|min:0',
            'photos' => 'nullable|array',
            'photos.*' => 'nullable|file|mimes:' . implode(',', config('constants.ACCEPTED_IMAGE_TYPES')) . '|max:' . (config('constants.MAX_FILE_SIZE') * 1024),
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required.',
            'name.min' => 'Name must contain at least 3 characters.',
            'name.unique' => 'The name has already been taken.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price must be a number.',
            'price.min' => 'Price must be greater than or equal to 0.',
            'category_id.required' => 'Category is required.',
            'unit.required' => 'Unit is required.',
            'stock_quantity.required' => 'Stock is required.',
            'stock_quantity.numeric' => 'Stock must be a number.',
            'stock_quantity.min' => 'Stock must be greater than or equal to 0.',
            'photos.*.mimes' => 'Photos must be ' . implode(',', config('constants.ACCEPTED_IMAGE_TYPES')) . ' formats.',
            'photos.*.max' => 'Photos must not exceed ' . config('constants.MAX_FILE_SIZE') . 'KB.',
        ];
    }
}
