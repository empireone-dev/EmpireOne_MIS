<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\EmployeeAttritionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeEngagementController;
use App\Http\Controllers\EmployeeHealthController;
use App\Http\Controllers\GuideQuestionController;
use App\Http\Controllers\InitialRateController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\MedicineRecordController;
use App\Http\Controllers\OnboardingDocController;
use App\Http\Controllers\OutSourcingErfController;
use App\Http\Controllers\UploadMemoController;
use App\Mail\InitialEmail;
use App\Mail\InitialvEmail;
use App\Mail\SendInitialEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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


Route::resource('outsourcing_erf', OutSourcingErfController::class);
Route::resource('/dashboard', DashboardController::class);

Route::resource('job_position', JobPositionController::class);
Route::resource('guideq', GuideQuestionController::class);
Route::resource('applicant', ApplicantController::class);

Route::resource('checklist', ChecklistController::class);
Route::resource('joboffer', JobOfferController::class);
Route::resource('onboarding_doc', OnboardingDocController::class);
Route::resource('employee', EmployeeController::class);
Route::resource('medicine_record', MedicineRecordController::class);
Route::resource('employee_health', EmployeeHealthController::class);
Route::resource('employee_attrition', EmployeeAttritionController::class);
Route::resource('emp_memo', UploadMemoController::class);
Route::resource('engagement', EmployeeEngagementController::class);
Route::resource('initial_rate', InitialRateController::class);

Route::post('/sendiv_email', [EmailController::class, 'sendiv_email']);
  
require __DIR__ . '/auth.php';
