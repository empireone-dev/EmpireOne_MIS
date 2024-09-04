<?php

namespace App\Http\Controllers;

use App\Mail\InitialEmail;
use App\Mail\InitialvEmail;
use App\Models\Applicant;
use App\Models\InitialRate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendiv_email(Request $request){
        $data = $request->all();
        if ($request->meet_link) {
            Mail::to($data['email'])->send(new InitialvEmail($data));
        }else{
            Mail::to($data['email'])->send(new InitialEmail($data));
        }
        InitialRate::create([
            'app_id'=>$request->app_id,
            'interdate'=>$request->ivdate,
            'intertime'=>$request->ivtime,
            'glink'=>$request->meet_link,
        ]);
        Applicant::where('app_id',$data['app_id'])->update([
            'status'=>'Initial Phase'
        ]);
        return response()->json(['message' => 'Email sent successfully!']);
    }
}
