<?php

namespace App\Repositories;

use App\Interfaces\CrudRepository;
use App\Models\OrderProduct;
use Illuminate\Support\Collection;

class OrderProductRepo implements CrudRepository
{
    public function find(int $id)
    {
        return OrderProduct::with(['order', 'product'])->find($id);
    }

    public function all(): Collection
    {
        return OrderProduct::with(['order', 'product'])->orderBy('created_at', 'desc')->get();
    }

    public function store(array $data)
    {
        return OrderProduct::create($data);
    }

    public function update(int $id, array $data)
    {
        $oldData = OrderProduct::find($id);
        if ($oldData) {
            $oldData->update($data);
        }
    }

    public function delete(int $id)
    {
        $data = OrderProduct::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }

    public function deleteMany(array $ids)
    {
        return OrderProduct::destroy($ids);
    }

    public function deleteByOrderId(int $orderId)
    {
        return OrderProduct::where('order_id', $orderId)->delete();
    }
}
