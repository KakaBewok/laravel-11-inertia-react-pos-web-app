<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentMethod>
 */
class PaymentMethodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'bank_name' => $this->faker->company,
            'bank_logo' => $this->faker->imageUrl,
            'qris_image' => $this->faker->imageUrl,
            'status' => $this->faker->boolean,
            'description' => $this->faker->sentence(15, true),
        ];
    }
}
