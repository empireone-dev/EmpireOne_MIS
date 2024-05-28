<?php

use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\OutSourcingErfController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('outsourcing_erf',OutSourcingErfController::class);
Route::get('/get_outsourcing_dashboard', [OutSourcingErfController::class, 'get_outsourcing_dashboard']);

Route::resource('job_position',JobPositionController::class);
