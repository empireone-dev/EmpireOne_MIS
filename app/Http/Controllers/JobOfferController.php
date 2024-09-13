<?php

namespace App\Http\Controllers;

use App\Mail\JobOffer as MailJobOffer;
use App\Models\Applicant;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class JobOfferController extends Controller
{
    public function index(){
        $joboffer = JobOffer::with('applicant')->get();
        return response()->json([
            'data' => $joboffer
        ], 200);
    }
    public function store(Request $request){
        $data = $request->all();
        JobOffer::create($request->all());
        Mail::to($request->email)->send(new MailJobOffer($data));
    }
}
