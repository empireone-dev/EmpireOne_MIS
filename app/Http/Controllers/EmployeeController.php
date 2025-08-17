<?php

namespace App\Http\Controllers;

use App\Mail\JobOffer;
use App\Models\Applicant;
use App\Models\CVFile;
use App\Models\Employee;
use App\Models\JobOffer as ModelsJobOffer;
use App\Models\User;
use App\Models\WorkingExperience;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        // Start with the base query, eager loading relationships
        $query = Employee::query()->with(['applicant', 'user', 'department', 'job_offer'])->orderBy('id', 'desc');

        if ($request->site != 'null' && $request->site) {
            // $query->where('site', '=', $request->site);
            $query->orWhereHas('applicant', function ($q) use ($request) {
                $q->where('site', '=', $request->site);
            });
        }
        // Apply account filter if the account parameter is present
        if ($request->account != 'null' && $request->account != 'N/A' && $request->account) {
            $query->where('account', '=', $request->account);
        } else if ($request->account == 'N/A') {
            $query->where('account', '=', null);
            $query->orWhere('account', '=', '');
        }
        if ($request->status != 'null' && $request->status) {
            $query->where('status', '=', $request->status);
        }

        // Apply searching if the searching parameter is present
        if ($request->searching) {
            $query->where(function ($subQuery) use ($request) {
                // Search by applicant ID
                $subQuery->where('app_id', 'LIKE', '%' . $request->searching . '%')
                    ->orWhereHas('applicant', function ($query) use ($request) {
                        // Search by last name, first name, or middle name in the applicant relation
                        $query->where('lname', 'LIKE', '%' . $request->searching . '%')
                            ->orWhere('fname', 'LIKE', '%' . $request->searching . '%')
                            ->orWhere('mname', 'LIKE', '%' . $request->searching . '%');
                    });
            });
        }

        // Execute the query and paginate the results
        $applicants = $query->paginate(10);

        // Return the results as JSON
        return response()->json([
            'data' => $applicants
        ], 200);
    }


    public function store(Request $request)
    {

        $today = date('Y-m-d');
        $count = Applicant::whereDate('submitted', $today)->count();
        $dateUnique = Carbon::now()->format('mdyHisv');

        $data = $request->all();
        $experiences = $request->work_experience ?? [];
        $data['caddress'] = $request->lot . ' ' . $request->brgy . ' ' . $request->city . ' ' . $request->province;
        $data['app_id'] = $dateUnique;

        Applicant::create($data);

        if ($experiences) {
            foreach ($experiences as $experience) {
                WorkingExperience::create([
                    'app_id'    => $dateUnique,
                    'company'   => $experience['company'] ?? null,
                    'position'  => $experience['position'] ?? null,
                    'started_at' => $experience['started_at'] ?? null,
                    'end_at'    => $experience['end_at'] ?? null,
                ]);
            }
        }

        // $employee = Employee::with('applicant')->get();
        Employee::create([
            'app_id' => $dateUnique,
            'emp_id' => $request->app_id,
            'position' => $request->position,
            'dept' => $request->dept,
            'account' => $request->account,
            'sup_id' => $request->sup_id,
            'hired' => $request->hired,
            // 'due' => $request->due,
            'eogs' => $request->email,
            'status' => $request->status,
        ]);

        User::create([
            'role_id' => '7',
            'employee_id' => $request->app_id,
            'employee_fname' => $request->fname,
            'employee_mname' => $request->mname,
            'employee_lname' => $request->lname,
            'employee_suffix' => $request->suffix,
            'email' => $request->email,
            'department' => $request->dept,
            'account' => $request->account,
            'sup_id' => $request->sup_id,
            'position' => $request->position,
            // 'profile' => $request->profile, // Ensure this is either a URL or valid path if it's an image or file
            'site' => $request->site,
            // 'googlecal' => $request->googlecal,
            'gender' => $request->gender,
            'password' => Hash::make('Business12'),
        ]);



        $base64Files = $request->input('files');
        $uploadedFiles = [];
        if ($base64Files) {
            foreach ($base64Files as $base64) {
                if (!preg_match('/^data:(.*?);base64,/', $base64, $matches)) {
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
                $url = Storage::disk('s3')->url($filename);

                $uploadedFiles[] = $url;

                // Save file record
                CVFile::create([
                    'app_id' =>  $dateUnique,
                    'file'   => $url,
                ]);
            }
        }
        return response()->json([
            'count'  => $count,
            'data' => 'success',
        ], 200);
    }


    public function store_new_employee(Request $request)
    {

        $today = date('Y-m-d');
        $count = Employee::whereDate('created', $today)->count();
        $countNumber = str_pad($count, 2, '0', STR_PAD_LEFT);
        $dateUnique = date('ymd') . $countNumber;
        // $employee = Employee::with('applicant')->get();
        Employee::create([
            'app_id' => $request->app_id,
            'emp_id' => $dateUnique,
            'position' => $request->jobPos,
            'dept' => $request->department,
            'account' => $request->account,
            'sup_id' => $request->sup_id,
            'hired' => $request->hired,
            // 'due' => $request->due,
            'eogs' => $request->eogs,
            'status' => $request->emp_status,
        ]);

        User::create([
            'role_id' => '7',
            'employee_id' => $dateUnique,
            'employee_fname' => $request->fname,
            'employee_mname' => $request->mname,
            'employee_lname' => $request->lname,
            'employee_suffix' => $request->suffix,
            'department' => $request->department,
            'account' => $request->account,
            'sup_id' => $request->sup_id,
            'position' => $request->jobPos,
            // 'profile' => $request->profile, // Ensure this is either a URL or valid path if it's an image or file
            'site' => $request->site,
            // 'googlecal' => $request->googlecal,
            'gender' => $request->gender,
            'password' => Hash::make('Business12'),
        ]);

        return response()->json([
            'data' => 'success',
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'message' => 'Employee not found.',
            ], 404);
        }

        $employee->update($request->all());

        $jobOffer = ModelsJobOffer::where('app_id', '=', $request->app_id)
            ->where('status', '=', 'Hired')
            ->first();
        $jobOffer->update([
            'jobPos' => $request->position,
            'department' => $request->dept,
            'account' => $request->account,
        ]);

        $employeeByEmpId = User::where('employee_id', $request->employee_id)->first();
        if ($employeeByEmpId) {
            $employeeByEmpId->update([
                'employee_id' => $request->employee_id,
            ]);
        }

        return response()->json([
            'data' => Employee::with('user')->get()
        ], 200);
    }


    public function show($id)
    {
        $employee = Employee::where('app_id', $id)->with(['attrition', 'applicant', 'user', 'dept'])->first();
        return response()->json([
            'data' => $employee
        ], 200);
    }

    public function showForQR($id)
    {
        // Public endpoint for QR code scanning - no authentication required
        $employee = Employee::where('emp_id', $id)->with(['applicant', 'dept'])->first();

        if (!$employee) {
            return response()->json([
                'error' => 'Employee not found',
                'message' => 'No employee found with the provided ID'
            ], 404);
        }

        return response()->json([
            'data' => $employee
        ], 200);
    }
}
