<?php

namespace App\Http\Controllers;

use App\Models\OnboardingAck;
use App\Models\OnboardingDoc;
use Illuminate\Http\Request;

class OnboardingDocController extends Controller
{
    public function index(Request $request){
        $od = OnboardingAck::where([
            ['app_id','=',$request->app_id],
            ['status','=','Acknowledged'],
        ])->first();

        $onboardingdoc = OnboardingDoc::get();
        return response()->json([
            'od'=>$od,
            'data' => $onboardingdoc
        ], 200);
    }
}
