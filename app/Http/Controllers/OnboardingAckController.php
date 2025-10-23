<?php

namespace App\Http\Controllers;

use App\Mail\AcknowledgeOnboarding;
use App\Mail\OnboardingAck as MailOnboardingAck;
use App\Models\ESignature;
use App\Models\JobOffer;
use App\Models\OnboardingAck;
use App\Models\OnboardingDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class OnboardingAckController extends Controller
{

    public function uploadBase64Image($signature)
    {
        try {
            list($type, $data) = explode(';', $signature);
            list(, $data) = explode(',', $data);

            $decodedImage = base64_decode($data);
            if ($decodedImage === false) {
                return 'none';
            }

            if (!str_contains($type, 'image/')) {
                return 'none';
            }

            $filename = uniqid() . '.png';
            $path = 'empireone-financing/' . date("Y") . '/' . $filename;

            Storage::disk('s3')->put($path, $decodedImage);
            return "https://s3.amazonaws.com/empireone-ticketing-system/" . $path;
        } catch (\Exception $e) {
            return 'none';
        }
    }
    public function index()
    {
        $onboardingack = OnboardingAck::with('onboardingDoc', 'eSignature')->get();
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
        $signature = $this->uploadBase64Image($request->signature);
        JobOffer::where([
            ['id', '=', $id],
            ['status', '=', 'For Acknowledgment'],
        ])->update([
            'status' => 'Contract Signing'
        ]);
        OnboardingAck::where('app_id', $request->app_id)->update([
            'status' => 'Acknowledged'
        ]);
        ESignature::create([
            'app_id' => $request->app_id,
            'signature' => $signature,
        ]);
        $data = [
            'fname' => $request->fname,
            'lname' => $request->lname,
            'app_id' => $request->app_id,
            'position' => $request->position,
            'signature' => $signature,
            'site' => $request->site
        ];
        $emailRecipient = ($request->site === 'Carcar') ? 'career@empireonegroup.com' : 'hiring@empireonegroup.com';
        // $emailRecipient = 'quicklydeguzman@gmail.com';
        Mail::to($emailRecipient)->send(new AcknowledgeOnboarding($data));
        return response()->json($request->all(), 200);
    }

    public function onboarding_ackdoc_by_id(Request $request, $app_id)
    {
        $res = OnboardingAck::whereNotNull('doc_id')->with('onboardingDoc', 'eSignature')->where('app_id', $app_id)->get();
        $jo = JobOffer::where('id', $request->job_offer_id)->with('applicant')->first();
        if ($res->isEmpty()) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        return response()->json([
            'data' => $res,
            'job_offer' => $jo
        ], 200);
    }

    public function getSignatureBase64($path)
    {
        $s3 = Storage::disk('s3');
        $file = $s3->get($path); // $path should be relative to the S3 bucket, not the full URL
        $base64 = 'data:image/png;base64,' . base64_encode($file);
        return $base64;
    }

    public function get_onboarding_ackdoc_by_app_id(Request $request, $app_id)
    {
        try {
            $res = OnboardingAck::whereNotNull('doc_id')
                ->with('onboardingDoc', 'eSignature')
                ->where('app_id', $app_id)
                ->get();

            $jo = null;
            if ($request->has('job_offer_id') && $request->job_offer_id) {
                $jo = JobOffer::where('id', $request->job_offer_id)->first();
            }

            if ($res->isEmpty()) {
                return response()->json([
                    'message' => 'Document not found',
                    'signature' => null,
                    'data' => [],
                    'job_offer' => $jo
                ], 404);
            }

            // Check if eSignature exists and has signature data
            $signature = null;
            if (
                isset($res[0]) && 
                is_array($res[0]) || is_object($res[0]) && 
                isset($res[0]['eSignature']) && 
                $res[0]['eSignature'] && 
                isset($res[0]['eSignature']['signature']) && 
                $res[0]['eSignature']['signature']
            ) {
                $path = str_replace("https://s3.amazonaws.com/empireone-ticketing-system/", "", $res[0]['eSignature']['signature']);
                $signature = $this->getSignatureBase64($path);
            }

            return response()->json([
                'signature' => $signature,
                'data' => $res,
                'job_offer' => $jo
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error in get_onboarding_ackdoc_by_app_id: ' . $e->getMessage(), [
                'app_id' => $app_id,
                'job_offer_id' => $request->job_offer_id ?? null,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An error occurred while fetching the document',
                'signature' => null,
                'data' => [],
                'job_offer' => null
            ], 500);
        }
    }
}
