<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;

interface CrudRepository
{
    /**
     * Find a specified resource.
     */
    public function find(int $id);

    /**
     * Display a listing of the resource.
     */
    public function all(): Collection;

    /**
     * Store a newly created resource in storage.
     */
    public function store(array $data);

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id, array $data);

    /**
     * Remove the specified resource from storage.
     */
    public function delete(int $id);

    /**
     * Remove some resource from storage.
     */
    public function deleteMany(array $ids);
}
