<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::get();
        return response()->json([
            'result' => $users
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $users = User::find($id);

        $users->update($request->all());

        if (!$request->employee_id) {
            return response()->json([
                'message' => 'Employee ID not provided.',
            ], 400);
        }

        if ($request->employee_id) {
            $applicant = Applicant::where('app_id', $request->employee_id)->first();

            if ($applicant) {
                $applicant->update([
                    'fname' => $request->employee_fname,
                    'mname' => $request->employee_mname,
                    'lname' => $request->employee_lname,
                    'suffix' => $request->employee_suffix,
                    'gender' => $request->gender,
                ]);
            }
        }

        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
