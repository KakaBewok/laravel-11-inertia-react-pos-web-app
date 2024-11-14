<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Services\PaymentMethodService;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $orderService;
    protected $productService;
    protected $paymentMethodService;

    public function __construct(OrderService $orderService, ProductService $productService, PaymentMethodService $paymentMethodService)
    {
        $this->orderService = $orderService;
        $this->productService = $productService;
        $this->paymentMethodService = $paymentMethodService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = $this->orderService->getAllOrders();
        return Inertia::render('Order/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $paymentMethods = $this->paymentMethodService->getAllPaymentMethods();
        $products = $this->productService->getAllProducts();
        return Inertia::render('Order/create', [
            'paymentMethods' => $paymentMethods,
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $validatedData = $request->validated();
        $this->orderService->store($validatedData);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $productsOrdered = $this->orderService->mappingProductsDetails($order);
        return Inertia::render('Order/details', [
            'order' => $order,
            'paymentMethod' => $order->paymentMethod,
            'productsOrdered' => $productsOrdered,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $selectedItems = $this->orderService->mappingProductsEdit($order);
        return Inertia::render('Order/edit', [
            'order' => $order,
            'selectedItems' => $selectedItems,
            'paymentMethods' => $this->paymentMethodService->getAllPaymentMethods(),
            'products' => $this->productService->getAllProducts(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->orderService->delete($id);
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
        $this->orderService->multipleDelete($validated['ids']);
    }
}
