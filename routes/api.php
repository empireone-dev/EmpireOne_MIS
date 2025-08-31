<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\AttritionController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\EmployeeAttritionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeEngagementController;
use App\Http\Controllers\EmployeeHealthController;
use App\Http\Controllers\ERFJaController;
use App\Http\Controllers\ERFJdController;
use App\Http\Controllers\ESignatureController;
use App\Http\Controllers\ExitClearanceController;
use App\Http\Controllers\ExitInterviewController;
use App\Http\Controllers\FinalRateController;
use App\Http\Controllers\GuideQuestionController;
use App\Http\Controllers\IncidentReportController;
use App\Http\Controllers\InitialRateController;
use App\Http\Controllers\InterviewConfirmationController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\JobPositionController;
use App\Http\Controllers\MedicineRecordController;
use App\Http\Controllers\NewJobOfferController;
use App\Http\Controllers\OnboardingAckController;
use App\Http\Controllers\OnboardingDocController;
use App\Http\Controllers\OutSourcingErfController;
use App\Http\Controllers\PreEmploymentFileController;
use App\Http\Controllers\UploadMemoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoQuizController;
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

// Route::middleware('throttle:60,1')->group(function (Request $request) {
//     return $request->employee();
// });

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::put('/user/{id}', [UserController::class, 'update']);

// Public API route for QR code scanning (no authentication required)
Route::get('/employee-qr/{emp_id}', [EmployeeController::class, 'showForQR']);

Route::post('/search_applicant', [ApplicantController::class, 'search_applicant']);
Route::resource('applicant', ApplicantController::class);
Route::post('/get_applicant', [ApplicantController::class, 'get_applicant']);
Route::get('/get_hired_applicant', [ApplicantController::class, 'get_hired_applicant']);
Route::put('/proceed_initial_immediate/{id}', [ApplicantController::class, 'proceed_initial_immediate']);
Route::put('/proceed_final_immediate/{id}', [ApplicantController::class, 'proceed_final_immediate']);
Route::put('/proceed_final_phase/{id}', [ApplicantController::class, 'proceed_final_phase']);
Route::put('/phone_call_status/{id}', [ApplicantController::class, 'phone_call_status']);
Route::put('/update_address/{id}', [ApplicantController::class, 'update_address']);
Route::put('/update_applicant_status/{id}', [ApplicantController::class, 'update_applicant_status']);
Route::put('/update_applicant_after_confirmation_status/{app_id}', [ApplicantController::class, 'update_applicant_after_confirmation_status']);
Route::put('/declined_attendance/{app_id}', [ApplicantController::class, 'declined_attendance']);


Route::resource('outsourcing_erf', OutSourcingErfController::class);
Route::get('/count_outsourcing_erf/{date}', [OutSourcingErfController::class, 'count_outsourcing_erf']);
Route::get('/outsourcing_erf_by_id/{erf_id}', [OutSourcingErfController::class, 'outsourcing_erf_by_id']);


Route::resource('/ERFJa', ERFJaController::class);
Route::resource('/ERFJd', ERFJdController::class);


Route::get('/get_e_signature_by_app_id/{app_id}', [ESignatureController::class, 'get_e_signature_by_app_id']);


Route::resource('/incident_report', IncidentReportController::class);



Route::resource('/dashboard', DashboardController::class);

Route::resource('job_position', JobPositionController::class);
Route::resource('guideq', GuideQuestionController::class);
Route::resource('users', UserController::class);
Route::resource('checklist', ChecklistController::class);
Route::resource('joboffer', JobOfferController::class);
Route::resource('new_joboffer', NewJobOfferController::class);
Route::resource('onboarding_doc', OnboardingDocController::class);
Route::get('/onboarding_doc_by_id/{id}', [OnboardingDocController::class, 'onboarding_doc_by_id']);

Route::resource('onboarding_ack', OnboardingAckController::class);
Route::get('/onboarding_ackdoc_by_id/{app_id}', [OnboardingAckController::class, 'onboarding_ackdoc_by_id']);
Route::get('/get_onboarding_ackdoc_by_app_id/{app_id}', [OnboardingAckController::class, 'get_onboarding_ackdoc_by_app_id']);
Route::resource('employee', EmployeeController::class);
Route::post('/store_new_employee', [EmployeeController::class, 'store_new_employee']);

Route::resource('medicine_record', MedicineRecordController::class);
Route::resource('employee_health', EmployeeHealthController::class);
Route::resource('employee_attrition', EmployeeAttritionController::class);
Route::get('get_employee_attrition_by_emp_id/{emp_id}', [EmployeeAttritionController::class, 'getByEmpId']);
Route::resource('emp_memo', UploadMemoController::class);
Route::resource('engagement', EmployeeEngagementController::class);
Route::resource('initial_rate', InitialRateController::class);
Route::resource('final_rate', FinalRateController::class);
Route::put('/final_update_applicant_after_confirmation_status/{app_id}', [FinalRateController::class, 'final_update_applicant_after_confirmation_status']);
Route::put('/final_declined_attendance/{app_id}', [FinalRateController::class, 'final_declined_attendance']);
Route::resource('department', DepartmentController::class);
Route::resource('account', AccountController::class);

// File upload routes with debugging middleware
Route::middleware(['fileUpload'])->group(function () {
    Route::resource('pre_employment_file', PreEmploymentFileController::class);
    Route::post('/reupload_file', [PreEmploymentFileController::class, 'reupload_file']);

    // Test route for file upload debugging
    Route::post('/test-file-upload', function (\Illuminate\Http\Request $request) {
        $fileInfo = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileInfo = [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'size_mb' => round($file->getSize() / 1024 / 1024, 2),
                'mime' => $file->getMimeType(),
                'valid' => $file->isValid(),
                'error' => $file->getError(),
                'max_allowed_mb' => 50,
                'within_limit' => ($file->getSize() / 1024 / 1024) <= 50
            ];
        }

        return response()->json([
            'success' => true,
            'has_file' => $request->hasFile('file'),
            'files' => array_keys($request->allFiles()),
            'file_details' => $fileInfo,
            'php_limits' => [
                'upload_max_filesize' => ini_get('upload_max_filesize'),
                'post_max_size' => ini_get('post_max_size'),
                'memory_limit' => ini_get('memory_limit')
            ]
        ]);
    });
});

Route::resource('attrition', AttritionController::class);
Route::post('/upload_exit_clearance', [AttritionController::class, 'upload_exit_clearance']);
Route::post('/upload_quit_claim', [AttritionController::class, 'upload_quit_claim']);
Route::resource('exit_int', ExitInterviewController::class);
Route::resource('exit_clr', ExitClearanceController::class);
Route::post('/send-clearance-email', [ExitClearanceController::class, 'sendClearanceEmail']);

Route::post('/send_quit_claim', [AttritionController::class, 'send_quit_claim']);
Route::get('get_employee_attrition_by_emp_id/{emp_id}', [AttritionController::class, 'get_employee_attrition_by_emp_id']);


Route::post('/sendiv_email', [EmailController::class, 'sendiv_email']);
Route::post('/send_rejection_email', [EmailController::class, 'send_rejection_email']);

Route::resource('interview_confirmation', InterviewConfirmationController::class);
Route::resource('video_quiz', VideoQuizController::class);
Route::get('get_video_quiz_by_emp_id/{emp_id}', [VideoQuizController::class, 'get_video_quiz_by_emp_id']);

// Debug route for applicant issues
Route::get('/debug/applicant-test', function (Request $request) {
    try {
        $applicant = \App\Models\Applicant::first();
        $userCount = \App\Models\User::count();
        
        return response()->json([
            'status' => 'success',
            'applicant_count' => \App\Models\Applicant::count(),
            'user_count' => $userCount,
            'first_applicant' => $applicant,
            'request_params' => $request->all(),
            'database_connection' => 'OK'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

require __DIR__ . '/auth.php';
