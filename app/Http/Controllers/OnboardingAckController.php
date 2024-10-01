<?php

namespace App\Http\Controllers;

use App\Mail\OnboardingAck as MailOnboardingAck;
use App\Models\JobOffer;
use App\Models\OnboardingAck;
use App\Models\OnboardingDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OnboardingAckController extends Controller
{
    public function index()
    {
        $onboardingack = OnboardingAck::get();
        return response()->json([
            'data' => $onboardingack
        ], 200);
    }

    public function store(Request $request)
    {
        $ods =  OnboardingDoc::get();
        foreach ($ods as $key => $od) {
            OnboardingAck::create([
                'app_id' => $request->app_id,
                'doc_name' => $od['doc_name'],
                'status' => 'Sent'
            ]);
        }
        Mail::to($request->email)->send(new MailOnboardingAck($request->all()));

        return response()->json([
            $ods,
            'data' => 'success'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        JobOffer::where([
            ['app_id', '=', $id],
            ['status', '=', 'Accepted']
        ])->update([
            'status' => 'Contract Signing'
        ]);
        OnboardingAck::where('app_id', $id)->update([
            'status' => 'Acknowledged'
        ]);
    }
}
