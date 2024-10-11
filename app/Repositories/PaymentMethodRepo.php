<?php

namespace App\Repositories;

use App\Models\PaymentMethod;
use App\Interfaces\CrudRepository;
use Illuminate\Support\Collection;

class PaymentMethodRepo implements CrudRepository
{
    public function find(int $id)
    {
        return PaymentMethod::find($id);
    }

    public function all(): Collection
    {
        return PaymentMethod::with("orders")->get();
    }

    public function store(array $data)
    {
        return PaymentMethod::create($data);
    }

    public function update(int $id, array $data)
    {
        $oldData = PaymentMethod::find($id);
        if ($oldData) {
            $oldData->update($data);
            return $oldData;
        }
        return null;
    }

    public function delete(int $id)
    {
        $data = PaymentMethod::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }

     public function deleteMany(array $ids){
        return PaymentMethod::destroy($ids);
    }
}
