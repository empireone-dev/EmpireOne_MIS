<?php

namespace App\Http\Controllers;

use App\Mail\JobOffer as MailJobOffer;
use App\Models\Applicant;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class JobOfferController extends Controller
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
        JobOffer::create($request->all());
        Mail::to($request->email)->send(new MailJobOffer($data));
    }

    public function update(Request $request, $id)
    {
        $jo = JobOffer::where('id', '=',  $request->id)->first();
        $jo->update([
            'status' => $request->status,
            'reas' => $request->reas
        ]);
        if ($request->status == 'Accepted') {
            Applicant::where('app_id', $id)->update([
                'status' => 'Contract Signing'
            ]);
        }
        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
