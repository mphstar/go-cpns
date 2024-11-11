<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
