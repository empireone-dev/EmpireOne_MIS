<?php

namespace App\Http\Controllers;

use App\Models\EmployeeEngagement;
use Illuminate\Http\Request;

class EmployeeEngagementController extends Controller
{
    public function index(){
        $engagement = EmployeeEngagement::get();
        return response()->json([
            'data' => $engagement
        ], 200);
    }
}
