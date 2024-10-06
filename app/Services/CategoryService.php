<?php

namespace App\Services;

use App\Repositories\CategoryRepo;


class CategoryService
{
    protected $categoryRepository;

    // Constructor injection
    public function __construct(CategoryRepo $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAllCategories()
    {
        return $this->categoryRepository->all();
    }
}
