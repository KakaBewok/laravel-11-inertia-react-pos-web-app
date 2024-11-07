<?php

namespace App\Services;

use App\Repositories\PaymentMethodRepo;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Storage;

class PaymentMethodService
{
    protected $paymentMethodRepository;

    // Constructor injection
    public function __construct(PaymentMethodRepo $paymentMethodRepository)
    {
        $this->paymentMethodRepository = $paymentMethodRepository;
    }

    public function store(array $validatedData)
    {
        try {
            $imagePaths = [
                'bank_logo' => null,
                'qris_image' => null,
            ];
            $imagesUpload = [
                'bank_logo' => $validatedData['bank_logo'] ?? null,
                'qris_image' => $validatedData['qris_image'] ?? null,
            ];

            if (!empty($imagesUpload['bank_logo']) || !empty($imagesUpload['qris_image'])) {
                foreach ($imagesUpload as $key => $value) {
                    if ($value instanceof UploadedFile) {
                        $imagePath = $value->store('images', 'public');
                        $imagePaths[$key] = $imagePath;
                    } else {
                        $imagePaths[$key] = $value;
                    }
                }
            }

            $this->paymentMethodRepository->store([
                'name' => $validatedData['name'],
                'bank_name' => $validatedData['bank_name'],
                'status' => $validatedData['status'],
                'is_cash' => $validatedData['is_cash'],
                'description' => $validatedData['description'] ?? "",
                'bank_logo' => $imagePaths['bank_logo'] ?? "",
                'qris_image' => $imagePaths['qris_image'] ?? "",
            ]);
        } catch (\Exception $e) {
            Log::error('Error when creating payment method: ' . $e->getMessage());
        }
    }

    public function getAllPaymentMethods()
    {
        return $this->paymentMethodRepository->all();
    }

    public function update(PaymentMethod $paymentMethod, array $data)
    {
        try {
            $updatedPaymentMethod = [
                'name' => $data['name'],
                'bank_name' => $data['bank_name'],
                'description' => $data['description'] ?? '',
                'status' => $data['status'],
                'is_cash' => $data['is_cash'],
            ];
            $this->paymentMethodRepository->update($paymentMethod->id, $updatedPaymentMethod);
            $this->handleImages($data['bank_logo'] ?? null, $data['qris_image'] ?? null, $paymentMethod);
        } catch (\Exception $e) {
            Log::error('Error when updating payment method: ' . $e->getMessage());
        }
    }

    public function delete(int $id)
    {
        try {
            $this->paymentMethodRepository->delete($id);
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
            $this->paymentMethodRepository->deleteMany($ids);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'ids' => $ids,
                'error_message' => $e->getMessage(),
            ]);
        }
    }

    // update methods
    private function handleImages($bank_logo_input, $qris_image_input, PaymentMethod $paymentMethod)
    {
        $imagesUpload = [
            'bank_logo' => $bank_logo_input,
            'qris_image' => $qris_image_input,
        ];

        foreach ($imagesUpload as $key => $value) {
            if (!empty($value)) {
                $newImagePath = $value instanceof UploadedFile ? $value->store('images', 'public') : $value;
                $this->deleteExistingImages($key, $paymentMethod);
                $paymentMethod->{$key} = $newImagePath;
            } else {
                $this->deleteExistingImages($key, $paymentMethod);
                $paymentMethod->{$key} = "";
            }
        }
        $paymentMethod->save();
    }

   private function deleteExistingImages($key, PaymentMethod $paymentMethod): void
    {
        $existingImage = $paymentMethod->{$key};
        if (!empty($existingImage) && Storage::disk('public')->exists($existingImage)) {
                Storage::disk('public')->delete($existingImage);
        } 
    }
}
