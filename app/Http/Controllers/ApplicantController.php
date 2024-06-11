<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    public function index(){
        $applicant = Applicant::paginate(10);
        return response()->json([
            'data' => $applicant
        ], 200);
    }
}
