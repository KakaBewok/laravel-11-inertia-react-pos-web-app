<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatisticController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', [AuthenticatedSessionController::class, 'create']);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('statistic', [StatisticController::class, 'index'])->name('statistic');
        Route::middleware('can:manage categories')->group(function () {
            Route::resource('category', CategoryController::class);
            Route::post('/category/destroy-bulk', [CategoryController::class, 'destroy_bulk'])->name("category.destroy-bulk");
        });
        Route::middleware('can:manage products')->group(function () {
            Route::resource('product', ProductController::class);
            Route::post('/product/destroy-bulk', [ProductController::class, 'destroy_bulk'])->name("product.destroy-bulk");
        });
        Route::middleware('can:manage photos')->group(function () {
            Route::resource('photo', PhotoController::class);
            Route::post('/photo/destroy-bulk', [PhotoController::class, 'destroy_bulk'])->name("photo.destroy-bulk");
        });
        Route::middleware('can:manage expenses')->group(function () {
            Route::resource('expense', ExpenseController::class);
            Route::post('/expense/destroy-bulk', [ExpenseController::class, 'destroy_bulk'])->name("expense.destroy-bulk");
        });
        Route::middleware('can:manage payment_methods')->group(function () {
            Route::resource('payment_method', PaymentMethodController::class);
            Route::post('/payment_method/destroy-bulk', [PaymentMethodController::class, 'destroy_bulk'])->name("payment_method.destroy-bulk");
        });
        Route::middleware('can:manage orders')->group(function () {
            Route::resource('order', OrderController::class);
            Route::post('/order/destroy-bulk', [OrderController::class, 'destroy_bulk'])->name("order.destroy-bulk");
        });
    });
});

require __DIR__ . '/auth.php';
