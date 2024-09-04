<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\GuideQuestion;
use App\Models\GuideQuestions;
use App\Models\InitialRate;
use Illuminate\Http\Request;

class InitialRateController extends Controller
{
    public function store(Request $request)
    {
        // Assuming you want to insert all the fields from the request into the InitialRate model
        // Validate the incoming request data
        $validatedData = $request->validate([
            'app_id' => 'required',
            'tscore' => 'nullable',
            'tnotes' => 'nullable',
            'pscore' => 'nullable',
            'pnotes' => 'nullable',
            'cscore' => 'nullable',
            'cnotes' => 'nullable',
            'ocomment' => 'nullable',
            'oresult' => 'nullable',
            'oavg' => 'nullable',
            'otherqs' => 'nullable',
            'interviewer' => 'nullable',
            'conducted' => 'nullable',
        ]);
        foreach ($request->guideqss as  $value) {
            GuideQuestions::create([
                'int_id' => $request->int_id,
                'app_id' => $request->app_id,
                'guideqs' => $value
            ]);
        }

        if ($request->oavg < 3) {
            Applicant::where('app_id',$request->app_id)->update([
                'status' => 'Failed'
            ]);
        } else {
            Applicant::where('app_id',$request->app_id)->update([
                'status' => 'Final Phase'
            ]);
        }
        // Find the record by its ID
        $initialRate = InitialRate::where('app_id', $request->app_id);

        // Update the record with the validated data
        $initialRate->update($validatedData);

        // Return the updated record
        return response()->json($initialRate, 200);
    }
}
