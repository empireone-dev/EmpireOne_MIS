<?php

namespace App\Http\Controllers;

use App\Mail\NewJobOffer as MailNewJobOffer;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NewJobOfferController extends Controller
{
    public function index()
    {
        $joboffer = JobOffer::with('applicant')->get();
        return response()->json([
            'data' => $joboffer
        ], 200);
    }
    
    public function store(Request $request)
    {
        $data = $request->all();
        $jo = JobOffer::create($data);
        Mail::to($request->email)->send(new MailNewJobOffer(array_merge(
            $request->all(),
            ['id' => $jo->id]
        )));
        
        return response()->json([
            $jo ,
            'data' => 'success'
        ], 200);
    }
}
