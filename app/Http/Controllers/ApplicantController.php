<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationInitialPhysical;
use App\Mail\ConfirmationInitialVirtual;
use App\Mail\DeclinedConfirmation;
use App\Mail\GreetingsApplication;
use App\Mail\NewApplication;
use App\Mail\NewApplication2;
use App\Mail\PoolingEmail;
use App\Mail\Rescheduled;
use App\Models\Applicant;
use App\Models\CVFile;
use App\Models\Employee;
use App\Models\FinalRate;
use App\Models\InitialRate;
use App\Models\InterviewConfirmation;
use App\Models\JobOffer;
use App\Models\User;
use App\Models\WorkingExperience;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        try {
            $applicant = Applicant::query()
                ->with(['final', 'initial', 'joboffer', 'user', 'cvfile', 'guideqs', 'employee']);
            
            // Apply filters
            if ($request->site && $request->site !== 'null') {
                $applicant->where('site', '=', $request->site);
            }

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

            if ($request->status && $request->status !== 'null') {
                $applicant->where('status', '=', $request->status);
            }

            // Get users with error handling
            $user = [];
            try {
                $user = User::with('employee')
                    ->whereIn('position', ['CEO', 'Account Manager', 'Director', 'HR Manager', 'I.T Manager', 'Operations Manager'])
                    ->where(function ($query) {
                        $query->where('position', 'CEO')
                            ->orWhereHas('employee', function ($subQuery) {
                                $subQuery->whereIn('status', ['Regular', 'Probationary']);
                            });
                    })
                    ->get();
            } catch (\Exception $e) {
                Log::error('Error fetching users in ApplicantController@index: ' . $e->getMessage());
                // Continue with empty array if user fetch fails
            }

            // Get applicants with pagination
            $applicantsData = $applicant->orderBy('id', 'desc')->paginate(20);

            return response()->json([
                'interviewer' => $user,
                'data' => $applicantsData,
            ], 200);
            
        } catch (\Exception $e) {
            Log::error('Error in ApplicantController@index: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'error' => 'Failed to fetch applicants',
                'message' => 'An error occurred while retrieving applicant data.',
                'interviewer' => [],
                'data' => [
                    'data' => [],
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => 10,
                    'total' => 0,
                    'from' => null,
                    'to' => null
                ]
            ], 500);
        }
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

        $experiences = $request->work_experience ?? [];
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

        // Generate unique application ID more efficiently
        $today = date('Y-m-d');
        $count = Applicant::whereDate('submitted', $today)->count();
        $dateUnique = Carbon::now()->format('mdyHis') . str_pad($count + 1, 3, '0', STR_PAD_LEFT);


        // Update applicant with app_id and status
        $applicant->update([
            'app_id' => $dateUnique,
            'status' => 'Pending',
        ]);

        // Save work experience records efficiently
        if ($experiences && !empty($experiences)) {
            $experienceData = [];
            foreach ($experiences as $experience) {
                $experienceData[] = [
                    'app_id'     => $dateUnique,
                    'company'    => $experience['company'] ?? null,
                    'position'   => $experience['position'] ?? null,
                    'started_at' => $experience['started_at'] ?? null,
                    'end_at'     => $experience['end_at'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            WorkingExperience::insert($experienceData);
        }

        $base64Files = $request->input('files');
        $uploadedFiles = [];
        $cvFileData = [];

        if ($base64Files) {
            foreach ($base64Files as $index => $base64) {
                // Validate base64 format
                if (!preg_match('/^data:(.*?);base64,/', $base64, $matches)) {
                    return response()->json(['error' => 'Invalid base64 file format'], 400);
                }

                $mimeType = $matches[1];
                $extension = explode('/', $mimeType)[1] ?? 'bin';

                // More efficient base64 decoding
                $base64Data = substr($base64, strpos($base64, ',') + 1);
                $fileData = base64_decode($base64Data, true); // strict mode

                if ($fileData === false) {
                    return response()->json(['error' => 'Base64 decode failed'], 400);
                }

                // Use a more efficient filename structure
                $filename = date('Y') . '/' . $dateUnique . '_' . $index . '.' . $extension;

                // Upload to S3 with streaming for better memory usage
                $disk = Storage::disk('s3');
                $disk->put($filename, $fileData, [
                    'ContentType' => $mimeType,
                    'CacheControl' => 'max-age=31536000'
                ]);

                // Generate the S3 URL manually
                $url = "https://" . env('AWS_BUCKET') . ".s3." . env('AWS_DEFAULT_REGION') . ".amazonaws.com/" . $filename;
                $uploadedFiles[] = $url;

                // Prepare file record for bulk insert
                $cvFileData[] = [
                    'app_id' => $dateUnique,
                    'file'   => $url,
                    'created' => now(),
                ];
            }

            // Bulk insert CVFile records
            if (!empty($cvFileData)) {
                CVFile::insert($cvFileData);
            }
        }

        $fileUrl = $uploadedFiles[0] ?? null;

        // Determine email recipient based on site
        $emailRecipient = ($request->site === 'Carcar') ? 'career@empireonegroup.com' : 'hiring@empireonegroup.com';

        // $emailRecipient = 'quicklydeguzman@gmail.com';

        // Queue emails to improve performance
        if ($fileUrl) {
            Mail::to($emailRecipient)->queue(new NewApplication(
                array_merge(
                    (array) $request->all(),
                    ['submitted' => now()->format('Y-m-d')]
                ),
                $fileUrl
            ));
        } else {
            Mail::to($emailRecipient)->queue(new NewApplication2(
                array_merge(
                    (array) $request->all(),
                    ['submitted' => now()->format('Y-m-d')]
                )
            ));
        }

        // Send greeting email to applicant (also queued)
        Mail::to($request->email)->queue(new GreetingsApplication(array_merge(
            $request->all(),
            // ['id' => $jo->id],
        )));

        // Mail::to('$emailRecipient')->send(new NewApplication(
        //     array_merge(
        //         (array) $request->all(),
        //         ['submitted' => now()->format('Y-m-d')]
        //     ),
        //     $fileUrl
        // ));

        // Mail::to('$emailRecipient')->send(new NewApplication(
        //     array_merge(
        //         (array) $request->all(),
        //         ['submitted' => now()->format('Y-m-d')]
        //     ),
        //     $fileUrl
        // ));


        // Mail::to('$emailRecipient')->send(new NewApplication(
        //     array_merge(
        //         (array) $request->all(),
        //         ['submitted' => now()->format('Y-m-d')]
        //     ),
        //     $fileUrl
        // ));

        // Mail::to('$emailRecipient')->send(new NewApplication(
        //     array_merge(
        //         (array) $request->all(),
        //         ['submitted' => now()->format('Y-m-d')]
        //     ),
        //     $fileUrl
        // ));

        Mail::to('schr@empireonegroup.com')->send(new NewApplication(
            array_merge(
                (array) $request->all(),
                ['submitted' => now()->format('Y-m-d')]
            ),
            $fileUrl
        ));

        Mail::to('quicklydeguzman@gmail.com')->send(new NewApplication(
            array_merge(
                (array) $request->all(),
                ['submitted' => now()->format('Y-m-d')]
            ),
            $fileUrl
        ));

        Mail::to('scitdept2@empireonegroup.com')->send(new NewApplication(
            array_merge(
                (array) $request->all(),
                ['submitted' => now()->format('Y-m-d')]
            ),
            $fileUrl
        ));

        Mail::to('webdev@empireonegroup.com')->send(new NewApplication(
            array_merge(
                (array) $request->all(),
                ['submitted' => now()->format('Y-m-d')]
            ),
            $fileUrl
        ));




        return response()->json([
            'count'  => $count,
            'date'   => $today,
            'status' => 200,
            'data'   => 'success',
        ], 200);
    }


    public function show($app_id)
    {
        $applicant = Applicant::where('app_id', $app_id)->with(['final', 'initial', 'joboffer', 'requirements', 'guideqs', 'employee'])->first();
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

        $jobOffer = JobOffer::where('app_id', '=', $request->app_id)->where('status', '=', "Hired")->first();

        if ($jobOffer) {
            $jobOffer->update([
                'jobPos' => $request->position,
                'department' => $request->dept,
                'account' => $request->account,
            ]);
        }

        $user = User::where('employee_id', '=', $request->employee_id)->first();

        if ($user) {
            $userData = $request->except(['id']);
            // Update specific user fields to match applicant data
            $userData['employee_id'] = $request->emp_id;
            $userData['employee_fname'] = $request->fname;
            $userData['employee_mname'] = $request->mname;
            $userData['employee_lname'] = $request->lname;
            $userData['employee_suffix'] = $request->suffix;
            $user->update($userData);
        }

        return response()->json([
            'message' => 'Applicant updated successfully.',
            'data' => $applicant
        ], 200);
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

        $emailRecipient = ($request->site === 'Carcar') ? 'career@empireonegroup.com' : 'hiring@empireonegroup.com';

        if ($decodedMeetLink) {
            Mail::to($emailRecipient)->send(new ConfirmationInitialVirtual($data));
        } else {
            Mail::to($emailRecipient)->send(new ConfirmationInitialPhysical($data));
        }

        InterviewConfirmation::create([
            'app_id' => $applicant->app_id,
            'initial' => "confirmed",
        ]);


        return response()->json([
            'message' => 'Applicant status updated successfully.',
            'app_id' => $applicant->app_id,
        ]);
    }

    public function declined_attendance(Request $request, $app_id)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
            'reschedule' => 'nullable|string',
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

        $emailRecipient = ($request->site === 'Carcar') ? 'career@empireonegroup.com' : 'hiring@empireonegroup.com';

        if (strtolower($request->reschedule) === "yes") {
            Mail::to($emailRecipient)->send(new Rescheduled($data));
        } else {
            $applicant->status = 'Declined';
            $applicant->save();

            Mail::to($emailRecipient)->send(new DeclinedConfirmation($data));
        }

        InterviewConfirmation::create([
            'app_id' => $applicant->app_id,
            'initial' => "declined",
        ]);


        return response()->json([
            'message' => 'Applicant response submitted successfully.',
            'app_id' => $applicant->app_id,
        ]);
    }

    public function proceed_initial_immediate(Request $request, $id)
    {
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update([
            'status' => "Initial Phase",
        ]);

        InitialRate::create([
            'app_id' => $request->app_id,
            // 'interdate' => $request->iffdate,
            // 'intertime' => $request->ifftime,
        ]);

        return response()->json([
            'data' => 'success'
        ], 200);
    }

    public function proceed_final_immediate(Request $request, $id)
    {
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update([
            'status' => "Final Phase",
        ]);

        FinalRate::create([
            'app_id' => $request->app_id,
            // 'interdate' => $request->iffdate,
            // 'intertime' => $request->ifftime,
        ]);

        return response()->json([
            'data' => 'success'
        ], 200);
    }

    public function proceed_final_phase(Request $request, $id)
    {
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update([
            'status' => "For Final Phase",
        ]);

        // Check if InitialRate record already exists for this app_id
        $existingInitialRate = InitialRate::where('app_id', $request->app_id)->first();

        if (!$existingInitialRate) {
            InitialRate::create([
                'app_id' => $request->app_id,
                // 'interdate' => $request->iffdate,
                // 'intertime' => $request->ifftime,
            ]);
        }

        return response()->json([
            'data' => 'success'
        ], 200);
    }

    public function phone_call_status(Request $request, $id)
    {
        $applicant = Applicant::find($id);

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        $applicant->update([
            'call_status' => $request->status,
        ]);

        return response()->json([
            'data' => 'success'
        ], 200);
    }

    public function destroy($id)
    {
        $applicant = Applicant::where('id', $id)->first();
        $applicant->delete();
        return response()->json([
            'result' => $applicant
        ], 200);
    }
}
