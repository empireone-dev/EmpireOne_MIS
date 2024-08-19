<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    public function index(Request $request){
        $applicant = Applicant::query();
        if ($request->search) {
            $applicant->where('status',$request->search);
        }
        return response()->json([
            'data' => $applicant->paginate(10)
        ], 200);
    }

    public function store(Request $request)
    {
        Applicant::create($request->all());
        return response()->json([
            'status' => 'success',
           'data'=>$this->index()->original['data']
        ], 200);
    }
}
