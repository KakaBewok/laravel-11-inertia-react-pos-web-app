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
                'bank_logo' => $validatedData['bank_logo'],
                'qris_image' => $validatedData['qris_image'],
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
                'status' => $data['status']
            ];
            $this->paymentMethodRepository->update($paymentMethod->id, $updatedPaymentMethod);

            // Handle photos
            $photoPaths = $this->handlePhotos($data['bank_logo'], $data['qris_image'], $paymentMethod);

            // Sync photos: remove old ones and add new ones
            $this->syncPhotos($product, $photoPaths);
        } catch (\Exception $e) {
            Log::error('Error when updating product: ' . $e->getMessage());
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
    private function handlePhotos($bank_logo_input, $qris_image_input, PaymentMethod $paymentMethod)
    {
        $imagePaths = [
            'bank_logo' => null,
            'qris_image' => null,
        ];
        $imagesUpload = [
            'bank_logo' => $bank_logo_input,
            'qris_image' => $qris_image_input,
        ];

        if (!empty($imagesUpload['bank_logo']) || !empty($imagesUpload['qris_image'])) {
            foreach ($imagesUpload as $key => $value) {
                //$this->deleteExistingPhotos($paymentMethod); pindahin kesini
                $imagePaths[$key] = $value instanceof UploadedFile ? $value->store('images', 'public') : $value;
            }
        } else {
            $this->deleteExistingPhotos($paymentMethod);
        }

        return $imagePaths;
    }

    private function deleteExistingPhotos(PaymentMethod $paymentMethod): void
    {
        $existingPhotos = $paymentMethod->;
        if (!empty($existingPhotos)) {
            foreach ($existingPhotos as $oldPhoto) {
                if (Storage::disk('public')->exists($oldPhoto)) {
                    Storage::disk('public')->delete($oldPhoto); // Delete the old photo file
                }
            }

            // Delete from the database
            $paymentMethod->photos()->delete();
        }
    }

    // private function syncPhotos(Product $product, array $photoPaths): void
    // {
    //     $existingPhotos = $product->photos()->pluck('photo')->toArray();

    //     // Find photos to delete
    //     $photosToDelete = array_diff($existingPhotos, $photoPaths);

    //     if (!empty($photosToDelete)) {
    //         // Delete old photos
    //         $this->deletePhotos($product, $photosToDelete);
    //     }

    //     // Add new photos that are not yet in the database
    //     $this->addNewPhotos($product, $photoPaths, $existingPhotos);
    // }

    // private function deletePhotos(Product $product, array $photosToDelete): void
    // {
    //     foreach ($photosToDelete as $oldPhoto) {
    //         if (Storage::disk('public')->exists($oldPhoto)) {
    //             Storage::disk('public')->delete($oldPhoto); // Delete the old photo file
    //         }
    //     }

    //     // Delete from the database
    //     $product->photos()->whereIn('photo', $photosToDelete)->delete();
    // }

    // private function addNewPhotos(Product $product, array $photoPaths, array $existingPhotos): void
    // {
    //     foreach ($photoPaths as $path) {
    //         if (!in_array($path, $existingPhotos)) {
    //             $product->photos()->create(['photo' => $path]); // Create new photo entry
    //         }
    //     }
    // }
}
