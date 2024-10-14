<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $employee = Employee::with(['applicant','user'])->paginate(10);
        return response()->json([
            'data' => $employee
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
        $employee = Employee::where('emp_id',$id)->with(['attrition','applicant','user'])->first();
        return response()->json([
            'data' => $employee
        ], 200);
    }

}
