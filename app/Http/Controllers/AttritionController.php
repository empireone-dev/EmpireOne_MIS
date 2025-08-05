<?php

namespace App\Http\Controllers;

use App\Mail\Attrition as MailAttrition;
use App\Models\Attrition;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
}
