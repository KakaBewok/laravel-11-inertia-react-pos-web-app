<?php

namespace App\Services;

use App\Repositories\PhotoRepo;
use Illuminate\Support\Facades\Log;

class PhotoService
{
    protected $photoRepository;

    // Constructor injection
    public function __construct(PhotoRepo $photoRepository)
    {
        $this->photoRepository = $photoRepository;
    }

    public function getAllPhotos()
    {
        return $this->photoRepository->all();
    }

    public function getDetailPhoto(int $id)
    {
        return $this->photoRepository->find($id);
    }

    public function delete(int $id)
    {
        try {
            return $this->photoRepository->delete($id);
            Log::info("Deleted photo id: ", $id);
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
            return $this->photoRepository->deleteMany($ids);
            Log::info("Deleted photo ids: ", $ids);
        } catch (\Exception $e) {
            Log::error('Failed to delete data', [
                'ids' => $ids,
                'error_message' => $e->getMessage(),
            ]);
        }
    }
}
