<?php

namespace App\Http\Controllers;

use App\Mail\Attrition as MailAttrition;
use App\Mail\Cleared;
use App\Mail\QuitClaim;
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
                'status' => $request->status,
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
            $file = $request->file('file');
            $path = $file->store(date("Y"), 's3');

            // Get the full S3 URL for the uploaded file
            $url = 'https://' . config('filesystems.disks.s3.bucket') . '.s3.' . config('filesystems.disks.s3.region') . '.amazonaws.com/' . $path;

            if ($path) {
                $emailData = $data;
                if ($request->job_offer_id) {
                    $emailData['job_offer_id'] = $request->job_offer_id;
                    $emailData['jobPos'] = $request->jobPos;
                }
                Mail::to($request->email)->send(new QuitClaim($emailData, $url));

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
                ModelsQuitClaim::create([
                    'app_id' =>  $request->app_id,
                    'emp_id' =>  $request->emp_id,
                    'file'   => $url,
                ]);
            }
        }

        // Mail::to("scaccounting@gmail.com")->send(new Cleared(array_merge(
        //     $request->all(),
        // )));

        return response()->json([
            'data' => 'success',
        ], 200);
    }
}
