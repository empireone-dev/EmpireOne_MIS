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
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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
            Log::info('ApplicantController@index called', [
                'request_params' => $request->all(),
                'user_id' => auth()->id()
            ]);

            $search = $request->get('search', '');
            $status = $request->get('status', '');
            $phone = $request->get('phone', '');
            $email = $request->get('email', '');
            $sourcing = $request->get('sourcing', '');
            $position = $request->get('position', '');

            Log::info('Building applicant query...');
            
            // Start with Applicant model instead of User model
            $applicants = Applicant::with(['final', 'initial', 'joboffer', 'user', 'cvfile', 'guideqs', 'employee'])
                ->where(function ($query) use ($status, $phone, $email, $sourcing, $position) {
                    if ($status) {
                        $query->where('status', $status);
                    }
                    if ($phone) {
                        $query->where('phone', 'like', '%' . $phone . '%');
                    }
                    if ($email) {
                        $query->where('email', 'like', '%' . $email . '%');
                    }
                    if ($sourcing) {
                        $query->where('sourcing', 'like', '%' . $sourcing . '%');
                    }
                    if ($position) {
                        $query->where('position', 'like', '%' . $position . '%');
                    }
                })
                ->when($search, function ($query) use ($search) {
                    // Search in applicant fields and related user fields
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where('fname', 'like', '%' . $search . '%')
                            ->orWhere('lname', 'like', '%' . $search . '%')
                            ->orWhere('mname', 'like', '%' . $search . '%')
                            ->orWhere('suffix', 'like', '%' . $search . '%')
                            ->orWhereHas('user', function ($userQuery) use ($search) {
                                $userQuery->where('employee_fname', 'like', '%' . $search . '%')
                                    ->orWhere('employee_lname', 'like', '%' . $search . '%')
                                    ->orWhere('employee_mname', 'like', '%' . $search . '%')
                                    ->orWhere('employee_suffix', 'like', '%' . $search . '%');
                            });
                    });
                });

            Log::info('Applicant query built successfully');

            $app_id = $request->get('app_id');
            $app_ids = [];
            
            if ($app_id) {
                $app_ids = explode(',', $app_id);
            }

            $perPage = $request->get('per_page', 10);
            $currentPage = $request->get('page', 1);

            if (!empty($app_ids)) {
                $applicants = $applicants->whereIn('app_id', $app_ids);
            }

            Log::info('Executing applicant pagination...');
            
            $result = $applicants->paginate($perPage, ['*'], 'page', $currentPage);

            Log::info('Applicant query executed successfully', [
                'total_records' => $result->total(),
                'current_page' => $result->currentPage(),
                'per_page' => $result->perPage()
            ]);

            return response()->json($result);

        } catch (\Exception $e) {
            Log::error('Error in ApplicantController@index', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'An error occurred while fetching applicant data',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function uploadBase64File($file)
    {
        try {
            list($type, $data) = explode(';', $file);
            list(, $data) = explode(',', $data);

            $decodedFile = base64_decode($data);
            if ($decodedFile === false) {
                return 'none';
            }

            // detect extension
            if (str_contains($type, 'image/')) {
                $extension = 'png'; // or detect from $type (e.g. image/jpeg → jpg)
            } elseif (str_contains($type, 'application/pdf')) {
                $extension = 'pdf';
            } else {
                return 'none'; // unsupported type
            }

            $filename = uniqid() . '.' . $extension;
            $path = 'empireone-financing/' . date("Y") . '/' . $filename;

            Storage::disk('s3')->put($path, $decodedFile);
            return Storage::disk('s3')->url($path);
        } catch (\Exception $e) {
            return 'none';
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
                $url = $this->uploadBase64File($base64);
                $cvFileData[] = [
                    'app_id' => $dateUnique,
                    'file'   => $url,
                    'created' => now(),
                ];
                $uploadedFiles[] = $url;
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
            ['submitted' => now()->format('Y-m-d')]
        )));

        // Helper function to send consistent emails with proper queuing
        $sendNotificationEmail = function ($email) use ($request, $fileUrl) {
            if ($fileUrl) {
                Mail::to($email)->queue(new NewApplication(
                    array_merge(
                        (array) $request->all(),
                        ['submitted' => now()->format('Y-m-d')]
                    ),
                    $fileUrl
                ));
            } else {
                Mail::to($email)->queue(new NewApplication2(
                    array_merge(
                        (array) $request->all(),
                        ['submitted' => now()->format('Y-m-d')]
                    )
                ));
            }
        };

        // Send notification emails to all recipients
        $sendNotificationEmail('schr@empireonegroup.com');
        $sendNotificationEmail('quicklydeguzman@gmail.com');
        $sendNotificationEmail('scitdept2@empireonegroup.com');
        $sendNotificationEmail('webdev@empireonegroup.com');




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
        // $emailRecipient = 'quicklydeguzman@gmail.com';

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
        // $emailRecipient = 'quicklydeguzman@gmail.com';

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
