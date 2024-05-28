<?php

namespace App\Http\Controllers;

use App\Models\JobPosition;
use Illuminate\Http\Request;

class JobPositionController extends Controller
{
    public function index(){
        $jobpos = JobPosition::get();
        return response()->json([
            'data' => $jobpos
        ], 200);
    }
}
