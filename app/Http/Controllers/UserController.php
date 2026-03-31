<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\ESignature;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('employee')->get();
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

        $e_signature = ESignature::where('emp_id', $request->employee_id)->orWhere('app_id', $request->app_id)->first();

        if ($e_signature) {
            if ($request->signature) {
                $e_signature->update([
                    'signature' => $request->signature,
                ]);
            }
        } else {
            ESignature::create([
                'app_id' => $request->app_id,
                'emp_id' => $request->employee_id,
                'signature' => $request->signature,
            ]);
        }


        return response()->json([
            'data' => 'success'
        ], 200);
    }

    public function update_password(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully.',
        ], 200);
    }
}
