<?php

namespace App\Http\Controllers;

use App\Mail\Attrition as MailAttrition;
use App\Mail\Cleared;
use App\Mail\ExitInterview;
use App\Mail\LastPay;
use App\Mail\QuitClaim;
use App\Mail\QuitClaimUploaded;
use App\Models\Applicant;
use App\Models\Attrition;
use App\Models\Employee;
use App\Models\QuitClaim as ModelsQuitClaim;
use App\Models\UploadExitClearance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class AttritionController extends Controller
{
    public function uploadBase64File($file)
    {
        try {
            list($type, $data) = explode(';', $file);
            list(, $data) = explode(',', $data);

            $decodedFile = base64_decode($data);
            if ($decodedFile === false) {
                return 'none';
            }

            // detect extension
            if (str_contains($type, 'image/')) {
                $extension = 'png'; // or detect from $type (e.g. image/jpeg → jpg)
            } elseif (str_contains($type, 'application/pdf')) {
                $extension = 'pdf';
            } else {
                return 'none'; // unsupported type
            }

            $filename = uniqid() . '.' . $extension;
            $path = 'empireone-financing/' . date("Y") . '/' . $filename;

            Storage::disk('s3')->put($path, $decodedFile);
            return Storage::disk('s3')->url($path);
        } catch (\Exception $e) {
            return 'none';
        }
    }
    public function store(Request $request)
    {

        $request->validate([
            'reason' => 'required|string',
            'separation' => 'required|date',
        ], [
            'reason.required' => 'The reason field is required.',
            'separation.required' => 'The separation date is required.',
        ]);

        $attrition = Attrition::where('app_id', $request->app_id)->first();
        if ($attrition) {
            return response()->json([
                'status' => 'exist',
            ], 200);
        } else {
            Attrition::create([
                'app_id' => $request->app_id,
                'emp_id' => $request->employee['emp_id'],
                'position' => $request->employee['position'],
                'dept' => $request->employee['dept'],
                'account' => $request->employee['account'],
                'sup_id' => $request->employee['sup_id'],
                'hired' => $request->employee['hired'],
                'eogs' => $request->employee['eogs'],
                'status' => $request->employee['status'],
                'estatus' => 'Pending',
                'reas' => $request->reason,
                'separation' => $request->separation,
            ]);

            // Update Employee status
            $employee = Employee::where('emp_id', $request->employee['emp_id'])->first();

            if (!$employee) {
                return response()->json([
                    'message' => 'Employee not found.',
                ], 404);
            }

            $employee->update([
                'status' => $request->reason,
            ]);

            Mail::to($request->email)->send(new MailAttrition(array_merge(
                $request->all(),
            )));

            return response()->json([
                'status' => 'success',
            ], 200);
        }
    }

    public function send_exit_interview(Request $request)
    {
        $data = $request->all();

        // Fetch applicant data to get fname and lname
        $applicant = null;
        $employee = null;

        if (isset($data['data']['emp_id'])) {
            // Try to get applicant via employee relationship
            $employee = Employee::where('emp_id', $data['data']['emp_id'])->with('applicant')->first();
            $applicant = $employee ? $employee->applicant : null;
        } elseif (isset($data['data']['app_id'])) {
            // Get applicant directly
            $applicant = Applicant::where('app_id', $data['data']['app_id'])->first();
        }

        if (!$applicant) {
            return response()->json([
                'error' => 'Applicant not found',
            ], 404);
        }

        // Prepare email data with int_id (userId) from request
        $emailData = [
            'fname' => $applicant->fname,
            'lname' => $applicant->lname,
            'emp_id' => $data['data']['emp_id'] ?? null,
            'app_id' => $data['data']['app_id'] ?? null,
            'int_id' => $data['userId'] ?? null, // This is the user ID passed from frontend
        ];

        // Merge any additional data
        if (isset($data['data'])) {
            $emailData = array_merge($emailData, $data['data']);
            // Ensure int_id is set
            $emailData['int_id'] = $data['userId'] ?? $emailData['int_id'] ?? null;
        }

        Mail::to($applicant->email)->send(new ExitInterview($emailData));

        return response()->json([
            'data' => 'success'
        ], 200);
    }

    public function upload_exit_clearance(Request $request)
    {
        $dateUnique = Carbon::now()->format('mdyHisv');
        $base64Files = $request->input('files');
        $uploadedFiles = [];
        if ($base64Files && is_array($base64Files)) {
            foreach ($base64Files as $base64) {
                // Ensure $base64 is a string before using preg_match
                if (!is_string($base64) || !preg_match('/^data:(.*?);base64,/', $base64, $matches)) {
                    return response()->json(['error' => 'Invalid base64 file format'], 400);
                }

                $mimeType = $matches[1];
                $extension = explode('/', $mimeType)[1] ?? 'bin'; // fallback to bin if missing

                $fileData = base64_decode(substr($base64, strpos($base64, ',') + 1));
                if ($fileData === false) {
                    return response()->json(['error' => 'Base64 decode failed'], 400);
                }

                $filename = date('Y') . '/' .  $dateUnique . '_' . uniqid() . '.' . $extension;
                Storage::disk('s3')->put($filename, $fileData);

                // Build the URL manually using the S3 configuration
                $bucket = config('filesystems.disks.s3.bucket');
                $region = config('filesystems.disks.s3.region');
                $url = "https://{$bucket}.s3.{$region}.amazonaws.com/{$filename}";

                $uploadedFiles[] = $url;

                // Save file record
                UploadExitClearance::create([
                    'app_id' =>  $request->app_id,
                    'emp_id' =>  $request->emp_id,
                    'file'   => $url,
                ]);

                Attrition::where('app_id', $request->app_id)->update([
                    'estatus' => 'Cleared',
                ]);
            }
        }

        Mail::to($request->email)->send(new Cleared(array_merge(
            $request->all(),
        )));

        return response()->json([
            'data' => 'success',
        ], 200);
    }


    public function send_quit_claim(Request $request)
    {
        $data = $request->all();

        // Validate that a file is uploaded
        if (!$request->hasFile('file')) {
            return response()->json([
                'error' => 'File is required',
            ], 400);
        }

        try {
            $path = $request->file('file')->store(date("Y"), 's3');
            $url = Storage::disk('s3')->url($path);
            if ($path) {
                $emailData = $data;
                if ($request->job_offer_id) {
                    $emailData['job_offer_id'] = $request->job_offer_id;
                    $emailData['jobPos'] = $request->jobPos;
                }

                $recipients = array_unique(array_filter([
                    $request->email,
                    $emailData['personal'] ?? null,
                ]));

                Mail::to($recipients)->send(new QuitClaim($emailData, $path));

                return response()->json([
                    'data' => 'success',
                    'message' => 'Email sent successfully with attachment',
                ], 200);
            } else {
                return response()->json([
                    'error' => 'Failed to upload file to S3',
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to process file upload: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function send_last_pay(Request $request)
    {
        $data = $request->all();

        // Validate that a file is uploaded
        if (!$request->hasFile('file')) {
            return response()->json([
                'error' => 'File is required',
            ], 400);
        }

        try {
            $file = $request->file('file');
            $path = $file->store(date("Y"), 's3');

            if ($path) {
                $emailData = $data;
                if ($request->job_offer_id) {
                    $emailData['job_offer_id'] = $request->job_offer_id;
                    $emailData['jobPos'] = $request->jobPos;
                }
                // Pass the S3 path instead of the full URL
                Mail::to($request->email)->send(new LastPay($emailData, $path));

                return response()->json([
                    'data' => 'success',
                    'message' => 'Email sent successfully with attachment',
                ], 200);
            } else {
                return response()->json([
                    'error' => 'Failed to upload file to S3',
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to process file upload: ' . $e->getMessage(),
            ], 500);
        }
    }


    public function get_employee_attrition_by_emp_id($emp_id)
    {
        $attrition = Attrition::where('emp_id', $emp_id)->with('applicant', 'employee')->first();
        return response()->json([
            'data' => $attrition
        ], 200);
    }

    public function upload_quit_claim(Request $request)
    {
        // Check if employee already has a quit claim uploaded
        $existingQuitClaim = ModelsQuitClaim::where('emp_id', $request->emp_id)->first();
        if ($existingQuitClaim) {
            return response()->json([
                'error' => 'Quit claim already uploaded for this employee',
                'status' => 'already_exists'
            ], 400);
        }

        $base64Files = $request->input('files');
        $uploadedFiles = [];
        if ($base64Files) {
            foreach ($base64Files as $index => $base64) {
                $url = $this->uploadBase64File($base64);
                $uploadedFiles[] = $url;
                ModelsQuitClaim::create([
                    'app_id' =>  $request->app_id,
                    'emp_id' =>  $request->emp_id,
                    'file'   => $url,
                ]);
            }
        }

        $data = $request->all();
        $today = Carbon::now()->format('F j, Y');

        // Send email with the uploaded files
        if (!empty($uploadedFiles)) {
            $emailData = $data;
            $emailData['submitted'] = $today;
            $emailData['files'] = $uploadedFiles;

            $primaryFileUrl = $uploadedFiles[0];

            // Only send email if user is not authenticated
            if (!auth()->check()) {
                $emailRecipient = ($request->site === 'Carcar') ? 'career@empireonegroup.com' : 'hiring@empireonegroup.com';

                // $emailRecipient = 'quicklydeguzman@gmail.com';
                Mail::to($emailRecipient)->send(new QuitClaimUploaded($emailData, $primaryFileUrl));
            }

            return response()->json([
                'data' => 'success',
                'message' => 'Email sent successfully with attachment',
                'uploaded_files' => $uploadedFiles
            ], 200);
        } else {
            return response()->json([
                'error' => 'No files were uploaded',
            ], 400);
        }
    }
}
