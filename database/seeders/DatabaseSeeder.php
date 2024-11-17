<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\BankSoal;
use App\Models\DetailJawaban;
use App\Models\DetailSoal;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        static $number = 1;
        static $abjad = ['A', 'B', 'C', 'D'];
        BankSoal::factory(20)->create()->each(function ($bankSoal) use (&$number, &$abjad) {
            DetailSoal::factory(5)->create([
                'bank_soal_id' => $bankSoal->id,
                // 'nomor_soal' => function () use (&$number) {
                //     return $number++;
                // },
            ])->each(function ($detailSoal) use (&$abjad) {
                $index = 0;
                DetailJawaban::factory(4)->create([
                    'detail_bank_soal_id' => $detailSoal->id,
                    'opsi' => function () use (&$abjad, &$index) {
                        return $abjad[$index++];
                    },
                ]);
            });
            $number = 1; // Reset the number after each BankSoal factory
        });
    }
}
