<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Employee;
use App\Models\WorkingExperience;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        // Start with the base query
        $query = Employee::query()->with(['applicant', 'user']);

        // Apply searching if the searching parameter is present
        if ($request->searching) {
            $query->where(function ($subQuery) use ($request) {
                $subQuery->where('app_id', 'LIKE', '%' . $request->searching . '%') // Search by applicant ID
                    ->orWhereHas('applicant', function ($query) use ($request) {
                        $query->where('lname', 'LIKE', '%' . $request->searching . '%') // Search by last name in applicant relation
                            ->orWhere('fname', 'LIKE', '%' . $request->searching . '%') // Search by first name in applicant relation
                            ->orWhere('mname', 'LIKE', '%' . $request->searching . '%'); // Search by middle name in applicant relation
                    });
            });
        }


        // Execute the query and paginate the results
        $applicants = $query->paginate(10);

        return response()->json([
            'data' => $applicants
        ], 200);
    }

    public function store(Request $request)
    {

        $data = $request->all();
        $data['caddress'] = $request->lot . ' ' . $request->brgy . ' ' . $request->city . ' ' . $request->province;
        $data['app_id'] = $request->uniqueAppId;
        Applicant::create($data);

        foreach ($request->work_experience as $key => $value) {
            WorkingExperience::create([
                'app_id' => $request->uniqueAppId,
                'company' => $value['company'],
                'end_at' => $value['end_at'],
                'position' => $value['position'],
                'started_at' => $value['started_at'],
            ]);
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

        return response()->json([
            'data' => 'success',
        ], 200);
    }

    public function show($id)
    {
        $employee = Employee::where('emp_id', $id)->with(['attrition', 'applicant', 'user'])->first();
        return response()->json([
            'data' => $employee
        ], 200);
    }
}
