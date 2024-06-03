<?php

namespace App\Http\Controllers;

use App\Models\JobOffer;
use Illuminate\Http\Request;

class JobOfferController extends Controller
{
    public function index(){
        $joboffer = JobOffer::with('applicant')->get();
        return response()->json([
            'data' => $joboffer
        ], 200);
    }
}
