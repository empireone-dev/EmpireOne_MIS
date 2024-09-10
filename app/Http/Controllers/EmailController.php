<?php

namespace App\Http\Controllers;

use App\Mail\FinalEmail;
use App\Mail\FinalvEmail;
use App\Mail\InitialEmail;
use App\Mail\InitialvEmail;
use App\Models\Applicant;
use App\Models\FinalRate;
use App\Models\InitialRate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendiv_email(Request $request)
    {
        $data = $request->all();
        if ($request->meet_link) {
            //vertual
            if ($request->phase_status == 'Initial Phase') {
                Mail::to($request->email)->send(new InitialvEmail($data));
                InitialRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->ivdate,
                    'intertime' => $request->ivtime,
                    'glink' => $request->meet_link,
                ]);
                Applicant::where('app_id', $data['app_id'])->update([
                    'status' => 'Initial Phase'
                ]);
            } else {
                Mail::to($request->email)->send(new FinalvEmail($data));
                FinalRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->ivdate,
                    'intertime' => $request->ivtime,
                    'glink' => $request->meet_link,
                ]);
            }
        } else {
            //f2f
            if ($request->phase_status == 'Initial Phase') {
                Mail::to($request->email)->send(new InitialEmail($data));
                InitialRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->iffdate,
                    'intertime' => $request->ifftime,
                ]);
                Applicant::where('app_id', $data['app_id'])->update([
                    'status' => 'Initial Phase'
                ]);
            } else {
                Mail::to($request->email)->send(new FinalEmail($data));
                FinalRate::create([
                    'app_id' => $request->app_id,
                    'interdate' => $request->iffdate,
                    'intertime' => $request->ifftime,
                ]);
            }
        }


        return response()->json(['message' => 'Email sent successfully!']);
    }
}
