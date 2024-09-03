<?php

namespace App\Http\Controllers;

use App\Mail\InitialEmail;
use App\Mail\InitialvEmail;
use App\Models\Applicant;
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
      
        Applicant::where('app_id',$data['app_id'])->update([
            'status'=>'Initial Phase'
        ]);
        return response()->json(['message' => 'Email sent successfully!']);
    }
}
