<?php

namespace App\Http\Controllers;

use App\Mail\JobOffer as MailJobOffer;
use App\Mail\PreEmploymentEmail;
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
        $jo = JobOffer::create($data);
        Mail::to($request->email)->send(new MailJobOffer(array_merge(
            $request->all(),
            ['id' => $jo->id]
        )));
        
        return response()->json([
            $jo ,
            'data' => 'success'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $jo = JobOffer::where('id', '=',  $request->id)->first();
        $jo->update([
            'status' => $request->status,
            'reas' => $request->reas
        ]);
        if ($request->status == 'Accepted') {
            // Applicant::where('app_id', $id)->update([
            //     'status' => 'Contract Signing'
            // ]);
            Mail::to($request->email)->send(new PreEmploymentEmail(array_merge(
                $request->all(),
                ['id' => $jo->id]
            )));
            
        }
        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
