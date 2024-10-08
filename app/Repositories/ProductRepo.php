<?php

namespace App\Repositories;

use App\Interfaces\CrudRepository;
use App\Models\Product;
use Illuminate\Support\Collection;

class ProductRepo implements CrudRepository
{
    public function find(int $id)
    {
        return Product::find($id);
    }

    public function all(): Collection
    {
        return Product::all();
    }

    public function store(array $data)
    {
        return Product::create($data);
    }

    public function update(int $id, array $data)
    {
        $oldData = Product::find($id);
        if ($oldData) {
            $oldData->update($data);
            return $oldData;
        }
        return null;
    }

    public function delete(int $id)
    {
        $data = Product::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }

     public function deleteMany(array $ids){
        return Product::destroy($ids);
    }
}
