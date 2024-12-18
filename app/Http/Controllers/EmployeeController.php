<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\CVFile;
use App\Models\Employee;
use App\Models\User;
use App\Models\WorkingExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        // Start with the base query, eager loading relationships
        $query = Employee::query()->with(['applicant', 'user', 'department']);

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
        $data = $request->all();
        $data['caddress'] = $request->lot . ' ' . $request->brgy . ' ' . $request->city . ' ' . $request->province;
        $data['app_id'] = $request->app_id;
        Applicant::create($data);

        if (!is_array($request->work_experience)) {
            // If work_experience is not an array, try to decode it as JSON
            $workExperience = json_decode($request->work_experience, true);
        } else {
            $workExperience = $request->work_experience;
        }

        if (is_array($workExperience) && count($workExperience) !== 0) {
            foreach ($workExperience as $jsonValue) {
                // Decode the JSON string to an associative array
                $value = json_decode($jsonValue, true);

                // Check if decoding was successful
                if (is_array($value)) {
                    WorkingExperience::create([
                        'app_id' => $value['app_id'],
                        'company' => $value['company'],
                        'end_at' => $value['end_at'],
                        'position' => $value['position'],
                        'started_at' => $value['started_at'],
                    ]);
                }
            }
        }
        // $employee = Employee::with('applicant')->get();
        Employee::create([
            'app_id' => $request->app_id,
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

        if ($request->hasFile('files')) {
            $path = $request->file('files')->store(date("Y"), 's3');
            $url = Storage::disk('s3')->url($path);
            CVFile::create([
                'app_id' => $request->app_id,
                'file' => $url,
            ]);
        }
        return response()->json([
            'data' => 'success',
        ], 200);
    }


    public function store_new_employee(Request $request)
    {
        // $employee = Employee::with('applicant')->get();
        Employee::create([
            'app_id' => $request->app_id,
            'emp_id' => $request->app_id,
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
            'employee_id' => $request->app_id,
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

        return response()->json([
            'data' => Employee::with('user')->get()
        ], 200);
    }


    public function show($id)
    {
        $employee = Employee::where('emp_id', $id)->with(['attrition', 'applicant', 'user','dept'])->first();
        return response()->json([
            'data' => $employee
        ], 200);
    }
}
