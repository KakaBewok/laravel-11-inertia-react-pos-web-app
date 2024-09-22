<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::prefix('admin')->name('admin.')->group(function () {
    //     Route::middleware('can:manage statistics')->group(function () {
    //         Route::resource('statistics', CompanyStatisticController::class);
    //     });
    //     Route::middleware('can:manage products')->group(function () {
    //         Route::resource('products', ProductController::class);
    //     });
    //     Route::middleware('can:manage principles')->group(function () {
    //         Route::resource('principles', OurPrincipleController::class);
    //     });
    //     Route::middleware('can:manage testimonials')->group(function () {
    //         Route::resource('testimonials', TestimonialController::class);
    //     });
    //     Route::middleware('can:manage clients')->group(function () {
    //         Route::resource('clients', ProjectClientController::class);
    //     });
    //     Route::middleware('can:manage teams')->group(function () {
    //         Route::resource('teams', OurTeamController::class);
    //     });
    //     Route::middleware('can:manage abouts')->group(function () {
    //         Route::resource('abouts', CompanyAboutController::class);
    //     });
    //     Route::middleware('can:manage appointments')->group(function () {
    //         Route::resource('appointments', AppointmentController::class);
    //     });
    //     Route::middleware('can:manage hero sections')->group(function () {
    //         Route::resource('hero_sections', HeroSectionController::class);
    //     });
    // });
});



require __DIR__ . '/auth.php';
