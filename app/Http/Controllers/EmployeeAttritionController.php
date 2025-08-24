<?php

namespace App\Http\Controllers;

use App\Models\EmployeeAttrition;
use Illuminate\Http\Request;

class EmployeeAttritionController extends Controller
{
    public function index(Request $request)
    {
        $query = EmployeeAttrition::with('applicant', 'employee', 'quit_claim');

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;

            $query->where(function ($q) use ($searchTerm) {
                // Search in employee attrition fields
                $q->where('reas', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('estatus', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('status', 'LIKE', "%{$searchTerm}%")

                    // Handle common search term variations for better UX
                    ->orWhere(function ($subQ) use ($searchTerm) {
                        if (stripos($searchTerm, 'resignation') !== false) {
                            $subQ->where('reas', 'LIKE', '%Resigned%');
                        }
                        if (stripos($searchTerm, 'resigned') !== false) {
                            $subQ->orWhere('reas', 'LIKE', '%Resignation%');
                        }
                    })

                    // Search in related applicant fields
                    ->orWhereHas('applicant', function ($applicantQuery) use ($searchTerm) {
                        $applicantQuery->where('fname', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('lname', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('email', 'LIKE', "%{$searchTerm}%");
                    })

                    // Search in related employee fields
                    ->orWhereHas('employee', function ($employeeQuery) use ($searchTerm) {
                        $employeeQuery->where('emp_id', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('position', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('dept', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('account', 'LIKE', "%{$searchTerm}%")
                            // Search in employee's applicant data
                            ->orWhereHas('applicant', function ($applicantQuery) use ($searchTerm) {
                                $applicantQuery->where('fname', 'LIKE', "%{$searchTerm}%")
                                    ->orWhere('lname', 'LIKE', "%{$searchTerm}%")
                                    ->orWhere('email', 'LIKE', "%{$searchTerm}%");
                            });
                    });
            });
        }

        // Handle the 'searching' parameter (used by the frontend search component)
        if ($request->has('searching') && !empty($request->searching)) {
            $searchTerm = $request->searching;

            $query->where(function ($q) use ($searchTerm) {
                // Search in employee attrition fields
                $q->where('reas', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('estatus', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('status', 'LIKE', "%{$searchTerm}%")

                    // Handle common search term variations for better UX
                    ->orWhere(function ($subQ) use ($searchTerm) {
                        if (stripos($searchTerm, 'resignation') !== false) {
                            $subQ->where('reas', 'LIKE', '%Resigned%');
                        }
                        if (stripos($searchTerm, 'resigned') !== false) {
                            $subQ->orWhere('reas', 'LIKE', '%Resignation%');
                        }
                    })

                    // Search in related applicant fields
                    ->orWhereHas('applicant', function ($applicantQuery) use ($searchTerm) {
                        $applicantQuery->where('fname', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('lname', 'LIKE', "%{$searchTerm}%");
                    })

                    // Search in related employee fields
                    ->orWhereHas('employee', function ($employeeQuery) use ($searchTerm) {
                        $employeeQuery->where('emp_id', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('position', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('dept', 'LIKE', "%{$searchTerm}%")
                            ->orWhere('account', 'LIKE', "%{$searchTerm}%")
                            // Search in employee's applicant data
                            ->orWhereHas('applicant', function ($applicantQuery) use ($searchTerm) {
                                $applicantQuery->where('fname', 'LIKE', "%{$searchTerm}%")
                                    ->orWhere('lname', 'LIKE', "%{$searchTerm}%");
                            });
                    });
            });
        }

        $employee_attrition = $query->orderBy('id', 'desc')->get();

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
