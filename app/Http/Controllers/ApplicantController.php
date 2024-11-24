<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\CVFile;
use App\Models\Employee;
use App\Models\JobOffer;
use App\Models\User;
use App\Models\WorkingExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicantController extends Controller
{

    public function get_hired_applicant()
    {
        $applicants = JobOffer::where('status', 'Hired')->with(['applicant', 'employee'])->doesntHave('employee')->get();
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
        $applicant = Applicant::query()
            ->with(['final', 'initial', 'joboffer', 'user']);
        // ->orderBy('status'); // Sort by status in ascending order

        $user = User::whereIn('position', ['CEO', 'Manager', 'Director'])->get();

        if ($request->search) {
            $applicant->where('status', $request->search);
        }

        if ($request->searching) {
            $applicant->where(function ($query) use ($request) {
                $query->where('fname', 'LIKE', '%' . $request->searching . '%')
                    ->orWhere('lname', 'LIKE', '%' . $request->searching . '%')
                    ->orWhere('mname', 'LIKE', '%' . $request->searching . '%')
                    ->orWhere('app_id', 'LIKE', '%' . $request->searching . '%');
            });
        }

        if ($request->status) {
            $applicant->where('status', '=', $request->status);
        }

        return response()->json([
            'interviewer' => $user,
            'data' => $applicant->orderBy('id', 'desc')->paginate(10),
        ], 200);
    }


    public function store(Request $request)
    {
        $request->validate([
            'courset' => 'nullable',
            'eaddress' => 'nullable',
            'dob' => 'required',
            'email' => 'required|email|unique:applicant,email',
            'ename' => 'nullable',
            'ephone' => 'nullable',
            'ffname' => 'nullable',
            'fname' => 'required',
            'gender' => 'required',
            'lname' => 'required',
            'lot' => 'nullable',
            'marital' => 'required',
            'mmname' => 'nullable',
            'mname' => 'required',
            'nationality' => 'required',
            'pagibig' => 'nullable',
            'philh' => 'nullable',
            'phone' => 'required',
            'relationship' => 'nullable',
            'religion' => 'nullable',
            'sss' => 'nullable',
            'status' => 'nullable',
            'tin' => 'nullable',
            'site' => 'required',
            'uniqueAppId' => 'nullable',
            'work_experience' => 'nullable',
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

        if (!is_array($request->work_experience)) {
            // If work_experience is not an array, try to decode it as JSON
            $workExperience = json_decode($request->work_experience, true);
        } else {
            $workExperience = $request->work_experience;
        }

        if (is_array($workExperience) && count($workExperience) !== 0) {
            foreach ($workExperience as $jsonValue) {
                // Decode the JSON string to an associative array
                $value = json_decode($jsonValue, true);

                // Check if decoding was successful
                if (is_array($value)) {
                    WorkingExperience::create([
                        'app_id' => $date_unique,
                        'company' => $value['company'],
                        'end_at' => $value['end_at'],
                        'position' => $value['position'],
                        'started_at' => $value['started_at'],
                    ]);
                }
            }
        }

        if ($request->hasFile('files')) {
            $path = $request->file('files')->store(date("Y"), 's3');
            $url = Storage::disk('s3')->url($path);
            CVFile::create([
                'app_id' => $date_unique,
                'file' => $url,
            ]);
        }

        return response()->json([
            'count' => $count,
            'date' => $date,
            'status' => 200,
            'site' => $site,
            'data' => 'success',
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
        // Update Applicant
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update($request->all());


        $employee = Employee::where('app_id', '=', $request->app_id)->first();

        if (!$employee) {
            return response()->json([
                'message' => 'Employee not found.',
            ], 404);
        }

        $employee->update($request->all());

        // // Update Job Offer
        // $jo = JobOffer::where('app_id', '=', $request->app_id)->first();

        // if (!$jo) {
        //     return response()->json([
        //         'message' => 'Job offer not found.',
        //     ], 404);
        // }

        // $jo->update([
        //     'jobPos' => $request->status,
        //     'salary' => $request->reas,
        // ]);

        // return response()->json([
        //     'data' => 'success'
        // ], 200);
    }



    public function update_address(Request $request, $id)
    {
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update([
            'caddress' => $request->lot . ' ' . $request->brgy . ' ' . $request->city . ' ' . $request->province,
        ]);

        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
