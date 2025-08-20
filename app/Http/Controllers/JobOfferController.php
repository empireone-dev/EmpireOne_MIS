<?php

namespace App\Http\Controllers;

use App\Mail\DeclinedOffer;
use App\Mail\JobOffer as MailJobOffer;
use App\Mail\PreEmploymentEmail;
use App\Models\Applicant;
use App\Models\JobOffer;
use Illuminate\Http\Request;
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

        Mail::to($emailRecipient)->send(new DeclinedOffer(array_merge(
            $request->all(),
            ['id' => $jo->id],
        )));

        if ($request->status == 'Accepted') {
            Applicant::where('app_id', $id)->update([
                'status' => 'Accepted Offer'
            ]);
            Mail::to($request->email)->send(new PreEmploymentEmail(array_merge(
                $request->all(),
                ['id' => $jo->id],
            )));
        }
        return response()->json([
            'data' => 'success'
        ], 200);
    }
}
