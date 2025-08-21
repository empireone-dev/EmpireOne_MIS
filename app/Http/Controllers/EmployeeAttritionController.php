<?php

namespace App\Http\Controllers;

use App\Models\EmployeeAttrition;
use Illuminate\Http\Request;

class EmployeeAttritionController extends Controller
{
    public function index()
    {
        $employee_attrition = EmployeeAttrition::with('applicant', 'employee')->orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $employee_attrition
        ], 200);
    }

    public function getByEmpId($emp_id)
    {
        $employee_attrition = EmployeeAttrition::where('emp_id', $emp_id)
            ->with('applicant', 'employee')
            ->first();
        
        if (!$employee_attrition) {
            return response()->json([
                'error' => 'Employee attrition record not found',
                'data' => null
            ], 404);
        }

        return response()->json([
            'data' => $employee_attrition
        ], 200);
    }
}
