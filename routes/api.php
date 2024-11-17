<?php

use App\Http\Controllers\Admin\BankSoalController;
use App\Http\Controllers\Admin\MateriController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/users', [UserController::class, 'getData'])->name('api.user');
Route::post('/users/create', [UserController::class, 'store'])->name('api.user.create');
Route::post('/users/update', [UserController::class, 'update'])->name('api.user.update');
Route::post('/users/delete', [UserController::class, 'delete'])->name('api.user.delete');

Route::get('/materi', [MateriController::class, 'getData'])->name('api.materi');
Route::post('/materi/create', [MateriController::class, 'store'])->name('api.materi.create');
Route::post('/materi/update', [MateriController::class, 'update'])->name('api.materi.update');
Route::post('/materi/delete', [MateriController::class, 'delete'])->name('api.materi.delete');

Route::get('/bank-soal', [BankSoalController::class, 'getData'])->name('api.bank-soal');
Route::post('/bank-soal/create', [BankSoalController::class, 'store'])->name('api.bank-soal.create');
Route::post('/bank-soal/delete', [BankSoalController::class, 'delete'])->name('api.bank-soal.delete');
Route::post('/bank-soal/update', [BankSoalController::class, 'update'])->name('api.bank-soal.update');
Route::post('/bank-soal/soal/delete', [BankSoalController::class, 'deleteSoal'])->name('api.bank-soal.soal.delete');
Route::get('/bank-soal/get-soal', [BankSoalController::class, 'getSoal'])->name('api.bank-soal.get-soal');
Route::post('/bank-soal/update-soal', [BankSoalController::class, 'updateSoal'])->name('api.bank-soal.update-soal');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
