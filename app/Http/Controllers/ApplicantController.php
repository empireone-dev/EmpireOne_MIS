<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\JobOffer;
use App\Models\User;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{

    public function get_hired_applicant()
    {
        $applicants = JobOffer::where('status', 'Hired')->with(['applicant'])->get();
        return response()->json([
            'data' => $applicants
        ], 200);
    }

    public function search_applicant(Request $request)
    {
        $applicant = Applicant::where('fname', $request->search)->with(['employee'])
            ->orWhere('lname', $request->search)
            ->orWhere('app_id', $request->search)->get();
        return response()->json([
            'data' => $applicant
        ], 200);
    }
    public function index(Request $request)
    {
        $applicant = Applicant::query()->with(['final', 'initial', 'joboffer', 'user']);
        $user = User::where('position', '=', 'CEO')
            ->orWhere('position', '=', 'Manager')
            ->orWhere('position', '=', 'Director')->get();
        if ($request->search) {
            $applicant->where('status', $request->search);
        }
        if ($request->searching) {
            $applicant->where(function ($query) use ($request) {
                $query->where('fname', 'LIKE', '%' . $request->searching . '%') // Search by first name
                    ->orWhere('lname', 'LIKE', '%' . $request->searching . '%') // Search by last name
                    ->orWhere('mname', 'LIKE', '%' . $request->searching . '%') // Search by last name
                    ->orWhere('app_id', 'LIKE', '%' . $request->searching . '%'); // Search by applicant ID
            });
        }

        return response()->json([
            'interviewer' => $user,
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

    public function show($app_id)
    {
        $applicant = Applicant::where('app_id', $app_id)->with(['final', 'initial', 'joboffer', 'requirements'])->first();
        return response()->json([
            'status' => $applicant,
        ], 200);
    }
}
