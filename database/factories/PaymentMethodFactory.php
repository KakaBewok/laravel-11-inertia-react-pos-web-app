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
            'name' => $this->faker->randomElement(['Bank Transfer', 'QRIS', 'Cash']),
            'bank_name' => $this->faker->randomElement(['BRI', 'BCA', 'Mandiri']),
            'bank_logo' => $this->faker->imageUrl,
            'qris_image' => $this->faker->imageUrl,
            'status' => $this->faker->boolean,
            'account_number' => $this->faker->numerify('############'),
            'account_holder' => $this->faker->name,
        ];
    }
}
