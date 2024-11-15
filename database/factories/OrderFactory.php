<?php

namespace Database\Factories;

use App\Models\PaymentMethod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'payment_method_id' => PaymentMethod::factory(),
            'customer_name' => $this->faker->name,
            'order_date' => now(),
            'total_amount' => $this->faker->randomFloat(2, 10000, 300000),
            'total_paid' => $this->faker->randomFloat(2, 10000, 300000),
            'changes' => $this->faker->randomFloat(2, 10000, 300000),
            'status' => $this->faker->randomElement(['Paid', 'Pending', 'Cancelled']),
            'notes' => $this->faker->sentence(15, true),
        ];
    }
}
