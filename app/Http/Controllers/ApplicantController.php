<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    public function index(Request $request)
    {
        $applicant = Applicant::query();
        if ($request->search) {
            $applicant->where('status', $request->search);
        }
        return response()->json([
            'data' => $applicant->paginate(10)
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['caddress'] = $request->lot . ' ' . $request->brgy . ' ' . $request->city . ' ' . $request->province;
        $data['app_id'] = $request->uniqueAppId;
        Applicant::create($data);
        return response()->json([
            'status' => 'success',
            // 'data' => $this->index()->original['data']
        ], 200);
    }

    public function show($app_id){
        $applicant = Applicant::where('app_id',$app_id)->first();
        return response()->json([
            'status' => $applicant,
        ], 200);
    }
}
