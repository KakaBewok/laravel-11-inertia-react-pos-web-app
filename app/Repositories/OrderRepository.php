<?php

use App\Models\Order;
use CrudRepository;
use Illuminate\Support\Collection;

class OrderRepository implements CrudRepository
{
    public function find(int $id)
    {
        return Order::find($id);
    }

    public function all(): Collection
    {
        return Order::all();
    }

    public function store(array $data)
    {
        return Order::create($data);
    }

    public function update(int $id, array $data)
    {
        $oldData = Order::find($id);
        if ($oldData) {
            $oldData->update($data);
            return $oldData;
        }
        return null;
    }

    public function delete(int $id)
    {
        $data = Order::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }
}
