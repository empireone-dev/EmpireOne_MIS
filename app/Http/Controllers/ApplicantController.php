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
        $request->validate([
            'courset' => 'nullable',
            'eaddress' => 'nullable',
            'dob' => 'required',
            'email' => 'required',
            'ename' => 'nullable',
            'ephone' => 'nullable',
            'ffname' => 'nullable',
            'fname' => 'required',
            'gender' => 'required',
            'lname' => 'required',
            'lot' => 'nullable',
            'marital' => 'required',
            'mmname' => 'nullable',
            'mname' => 'required', // Include this if you want it required
            'nationality' => 'required',
            'pagibig' => 'nullable',
            'philh' => 'nullable',
            'phone' => 'required',
            'relationship' => 'nullable',
            'religion' => 'required',
            'sss' => 'nullable',
            'status' => 'nullable',
            'tin' => 'nullable',
            'site' => 'nullable',
            'uniqueAppId' => 'required',
            'work_experience' => 'nullable', // If this is required too
        ]);



        $data = $request->all();
        $data['caddress'] = $request->lot . ' ' . $request->brgy . ' ' . $request->city . ' ' . $request->province;

        $applicant = Applicant::create($data);
        $site = ['site'];

        $date = date("y-m-d");
        $count = Applicant::whereDate('submitted', $date)->count();
        $count_number = ($count >= 10) ? $count : '0' . ($count);
        $date_unique = date("ymd") . $count_number;
        $applicant->update([
            'app_id' => $date_unique,
            'status' => 'Pending',
        ]);
        return response()->json([
            'count' => $count,
            'date' => $date,
            'status' => 'success',
            'site' => $site,
        ], 200);
    }

    public function show($app_id)
    {
        $applicant = Applicant::where('app_id', $app_id)->with(['final', 'initial', 'joboffer', 'requirements'])->first();
        return response()->json([
            'status' => $applicant,
        ], 200);
    }


    public function update(Request $request, $id)
    {
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Department not found.',
            ], 404);
        }

        $applicant->update($request->all());

        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
