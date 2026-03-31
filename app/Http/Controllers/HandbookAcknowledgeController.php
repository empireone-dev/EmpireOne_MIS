<?php

namespace App\Http\Controllers;

use App\Models\HandbookAcknowledge;
use Illuminate\Http\Request;

class HandbookAcknowledgeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'emp_id'    => 'required|string',
            'emp_name'  => 'required|string',
            'signature' => 'required|string',
        ]);

        $ack = HandbookAcknowledge::updateOrCreate(
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
        $ack = HandbookAcknowledge::where('emp_id', $emp_id)->first();

        if (!$ack) {
            return response()->json(['data' => null], 200);
        }

        return response()->json(['data' => $ack], 200);
    }
}
