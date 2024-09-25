<?php

use App\Models\Expense;
use CrudRepository;
use Illuminate\Support\Collection;

class ExpenseRepository implements CrudRepository
{
    public function find(int $id)
    {
        return Expense::find($id);
    }

    public function all(): Collection
    {
        return Expense::all();
    }

    public function store(array $data)
    {
        return Expense::create($data);
    }

    public function update(int $id, array $data)
    {
        $oldData = Expense::find($id);
        if ($oldData) {
            $oldData->update($data);
            return $oldData;
        }
        return null;
    }

    public function delete(int $id)
    {
        $data = Expense::find($id);
        if ($data) {
            return $data->delete();
        }
        return false;
    }
}
