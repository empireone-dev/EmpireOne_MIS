<?php

namespace App\Http\Controllers;

use App\Models\OnboardingDoc;
use Illuminate\Http\Request;

class OnboardingDocController extends Controller
{
    public function index(){
        $onboardingdoc = OnboardingDoc::get();
        return response()->json([
            'data' => $onboardingdoc
        ], 200);
    }
}
