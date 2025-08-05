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
                'doc_id' => $od['id'],
                'status' => 'Sent'
            ]);
        }

        JobOffer::where('id', $request->id)
            ->update([
                'status' => "For Acknowledgment",
            ]);


        Mail::to($request->email)->send(new MailOnboardingAck($request->all()));

        return response()->json([
            $ods,
            'data' => 'success'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        JobOffer::where([
            ['id', '=', $id],
            ['status', '=', 'For Acknowledgment'],
        ])->update([
            'status' => 'Contract Signing'
        ]);
        OnboardingAck::where('app_id', $id)->update([
            'status' => 'Acknowledged'
        ]);
    }

    public function onboarding_ackdoc_by_id($app_id)
    {
        $res = OnboardingAck::with('onboardingDoc')->where('app_id', $app_id)->get();

        if ($res->isEmpty()) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        return response()->json([
            'data' => $res
        ], 200);
    }
}
