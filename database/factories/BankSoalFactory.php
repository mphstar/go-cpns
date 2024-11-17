<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BankSoal>
 */
class BankSoalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => $this->faker->sentence,
            'jenis_soal' => $this->faker->randomElement(['bela_negara', 'pilar_negara']),
            'status' => $this->faker->randomElement(['aktif', 'tidak_aktif']),
            'waktu_pengerjaan' => $this->faker->randomNumber(3),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
