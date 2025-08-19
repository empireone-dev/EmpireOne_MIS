<?php

namespace App\Http\Controllers;

use App\Mail\DeclinedContract;
use App\Mail\DeclinedRequirements;
use App\Mail\FinalvEmail;
use App\Models\Applicant;
use App\Models\Employee;
use App\Models\JobOffer;
use App\Models\PreEmploymentFile;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PreEmploymentFileController extends Controller
{
    public function index()
    {
        $preempfile = PreEmploymentFile::orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $preempfile
        ], 200);
    }


    public function store(Request $request)
    {
        try {
            // Add validation for required fields
            $request->validate([
                'file' => 'required|file|max:10240', // 10MB max
                'app_id' => 'required',
                'reqs' => 'required',
            ]);

            $today = date('Y-m-d');
            $count = Employee::whereDate('created', $today)->count() + 1;
            $countNumber = str_pad($count, 2, '0', STR_PAD_LEFT);
            $dateUnique = date('ymd') . $countNumber;

            $applicant = Applicant::where([
                ['app_id', '=', $request->app_id],
            ])->first();

            if (!$applicant) {
                return response()->json([
                    'error' => 'Applicant not found'
                ], 404);
            }

            // Debug information
            Log::info('File upload attempt', [
                'has_file' => $request->hasFile('file'),
                'files' => $request->allFiles(),
                'app_id' => $request->app_id,
                'reqs' => $request->reqs
            ]);

            if ($request->hasFile('file')) {
                $uploadedFile = $request->file('file');
                
                // Check if file is valid
                if (!$uploadedFile->isValid()) {
                    Log::error('Invalid file upload', [
                        'error' => $uploadedFile->getError(),
                        'error_message' => $uploadedFile->getErrorMessage()
                    ]);
                    
                    return response()->json([
                        'error' => 'Invalid file upload: ' . $uploadedFile->getErrorMessage()
                    ], 400);
                }

                // Store the file on S3 and retrieve the path
                $path = $uploadedFile->store(date("Y"), 's3');
                $url = 'https://s3.amazonaws.com/' . config('filesystems.disks.s3.bucket') . '/' . $path;

                // Save the URL or file info to the database
                PreEmploymentFile::create([
                    'app_id' => $request->app_id,
                    'reqs' => $request->reqs,
                    'reqs_img' => $url,
                    'status' => $request->status ?? 'Uploaded',
                    'reas' => $request->reas ?? '',
                    'created' => $request->created ?? now(),
                ]);

                if ($request->reqs == 'Contract') {
                    $jo = JobOffer::where([
                        ['app_id', '=', $request->app_id],
                        ['status', '=', 'Contract Signing']
                    ])->first();
                    
                    if ($jo) {
                        $jo->update([
                            'status' => 'Hired',
                        ]);
                    }
                    
                    Employee::create([
                        'app_id' => $request->app_id,
                        'emp_id' => $dateUnique,
                        'position' => $request->jobPos,
                        'dept' => $jo->department ?? null,
                        'account' => $jo->account ?? null,
                        'sup_id' => null,
                        'hired' => date('Y-m-d'),
                        'eogs' => $applicant->email ?? '',
                        'status' => 'Probationary',
                    ]);
                    
                    User::create([
                        'role_id' => '7',
                        'employee_id' => $dateUnique,
                        'employee_fname' => $applicant->fname,
                        'employee_mname' => $applicant->mname ?? '',
                        'employee_lname' => $applicant->lname ?? '',
                        'employee_suffix' => $applicant->suffix ?? '',
                        'department' => $jo->department ?? null,
                        'account' => $jo->account ?? null,
                        'sup_id' => null,
                        'position' => $request->jobPos,
                        'site' => $applicant->site ?? '',
                        'gender' => $applicant->gender ?? '',
                        'password' => Hash::make('Business12'),
                    ]);
                }
                
                return response()->json([
                    'count' => $count,
                    'data' => 'success',
                    'url' => $url,
                    'path' => $path
                ], 200);
            }

            // Log when no file is detected
            Log::warning('No file uploaded', [
                'request_data' => $request->all(),
                'content_type' => $request->header('Content-Type'),
                'files' => $request->allFiles()
            ]);

            return response()->json([
                'error' => 'No file uploaded',
                'debug' => [
                    'has_file' => $request->hasFile('file'),
                    'content_type' => $request->header('Content-Type'),
                    'all_files' => array_keys($request->allFiles())
                ]
            ], 400);
            
        } catch (\Exception $e) {
            Log::error('File upload error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'File upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function reupload_file(Request $request)
    {
        try {
            $preempfile = PreEmploymentFile::where('id', $request->id)->first();
            $applicant = Applicant::where('app_id', $request->app_id)->first();
            $job_offer = JobOffer::where('app_id', $request->app_id)->first(); // Fixed: use app_id instead of id
            
            if (!$preempfile) {
                return response()->json(['error' => 'File not found'], 404);
            }
            
            if (!$applicant) {
                return response()->json(['error' => 'Applicant not found'], 404);
            }

            if ($request->status == 'Approved') {
                $preempfile->update([
                    'status' => $request->status,
                ]);
            } else if ($request->status !== 'Declined') {
                if ($request->hasFile('file')) {
                    $uploadedFile = $request->file('file');
                    
                    // Check if file is valid
                    if (!$uploadedFile->isValid()) {
                        return response()->json([
                            'error' => 'Invalid file upload: ' . $uploadedFile->getErrorMessage()
                        ], 400);
                    }
                    
                    $path = $uploadedFile->store(date("Y"), 's3');
                    $url = 'https://s3.amazonaws.com/' . config('filesystems.disks.s3.bucket') . '/' . $path;

                    $preempfile->update([
                        'status' => $request->status,
                        'reas' => $request->reas ?? '',
                        'reqs_img' => $url,
                    ]);
                }
            } else if ($request->status === 'Declined') {
                if ($request->hasFile('file')) {
                    $uploadedFile = $request->file('file');
                    
                    // Check if file is valid
                    if (!$uploadedFile->isValid()) {
                        return response()->json([
                            'error' => 'Invalid file upload: ' . $uploadedFile->getErrorMessage()
                        ], 400);
                    }
                    
                    $path = $uploadedFile->store(date("Y"), 's3');
                    $url = 'https://s3.amazonaws.com/' . config('filesystems.disks.s3.bucket') . '/' . $path;

                    $preempfile->update([
                        'status' => 'Uploaded',
                        'reas' => '',
                        'reqs_img' => $url,
                    ]);
                } else {
                    $preempfile->update([
                        'status' => 'Declined',
                        'reas' => $request->reas ?? '',
                    ]);

                    $data = array_merge($preempfile->toArray(), $applicant->toArray(), $request->all());
                    $data['reason'] = $request->reas ?? '';
                    $data['reqs'] = $request->reqs ?? '';
                    $data['job_offer_id'] = $request->job_offer_id ?? '';

                    Mail::to($applicant->email)->send(new DeclinedRequirements($data));
                }
            }

            if ($request->reqs == 'Contract' && $request->status != 'Declined') {
                $jo = JobOffer::where([
                    ['app_id', '=', $request->app_id],
                    ['status', '=', 'Contract Signing'],
                ])->first();
                if ($jo) {
                    $jo->update([
                        'status' => 'Hired'
                    ]);
                }
            } else if ($request->reqs == 'Contract' && $request->status == 'Declined') {
                if ($job_offer && $applicant) {
                    $data = array_merge($job_offer->toArray(), $applicant->toArray(), $request->all());
                    $data['reason'] = $request->reas ?? '';
                    $data['site'] = $request->site ?? '';
                    $data['job_offer_id'] = $request->job_offer_id ?? '';
                    Mail::to($request->email ?? $applicant->email)->send(new DeclinedContract($data));
                }
            }

            return response()->json([
                'success' => true,
                'hasFile' => $request->hasFile('file'),
                'data' => $this->index()->original['data']
            ], 200);
            
        } catch (\Exception $e) {
            Log::error('File reupload error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'error' => 'File reupload failed: ' . $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        // $preempfile = PreEmploymentFile::where('id', $request->id)->first();

        // if (!$preempfile) {
        //     return response()->json(['error' => 'File not found'], 404);
        // }
        // if ($request->status !== 'Declined') {
        //     // $preempfile->update([
        //     //     'status' => $request->status,
        //     //     'reas' => $request->reas,
        //     // ]);

        // } elseif ($request->status === 'Declined') {
        //     $defaultReason = 'blurred contract';
        //     $reas = $request->reas ?: $defaultReason;

        //     if ($request->hasFile('file')) {
        //         $uploadedFile = $request->file('file');
        //         $path = $uploadedFile->store(date("Y"), 's3');
        //         $url = Storage::disk('s3')->url($path);

        //         $preempfile->update([
        //             'status' => 'Uploaded',
        //             'reas' => '',
        //             'reqs_img' => $url,
        //         ]);
        //     } else {
        //         $preempfile->update([
        //             'status' => 'Declined',
        //             'reas' => $reas,
        //         ]);
        //     }
        // }


        // if ($request->reqs == 'Contract' && $request->status != 'Declined') {
        //     $jo = JobOffer::where([
        //         ['app_id', '=', $request->app_id],
        //         ['status', '=', 'Contract Signing'],
        //     ])->first();
        //     $jo->update([
        //         'status' => 'Hired'
        //     ]);
        // } else if ($request->reqs == 'Contract' && $request->status == 'Declined') {
        //     Mail::to($request->email)->send(new DeclinedContract($request->all()));
        // }

        // return response()->json([
        //     'data' => $this->index()->original['data']
        // ], 200);
    }
}
