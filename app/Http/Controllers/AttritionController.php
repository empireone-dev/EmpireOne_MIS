<?php

namespace App\Http\Controllers;

use App\Models\Attrition;
use Illuminate\Http\Request;

class AttritionController extends Controller
{
    public function store(Request $request)
    {


        $attrition = Attrition::where('app_id', $request->app_id)->first();
        if ($attrition) {
            return response()->json([
                'status' => 'exist',
            ], 200);
        } else {
            Attrition::create([
                'app_id' => $request->app_id,
                'emp_id' => $request->app_id,
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

            return response()->json([
                'status' => 'success',
            ], 200);
        }
    }
}
