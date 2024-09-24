<?php

use App\Models\Category;
use CrudRepository;
use Illuminate\Support\Collection;

class CategoryRepository implements CrudRepository
{
    public function all(): Collection
    {
        return Category::all();
    }

    public function store(array $data)
    {
        return Category::create($data);
    }

    public function update(int $id, array $data)
    {
        $oldData = Category::find($id);
        if ($oldData) {
            $oldData->update($data);
            return $oldData;
        }
        return null;
    }

    public function delete(int $id)
    {
        $data = Category::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }
}
