<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationFinalPhysical;
use App\Mail\ConfirmationFinalVirtual;
use App\Mail\DeclinedConfirmation;
use App\Mail\FailedFinal;
use App\Mail\FailedInitial;
use App\Models\Applicant;
use App\Models\FinalRate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FinalRateController extends Controller
{
    public function store(Request $request)
    {
        // Assuming you want to insert all the fields from the request into the finalRate model
        // Validate the incoming request data
        $validatedData = $request->validate([
            'app_id' => 'required',
            // 'interdate'=> 'nullable',
            // 'intertime'=> 'nullable',
            // 'glink'=> 'nullable',
            'cscore' => 'nullable',
            'cnotes' => 'nullable',
            'wscore' => 'nullable',
            'wnotes' => 'nullable',
            'ocomment' => 'nullable',
            // 'oresult'=> 'nullable',
            'oavg' => 'nullable',
            'interviewer' => 'nullable',
            // 'conducted'=> 'nullable',
        ]);

        if ($request->oavg < 3) {
            Applicant::where('app_id', $request->app_id)->update([
                'status' => 'Send Failed'
            ]);

            // // Prepare data for the email
            // $applicant = Applicant::where('app_id', $request->app_id)->first();

            // $mailData = [
            //     'fname' => $applicant->fname,
            //     'mname' => $applicant->mname,
            //     'lname' => $applicant->lname,
            //     'email' => $applicant->email,
            // ];

            // Mail::to($applicant->email)->send(new FailedFinal($mailData));
        } else {
            Applicant::where('app_id', $request->app_id)->update([
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

    public function final_update_applicant_after_confirmation_status(Request $request, $app_id)
    {

        $applicant = Applicant::where('app_id', $app_id)->first();

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update([
            'status' => $request->status,
        ]);

        $decodedMeetLink = $request->meet_link ? base64_decode($request->meet_link) : null;

        $data = [
            'fname' => $applicant->fname,
            'lname' => $applicant->lname,
            'status' => $request->status,
            'app_id' => $applicant->app_id,
            'iffdate' => $request->iffdate,
            'ifftime' => $request->ifftime,
            'meet_link' => $decodedMeetLink,
        ];

        if ($decodedMeetLink) {
            Mail::to('hiring@empireonegroup.com')->send(new ConfirmationFinalVirtual($data));
        } else {
            Mail::to('hiring@empireonegroup.com')->send(new ConfirmationFinalPhysical($data));
        }

        return response()->json([
            'message' => 'Applicant status updated successfully.',
            'app_id' => $applicant->app_id,
        ]);
    }

    public function final_declined_attendance(Request $request, $app_id)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $applicant = Applicant::where('app_id', $app_id)->first();

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $data = [
            'app_id' => $applicant->app_id,
            'fname' => $applicant->fname,
            'lname' => $applicant->lname,
            'reason' => $request->reason,
        ];


        Mail::to('hiring@empireonegroup.com')->send(new DeclinedConfirmation($data));

        return response()->json([
            'message' => 'Applicant decline reason submitted successfully.',
            'app_id' => $applicant->app_id,
        ]);
    }
}
