<?php

namespace App\Http\Controllers;

use App\Models\ExitFactor;
use App\Models\ExitInterview;
use App\Models\ExitRateInt;
use Illuminate\Http\Request;

class ExitInterviewController extends Controller
{
    public function index()
    {
        $ext_int = ExitInterview::get();
        return response()->json([
            'result' => $ext_int
        ], 200);
    }

    public function store(Request $request)
    {
        ExitInterview::create($request->all());

        foreach ($request->factors as  $value) {
            ExitFactor::create([
                'app_id' => $request->app_id,
                'factors' => $value
            ]);
        }

        ExitRateInt::create($request->all());

        return response()->json([
            'status' => 'success',
            // 'data' => $this->index()->original['data']
        ], 200);
    }
}
