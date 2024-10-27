<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\PaymentMethod;
use App\Services\PaymentMethodService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    protected $paymentMethodService;

    // Constructor injection
    public function __construct(PaymentMethodService $paymentMethodService)
    {
        $this->paymentMethodService = $paymentMethodService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PaymentMethod/index', [
            'paymentMethods' => $this->paymentMethodService->getAllPaymentMethods()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('PaymentMethod/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $validatedData = $request->validated();
        $this->paymentMethodService->store($validatedData);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentMethod $paymentMethod)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        return Inertia::render('PaymentMethod/edit', ['paymentMethod' => $paymentMethod]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, PaymentMethod $paymentMethod)
    {
        $validatedData = $request->validated();
        $this->paymentMethodService->update($paymentMethod, $validatedData);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        $this->paymentMethodService->delete($paymentMethod->id);
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
        $this->paymentMethodService->multipleDelete($validated['ids']);
    }
}
