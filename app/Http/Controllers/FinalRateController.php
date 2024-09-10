<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\FinalRate;
use Illuminate\Http\Request;

class FinalRateController extends Controller
{
    public function store(Request $request)
    {
        // Assuming you want to insert all the fields from the request into the finalRate model
        // Validate the incoming request data
        $validatedData = $request->validate([
            'app_id'=> 'required',
            // 'interdate'=> 'nullable',
            // 'intertime'=> 'nullable',
            // 'glink'=> 'nullable',
            'cscore'=> 'nullable',
            'cnotes'=> 'nullable',
            'wscore'=> 'nullable',
            'wnotes'=> 'nullable',
            'ocomment'=> 'nullable',
            // 'oresult'=> 'nullable',
            'oavg'=> 'nullable',
            'interviewer'=> 'nullable',
            // 'conducted'=> 'nullable',
        ]);

        if ($request->oavg < 3) {
            Applicant::where('app_id',$request->app_id)->update([
                'status' => 'Failed'
            ]);
        } else {
            Applicant::where('app_id',$request->app_id)->update([
                'status' => 'Passed'
            ]);
        }
        // Find the record by its ID
        $finalRate = FinalRate::where('app_id', $request->app_id);

        // Update the record with the validated data
        $finalRate->update($validatedData);

        // Return the updated record
        return response()->json($finalRate, 200);
    }
}
