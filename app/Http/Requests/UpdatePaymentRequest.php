<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
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
            'bank_name' => 'required|string|min:3',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'bank_logo' => 'nullable|file|mimes:' . implode(',', config('constants.ACCEPTED_IMAGE_TYPES')) . '|max:' . (config('constants.MAX_FILE_SIZE') * 1024),
            'qris_image' => 'nullable|file|mimes:' . implode(',', config('constants.ACCEPTED_IMAGE_TYPES')) . '|max:' . (config('constants.MAX_FILE_SIZE') * 1024),
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The name is required.',
            'name.string' => 'The name must be a string.',
            'name.min' => 'The name must be at least 3 characters.',
            'bank_name.required' => 'The bank name is required.',
            'bank_name.string' => 'The bank name must be a string.',
            'bank_name.min' => 'The bank name must be at least 3 characters.',
            'description.string' => 'The description must be a string.',
            'status.required' => 'The status is required.',
            'status.boolean' => 'The status must be a boolean (true/false).',
            'bank_logo.file' => 'The bank logo must be a file.',
            'bank_logo.mimes' => 'The bank logo must be a file of type: ' . implode(', ', config('constants.ACCEPTED_IMAGE_TYPES')) . '.',
            'bank_logo.max' => 'The bank logo must not exceed ' . config('constants.MAX_FILE_SIZE') . ' KB.',
            'qris_image.file' => 'The QRIS image must be a file.',
            'qris_image.mimes' => 'The QRIS image must be a file of type: ' . implode(', ', config('constants.ACCEPTED_IMAGE_TYPES')) . '.',
            'qris_image.max' => 'The QRIS image must not exceed ' . config('constants.MAX_FILE_SIZE') . ' KB.',
        ];
    }
}
