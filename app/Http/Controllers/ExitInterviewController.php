<?php

namespace App\Http\Controllers;

use App\Models\ExitInterview;
use Illuminate\Http\Request;

class ExitInterviewController extends Controller
{
    public function index()
    {
        $ext_int = ExitInterview::with(['user'])->get();
        return response()->json([
            'result' => $ext_int
        ], 200);
    }

    public function store(Request $request)
    {
        ExitInterview::create($request->all());
        return response()->json([
            'status' => 'success',
            'data' => $this->index()->original['data']
        ], 200);
    }
}
