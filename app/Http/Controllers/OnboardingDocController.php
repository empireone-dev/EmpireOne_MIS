<?php

namespace App\Http\Controllers;

use App\Models\OnboardingAck;
use App\Models\OnboardingDoc;
use Illuminate\Http\Request;

class OnboardingDocController extends Controller
{
    public function index(Request $request)
    {
        $od = OnboardingAck::where([
            ['app_id', '=', $request->app_id],
            ['status', '=', 'Acknowledged'],
        ])->first();

        $onboardingdoc = OnboardingDoc::get();
        return response()->json([
            'od' => $od,
            'data' => $onboardingdoc
        ], 200);
    }


    public function store(Request $request)
    {

        $erf = OnboardingDoc::create([
            'doc_name' => $request->doc_name,
            'doc_content' => $request->doc_content,
            'site' => $request->site,
        ]);

        return response()->json([
            'data' => $request->all()
        ], 200);
    }

    public function onboarding_doc_by_id($id)
    {
        $res = OnboardingDoc::where('id', $id)->first(); // Use first() instead of get()

        if (!$res) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        return response()->json([
            'data' => $res
        ], 200);
    }


    public function update(Request $request, $id)
    {
        $res = OnboardingDoc::where('id', $id)->first();
        $res->update([
            'doc_content' => $request->doc_content
        ]);
        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
