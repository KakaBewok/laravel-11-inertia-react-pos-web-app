<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Services\PhotoService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    protected $productService;
    protected $categoryService;
    protected $photoService;

    // Constructor injection
    public function __construct(ProductService $productService, CategoryService $categoryService, PhotoService $photoService)
    {
        $this->productService = $productService;
        $this->categoryService = $categoryService;
        $this->photoService = $photoService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->productService->getAllProducts();
        return Inertia::render('Product/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = $this->categoryService->getAllCategories();
        return Inertia::render('Product/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();
        $this->productService->store($validatedData);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $product = $this->productService->getDetailProduct($id);
        $categories = $this->categoryService->getAllCategories();
        return Inertia::render('Product/edit', [
            'product' => $product,
            'categories' => $categories,
            'photos' => $product->photos,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product) {
        dd($request->all());
        $validatedData = $request->validated();
        $this->productService->update($product, $validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->productService->delete($id);
    }

    /**
     * Remove many resource from storage.
     */
    public function destroy_bulk(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'string',
        ]);
        $this->productService->multipleDelete($validated['ids']);
    }
}
