<?php

namespace App\Http\Controllers;

use App\Models\SchedulePolicyAcknowledge;
use Illuminate\Http\Request;

class SchedulePolicyAcknowledgeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'emp_id'    => 'required|string',
            'emp_name'  => 'required|string',
            'signature' => 'required|string',
        ]);

        $ack = SchedulePolicyAcknowledge::updateOrCreate(
            ['emp_id' => $validated['emp_id']],
            [
                'emp_name'        => $validated['emp_name'],
                'signature'       => $validated['signature'],
                'acknowledged_at' => now(),
            ]
        );

        return response()->json(['data' => $ack], 200);
    }

    public function show($emp_id)
    {
        $ack = SchedulePolicyAcknowledge::where('emp_id', $emp_id)->first();
        return response()->json(['data' => $ack], 200);
    }
}
