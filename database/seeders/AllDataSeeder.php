<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Expense;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\PaymentMethod;
use App\Models\Photo;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AllDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Category::factory(5)->create()->each(function ($category) {
        //     $products = Product::factory(3)->create(['category_id' => $category->id]);

        //     $products->each(function ($product) {
        //         Photo::factory(2)->create(['product_id' => $product->id]);
        //     });
        // });

        // Expense::factory(10)->create();
        // PaymentMethod::factory(3)->create()->each(function ($paymentMethod) {
        //     Order::factory(2)->create(['payment_method_id' => $paymentMethod->id])->each(function ($order) {
        //         OrderProduct::factory(3)->create(['order_id' => $order->id]);
        //     });
        // });

        //

        Category::factory(3)->create();

        Expense::factory(5)->create();

        PaymentMethod::factory(3)->create();

        Product::factory(15)->recycle([
            Category::all()
        ])->create();

        Photo::factory(30)->recycle([
            Product::all()
        ])->create();

        Order::factory(9)->recycle([
            PaymentMethod::all()
        ])->create();

        OrderProduct::factory(15)->recycle([
            Product::all(), //15
            Order::all() //9
        ])->create();
    }
}
