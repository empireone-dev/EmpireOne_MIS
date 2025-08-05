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
}
