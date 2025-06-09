<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationInitialPhysical;
use App\Mail\ConfirmationInitialVirtual;
use App\Mail\DeclinedConfirmation;
use App\Mail\GreetingsApplication;
use App\Mail\NewApplication;
use App\Mail\PoolingEmail;
use App\Models\Applicant;
use App\Models\CVFile;
use App\Models\Employee;
use App\Models\JobOffer;
use App\Models\User;
use App\Models\WorkingExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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
            ->with(['final', 'initial', 'joboffer', 'user', 'cvfile', 'guideqs']);
        // ->orderBy('status'); // Sort by status in ascending order
        if ($request->site && $request->site !== 'null') {
            $applicant->where('site', '=', $request->site);
        }

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

        if ($request->status  && $request->status !== 'null') {
            $applicant->where('status', '=', $request->status);
        }




        return response()->json([
            'interviewer' => $user,
            'data' => $applicant->orderBy('id', 'desc')->paginate(10),
        ], 200);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fname'         => 'required|string|max:255',
            'mname'         => 'nullable|string|max:255',
            'lname'         => 'required|string|max:255',
            'suffix'        => 'nullable|string|max:10',
            'dob'           => 'required|date',
            'paddress'      => 'nullable|string|max:500',
            'age'           => 'nullable|integer|min:0',
            'marital'       => 'nullable|string|in:Single,Married,Widowed,Separated,Divorced',
            'gender'        => 'required|string|in:Male,Female,Other',
            'religion'      => 'nullable|string|max:255',
            'nationality'   => 'nullable|string|max:255',
            'email'         => 'required|email|max:255',
            'phone'         => 'required|string|max:20',
            'mmname'        => 'nullable|string|max:255',
            'ffname'        => 'nullable|string|max:255',
            'educ'          => 'nullable|string|max:255',
            'courset'       => 'nullable|string|max:255',
            'sss'           => 'nullable|string|max:20',
            'tin'           => 'nullable|string|max:20',
            'philh'         => 'nullable|string|max:20',
            'pagibig'       => 'nullable|string|max:20',
            'ename'         => 'nullable|string|max:255',
            'eaddress'      => 'nullable|string|max:255',
            'relationship'  => 'nullable|string|max:50',
            'ephone'        => 'nullable|string|max:20',
            'site'          => 'required|string|max:255',
            'lot'           => 'nullable|string|max:255',
            'brgy'          => 'nullable|string|max:255',
            'city'          => 'nullable|string|max:255',
            'province'      => 'nullable|string|max:255',
            'submitted'     => 'nullable|date',
        ]);

        $data = $validatedData;
        $existingApplicant = Applicant::where('fname', $request->fname)
            ->where('mname', $request->mname)
            ->where('lname', $request->lname)
            ->where('suffix', $request->suffix)
            ->first();

        if ($existingApplicant) {
            return response()->json([
                'error' => 'An applicant with the same full name already exists.',
            ], 422);
        }

        $data['caddress'] = trim("{$request->lot}, {$request->brgy}, {$request->city}, {$request->province}");

        // Create applicant record
        $applicant = Applicant::create($data);

        // Generate unique application ID
        $today = date('Y-m-d');
        $count = Applicant::whereDate('submitted', $today)->count();
        $countNumber = $count >= 10 ? $count : '0' . $count;
        $dateUnique = date('ymd') . $countNumber;

        // Update applicant with app_id and status
        $applicant->update([
            'app_id' => $dateUnique,
            'status' => 'Pending',
        ]);

        // Save work experience records
        if (is_array($request->work_experience)) {
            foreach ($request->work_experience as $experience) {
                if (is_array($experience)) {
                    WorkingExperience::create([
                        'app_id'    => $dateUnique,
                        'company'   => $experience['company'] ?? null,
                        'position'  => $experience['position'] ?? null,
                        'started_at' => $experience['started_at'] ?? null,
                        'end_at'    => $experience['end_at'] ?? null,
                    ]);
                }
            }
        }

        // Upload base64 files to S3 and store URLs
        $base64Files = $request->input('files', []);
        $uploadedFiles = [];

        foreach ($base64Files as $base64) {
            if (!preg_match('/^data:(.*?);base64,/', $base64, $matches)) {
                return response()->json(['error' => 'Invalid base64 file format'], 400);
            }

            $mimeType = $matches[1];
            $extension = explode('/', $mimeType)[1] ?? 'bin'; // fallback to bin if missing

            $fileData = base64_decode(substr($base64, strpos($base64, ',') + 1));
            if ($fileData === false) {
                return response()->json(['error' => 'Base64 decode failed'], 400);
            }

            $filename = date('Y') . '/' . $dateUnique . '_' . uniqid() . '.' . $extension;
            Storage::disk('s3')->put($filename, $fileData);
            $url = Storage::disk('s3')->url($filename);

            $uploadedFiles[] = $url;

            // Save file record
            CVFile::create([
                'app_id' => $dateUnique,
                'file'   => $url,
            ]);
        }

        // Send notification email if files were uploaded
        $fileUrl = $uploadedFiles[0] ?? null;

        if ($fileUrl) {
            Mail::to('eogs.quickly@gmail.com')->send(new NewApplication(
                array_merge(
                    $request->all(),
                    ['submitted' => now()->format('Y-m-d')]
                ),
                $fileUrl
            ));
        }

        Mail::to($request->email)->send(new GreetingsApplication(array_merge(
            $request->all(),
            // ['id' => $jo->id],
        )));


        return response()->json([
            'count'  => $count,
            'date'   => $today,
            'status' => 200,
            'data'   => 'success',
        ], 200);
    }


    public function show($app_id)
    {
        $applicant = Applicant::where('app_id', $app_id)->with(['final', 'initial', 'joboffer', 'requirements', 'guideqs'])->first();
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

        $user = User::where('employee_id', '=', $request->app_id)->first();

        if ($user) {
            $userData = $request->except(['id']);
            $user->update($userData);
        }
    }

    public function update_applicant_status(Request $request, $id)
    {
        // Find the applicant
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        // Send email only if status is "Pooling"
        if ($request->status === 'Pooling') {
            Mail::to($request->email)->send(new PoolingEmail(array_merge(
                $request->all()
            )));
        }

        // Update applicant status
        $applicant->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Applicant status updated successfully.',
        ]);
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


    public function update_applicant_after_confirmation_status(Request $request, $app_id)
    {

        $applicant = Applicant::where('app_id', $app_id)->first();

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update([
            'status' => $request->status,
        ]);

        $decodedMeetLink = $request->meet_link ? base64_decode($request->meet_link) : null;

        $data = [
            'fname' => $applicant->fname,
            'lname' => $applicant->lname,
            'status' => $request->status,
            'app_id' => $applicant->app_id,
            'iffdate' => $request->iffdate,
            'ifftime' => $request->ifftime,
            'meet_link' => $decodedMeetLink,
        ];

        if ($decodedMeetLink) {
            Mail::to('hiring@empireonegroup.com')->send(new ConfirmationInitialVirtual($data));
        } else {
            Mail::to('hiring@empireonegroup.com')->send(new ConfirmationInitialPhysical($data));
        }

        return response()->json([
            'message' => 'Applicant status updated successfully.',
            'app_id' => $applicant->app_id,
        ]);
    }

    public function declined_attendance(Request $request, $app_id)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $applicant = Applicant::where('app_id', $app_id)->first();

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $data = [
            'app_id' => $applicant->app_id,
            'fname' => $applicant->fname,
            'lname' => $applicant->lname,
            'reason' => $request->reason,
        ];

        // Send email notification
        Mail::to('hiring@empireonegroup.com')->send(new DeclinedConfirmation($data));

        return response()->json([
            'message' => 'Applicant decline reason submitted successfully.',
            'app_id' => $applicant->app_id,
        ]);
    }
}
