<?php

namespace App\Http\Controllers;

use App\Mail\OnboardingAck as MailOnboardingAck;
use App\Models\OnboardingAck;
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
        $data = $request->all();
        $onboardingack = OnboardingAck::create($data);
        Mail::to($request->email)->send(new MailOnboardingAck(array_merge(
            $request->all(),
            ['id' => $onboardingack->id]
        )));

        return response()->json([
            $onboardingack,
            'data' => 'success'
        ], 200);
    }
}
