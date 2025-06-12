<?php

namespace App\Http\Controllers;

use App\Models\InterviewConfirmation;
use Illuminate\Http\Request;

class InterviewConfirmationController extends Controller
{
    public function index()
    {
        $interview_confirmation = InterviewConfirmation::with(['applicant'])->get();
        return response()->json([
            'result' => $interview_confirmation
        ], 200);
    }
}
