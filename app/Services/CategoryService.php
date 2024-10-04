<?php

use App\Repositories\CategoryRepository;

class CategoryService
{
    protected $categoryRepository;

    // Constructor injection
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAllCategories()
    {
        return $this->categoryRepository->all();
    }
}
