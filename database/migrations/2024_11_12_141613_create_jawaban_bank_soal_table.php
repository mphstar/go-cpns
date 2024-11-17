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
        Schema::create('jawaban_bank_soal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('detail_bank_soal_id')->constrained('detail_bank_soal')->onDelete('cascade')->onUpdate('cascade');
            $table->enum('opsi', ['A', 'B', 'C', 'D']);
            $table->text('jawaban');
            $table->string('gambar_jawaban')->nullable();
            $table->integer('nilai')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jawaban_bank_soal');
    }
};
