<?php

namespace App\Http\Controllers;

use App\Models\ERFJa;
use App\Models\ERFJd;
use App\Models\JobPosition;
use App\Models\OutSourcingErf;
use Illuminate\Http\Request;

class OutSourcingErfController extends Controller
{
    public function outsourcing_erf_by_id($ref_id)
    {
        $res = OutSourcingErf::where('ref_id', $ref_id)->with(['ja', 'jd'])->first();

        return response()->json([
            'data' => $res
        ], 200);
    }
    public function count_outsourcing_erf($date)
    {
        $count = OutSourcingErf::whereDate('submitted', $date)->count();

        return response()->json([
            'data' => $count
        ], 200);
    }
    public function index()
    {
        $erfrec = OutSourcingErf::with('user')->get();
        return response()->json([
            'data' => $erfrec
        ], 200);
    }
    public function store(Request $request)
    {

        $erf = OutSourcingErf::create([
            'user_id' => $request->id,
            'ref_id' => $request->ref_id,
            'submitted' => $request->submitted,
            'budgetCost' => $request->budgetCost,
            'dateNeed' => $request->dateNeed,
            'department' => $request->department,
            'jobTitle' => $request->jobTitle,
            'jobType' => $request->jobType,
            'justification' => $request->justification,
            'personnel' => $request->personnel,
            'positionStatus' => $request->positionStatus,
            'sourcingMethod' => $request->sourcingMethod,
            'site' => $request->site,
            'status' => 'Pending',
        ]);

        if ($request->has('ja') && $request->has('jd')) {

            ERFJa::create([
                'jobTitle' => $request->jobTitle,
                'erf_id' => $erf->id,
                'ref_id' => $request->ref_id,
                'content' => $request->ja,
                'site' => $request->site,
            ]);

            ERFJd::create([
                'jobTitle' => $request->jobTitle,
                'erf_id' => $erf->id,
                'ref_id' => $request->ref_id,
                'content' => $request->jd,
                'site' => $request->site,
            ]);
        }

        return response()->json([
            'data' => $request->all()
        ], 200);
    }


    // public function update(Request $request, $id)
    // {
    //     $erfrec = OutSourcingErf::where('id', '=',  $request->id)->first();
    //     $erfrec->update([
    //         'status' => $request->status,
    //     ]);
    //     return response()->json([
    //         'data' => 'success'
    //     ], 200);
    // }

    public function update(Request $request, $id)
    {
        $erfrec = OutSourcingErf::find($id);
        $erfrec->update([
            'status' => $request->status,
        ]);

        if ($request->status === 'Approved') {
            // Create a new Job Position
            JobPosition::create([
                'ref_id' => $request->ref_id,
                'salary' => $request->budgetCost,
                'jPosition' => $request->jobTitle,
                'status' => 'Approved',
                'site' => $request->site,
            ]);
        }

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}
