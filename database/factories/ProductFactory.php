<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $slug = Str::slug($this->faker->words(3, true));
        return [
            'category_id' => Category::factory(),
            'name' => $this->faker->unique()->words(2, true),
            'slug' => $slug,
            'description' => $this->faker->sentence(15, true),
            'price' => $this->faker->randomFloat(2, 10000, 300000),
            'unit' => $this->faker->randomElement(['Gram', 'Kilogram']),
            'stock_quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}
