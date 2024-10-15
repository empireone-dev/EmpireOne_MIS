<?php

namespace App\Http\Controllers;

use App\Models\Employee;
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
        // $employee = Employee::with('applicant')->get();
        Employee::create([
            'app_id' => $request->app_id,
            'emp_id' => $request->app_id,
            'position' => $request->jobPos,
            // 'dept'=>$request->,
            // 'account'=>$request->,
            // 'sup_id'=>$request->,
            'hired' => $request->hired_date,
            'eogs' => $request->eogs,
            'status' => $request->status,
        ]);
        return response()->json([
            'data' => []
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
