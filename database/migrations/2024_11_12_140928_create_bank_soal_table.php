<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bank_soal', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 100);
            $table->enum('jenis_soal', ['bela_negara', 'pilar_negara'])->default('bela_negara');
            $table->integer('waktu_pengerjaan')->default(60);
            $table->enum('status', ['aktif', 'tidak_aktif'])->default('aktif');
            $table->integer('batas_nilai_twk')->default(0);
            $table->integer('batas_nilai_tiu')->default(0);
            $table->integer('batas_nilai_tkp')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_soal');
    }
};
