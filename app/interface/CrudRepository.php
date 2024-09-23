<?php

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\View;

interface CrudRepository
{
    /**
     * Display a listing of the resource.
     */
    public function all(): Collection;

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View;

    /**
     * Store a newly created resource in storage.
     */
    public function store(array $data);

    /**
     * Display the specified resource.
     */
    public function detail(int $id): View;

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id): View;

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id, array $data);

    /**
     * Remove the specified resource from storage.
     */
    public function delete(int $id);
}
