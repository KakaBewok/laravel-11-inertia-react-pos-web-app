<?php

use App\Models\Photo;
use CrudRepository;
use Illuminate\Support\Collection;

class PhotoRepo implements CrudRepository
{
    public function find(int $id)
    {
        return Photo::find($id);
    }

    public function all(): Collection
    {
        return Photo::all();
    }

    public function store(array $data)
    {
        return Photo::create($data);
    }

    public function update(int $id, array $data)
    {
        $oldData = Photo::find($id);
        if ($oldData) {
            $oldData->update($data);
            return $oldData;
        }
        return null;
    }

    public function delete(int $id)
    {
        $data = Photo::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }
}
