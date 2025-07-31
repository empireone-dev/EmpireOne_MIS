<?php

namespace App\Http\Controllers;

use App\Mail\ContractPhysical;
use App\Mail\ContractVirtual;
use App\Mail\FailedInitial;
use App\Mail\FinalEmail;
use App\Mail\FinalvEmail;
use App\Mail\InitialEmail;
use App\Mail\InitialvEmail;
use App\Mail\RescheduleFinalEmail;
use App\Mail\RescheduleFinalvEmail;
use App\Mail\RescheduleInitialEmail;
use App\Models\Applicant;
use App\Models\FinalRate;
use App\Models\InitialRate;
use App\Models\PreEmploymentFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class EmailController extends Controller
{
    public function sendiv_email(Request $request)
    {
        $data = $request->all();

        if ($request->meet_link) {
            // Virtual interview
            if ($request->phase_status == 'Initial Phase') {
                Mail::to($request->email)->send(new InitialvEmail($data));
                InitialRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->ivdate,
                    'intertime' => $request->ivtime,
                    'glink' => $request->meet_link,
                ]);
            } else if ($request->phase_status == 'Final Phase') {
                Mail::to($request->email)->send(new FinalvEmail($data));
                FinalRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->ivdate,
                    'intertime' => $request->ivtime,
                    'glink' => $request->meet_link,
                ]);
            } else if ($request->phase_status == 'Reschedule Initial Phase') {
                Mail::to($request->email)->send(new RescheduleInitialEmail($data));
                InitialRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->ivdate,
                    'intertime' => $request->ivtime,
                    'glink' => $request->meet_link,
                ]);
            } else if ($request->phase_status == 'Reschedule Final Phase') {
                Mail::to($request->email)->send(new RescheduleFinalvEmail($data));
                FinalRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->ivdate,
                    'intertime' => $request->ivtime,
                    'glink' => $request->meet_link,
                ]);
            }
        } else {
            // Face-to-face interview
            if ($request->phase_status == 'Initial Phase') {
                Mail::to($request->email)->send(new InitialEmail($data));
                InitialRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->iffdate,
                    'intertime' => $request->ifftime,
                ]);
            } else if ($request->phase_status == 'Reschedule Initial Phase') {
                Mail::to($request->email)->send(new RescheduleInitialEmail($data));
                InitialRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->iffdate,
                    'intertime' => $request->ifftime,
                ]);
            } else if ($request->phase_status == 'Final Phase') {
                Mail::to($request->email)->send(new FinalEmail($data));
                FinalRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->iffdate,
                    'intertime' => $request->ifftime,
                ]);
            } else if ($request->phase_status == 'Reschedule Final Phase') {
                Mail::to($request->email)->send(new RescheduleFinalEmail($data));
                FinalRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->iffdate,
                    'intertime' => $request->ifftime,
                ]);
            } else if ($request->phase_status == 'physical_contract_signing') {
                Mail::to($request->email)->send(new ContractPhysical($data));
            } else if ($request->phase_status == 'virtual_contract_signing') {
                if ($request->hasFile('file')) {
                    $path = $request->file('file')->store(date("Y"), 's3');
                    $url = Storage::disk('s3')->url($path);
                    if ($url) {
                        Mail::to($request->email)->send(new ContractVirtual($data, $url));
                    }
                }
            } else if ($request->phase_status == 'upload_contract') {
                if ($request->hasFile('file')) {
                    $path = $request->file('file')->store(date("Y"), 's3');
                    $url = Storage::disk('s3')->url($path);
                    PreEmploymentFile::create([
                        'app_id' => $request->app_id,
                        'reqs' => 'Contract',
                        'reqs_img' => $url,
                        'status' => 'Uploaded',
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Email sent successfully!']);
    }


    public function send_rejection_email(Request $request)
    {
        Applicant::where('app_id', $request->app_id)->update([
            'status' => 'Failed'
        ]);

        $applicant = Applicant::where('app_id', $request->app_id)->first();

        $mailData = [
            'fname' => $applicant->fname,
            'mname' => $applicant->mname,
            'lname' => $applicant->lname,
            'email' => $applicant->email,
        ];
        Mail::to($applicant->email)->send(new FailedInitial($mailData));

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
