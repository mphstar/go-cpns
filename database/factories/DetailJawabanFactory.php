<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailJawaban>
 */
class DetailJawabanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'jawaban' => $this->faker->sentence,
            'nilai' => $this->faker->randomElement([0, 1, 2, 3, 4, 5]),
        ];
    }
}
