<?php

namespace App\Http\Controllers;

use App\Mail\AcceptedOffer;
use App\Mail\DeclinedOffer;
use App\Mail\JobOffer as MailJobOffer;
use App\Mail\PreEmploymentEmail;
use App\Models\Applicant;
use App\Models\Employee;
use App\Models\JobOffer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class JobOfferController extends Controller
{
    public function index(Request $request)
    {
        $jobofferQuery = JobOffer::with('applicant', 'onboarding_app')->orderBy('id', 'desc');

        if ($request->search) {
            $jobofferQuery->where('status', $request->search);
        }

        if ($request->status && $request->status !== 'null') {
            $jobofferQuery->where('status', '=', $request->status);
        }

        if ($request->site && $request->site !== 'null') {
            $jobofferQuery->whereHas('applicant', function ($query) use ($request) {
                $query->where('site', '=', $request->site);
            });
        }

        if ($request->searching) {
            $jobofferQuery->where(function ($subQuery) use ($request) {
                // Search by applicant ID
                $subQuery->where('app_id', 'LIKE', '%' . $request->searching . '%')
                    ->orWhereHas('applicant', function ($query) use ($request) {
                        // Search by last name, first name, or middle name in the applicant relation
                        $query->where('lname', 'LIKE', '%' . $request->searching . '%')
                            ->orWhere('fname', 'LIKE', '%' . $request->searching . '%')
                            ->orWhere('mname', 'LIKE', '%' . $request->searching . '%')
                            ->orWhere('site', 'LIKE', '%' . $request->searching . '%');
                    });
            });
        }

        $joboffer = $jobofferQuery->paginate(10);

        return response()->json([
            'data' => $joboffer
        ], 200);
    }


    public function store(Request $request)
    {
        $data = $request->all();
        $jo = JobOffer::create(array_merge($data, [
            'department' => $request->outsourcing_erf['department']
        ]));
        Mail::to($request->email)->send(new MailJobOffer(array_merge(
            $request->all(),
            ['id' => $jo->id]
        )));

        return response()->json([
            $jo,
            'data' => 'success'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $jo = JobOffer::where('id', '=',  $request->id)->first();
        $jo->update([
            'status' => $request->status,
            'reas' => $request->reas
        ]);
        Applicant::where('app_id', $request->app_id)->update([
            'status' => 'Counter Offer'
        ]);

        $emailRecipient = ($request->site === 'Carcar') ? 'career@empireonegroup.com' : 'hiring@empireonegroup.com';

        // $emailRecipient = 'quicklydeguzman@gmail.com';

        if ($request->status == 'Accepted') {
            Applicant::where('app_id', $id)->update([
                'status' => 'Accepted Offer'
            ]);
            Mail::to($request->email)->send(new PreEmploymentEmail(array_merge(
                $request->all(),
                ['id' => $jo->id],
            )));
            Mail::to("$emailRecipient")->send(new AcceptedOffer(array_merge(
                $request->all(),
                ['id' => $jo->id],
            )));
        } elseif ($request->status == 'Declined') {
            Mail::to($emailRecipient)->send(new DeclinedOffer(array_merge(
                $request->all(),
                ['id' => $jo->id],
            )));
        }
        return response()->json([
            'data' => 'success'
        ], 200);
    }

    public function proceed_direct_hire(Request $request, $id)
    {

        $today = date('Y-m-d');
        $count = Employee::whereDate('created', $today)->count() + 1;
        $countNumber = str_pad($count, 2, '0', STR_PAD_LEFT);
        $dateUnique = date('ymd') . $countNumber;

        $applicant = Applicant::where('app_id', '=',  $request->app_id)->first();
        $job_offer = JobOffer::where([
            ['app_id', '=', $request->app_id],
            ['status', '=', 'Contract Signing'],
        ])->first();

        if (!$applicant) {
            return response()->json([
                'message' => 'Applicant not found.',
            ], 404);
        }

        if (!$job_offer) {
            return response()->json([
                'message' => 'Job offer not found.',
            ], 404);
        }

        $job_offer->update([
            'status' => "Hired",
        ]);

        Employee::create([
            'app_id' => $request->app_id,
            'emp_id' => $dateUnique,
            'position' => $request->jobPos,
            'dept' => $jo->department ?? null,
            'account' => $jo->account ?? null,
            'sup_id' => null,
            'hired' => date('Y-m-d'),
            'eogs' => $applicant->email ?? '',
            'status' => 'Probationary',
        ]);

        User::create([
            'role_id' => '7',
            'employee_id' => $dateUnique,
            'employee_fname' => $applicant->fname,
            'employee_mname' => $applicant->mname ?? '',
            'employee_lname' => $applicant->lname ?? '',
            'employee_suffix' => $applicant->suffix ?? '',
            'email' => $applicant->email ?? null,
            'department' => $jo->department ?? null,
            'account' => $jo->account ?? null,
            'sup_id' => null,
            'position' => $request->jobPos,
            'site' => $applicant->site ?? '',
            'gender' => $applicant->gender ?? '',
            'password' => Hash::make('Business12'),
        ]);

        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
