<?php

namespace App\Repositories;

use App\Interfaces\CrudRepository;
use App\Models\Category;
use Illuminate\Support\Collection;

class CategoryRepo implements CrudRepository
{
    public function find(int $id)
    {
        return Category::find($id);
    }

    public function all(): Collection
    {
        return Category::with('products')->orderBy('created_at', 'desc')->get();
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
        }
    }

    public function delete(int $id)
    {
        $data = Category::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }

    public function deleteMany(array $ids){
        return Category::destroy($ids);
    }
}
