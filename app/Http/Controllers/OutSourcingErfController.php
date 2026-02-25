<?php

namespace App\Http\Controllers;

use App\Mail\DeclinedErf;
use App\Mail\ReviewErf;
use App\Models\ERFJa;
use App\Models\ERFJd;
use App\Models\JobPosition;
use App\Models\OutSourcingErf;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class OutSourcingErfController extends Controller
{
    public function outsourcing_erf_by_id($ref_id)
    {
        $res = OutSourcingErf::where('ref_id', $ref_id)
            ->with(['ja', 'jd', 'user.employee.applicant'])
            ->first();

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
        $erfrec = OutSourcingErf::with(['user.employee.applicant'])->orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $erfrec
        ], 200);
    }
    public function store(Request $request)
    {

        $erf = OutSourcingErf::create([
            'user_id' => $request->user_id,
            'ref_id' => $request->ref_id,
            'submitted' => $request->submitted,
            'budgetCost' => $request->budgetCost,
            'dateNeed' => $request->dateNeed,
            'department' => $request->department,
            'account' => $request->account,
            'jobTitle' => $request->jobTitle,
            'jobType' => $request->jobType,
            'justification' => $request->justification,
            'personnel' => $request->personnel,
            'positionStatus' => $request->positionStatus,
            'sourcingMethod' => $request->sourcingMethod,
            'site' => $request->site,
            'status' => 'Pending',
        ]);

        // Get reviewer user details
        $reviewer = User::find($request->reviewer);
        if ($reviewer) {
            // Prepare email data for the ERF review request
            $emailData = [
                'approver_name' => $reviewer->employee_fname . ' ' . $reviewer->employee_lname,
                'position' => $request->jobTitle,
                'department' => $request->department,
                'employment_type' => $request->jobType,
                'headcount' => $request->personnel,
                'justification' => $request->justification,
                'requested_by' => $request->requestor_name,
                'ref_id' => $request->ref_id,
                'reviewer_id' => $request->reviewer,
            ];

            $reviewerEmail = $reviewer->email ?? $reviewer->employee->eogs ?? $reviewer->employee->applicant->email ?? null;
            Mail::to($reviewerEmail)->send(new ReviewErf($emailData));
        }

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
        $erfrec = OutSourcingErf::with(['user.employee.applicant'])->find($id);
        $erfrec->update([
            'status' => $request->status,
        ]);

        if ($request->status == 'Approved') {
            // Create a new Job Position only for final approval
            JobPosition::create([
                'ref_id' => $request->ref_id,
                'salary' => $request->budgetCost,
                'jPosition' => $request->jobTitle,
                'status' => 'Approved',
                'site' => $request->site,
            ]);
        }

        // Note: For "Approved by Site Head" status, we don't create JobPosition yet
        // This will be created when final approval is given

        if ($request->status == 'Declined') {
            $erfrec->update([
                'reason' => $request->reason,
            ]);

            // Send email notification with proper data structure
            try {
                $emailData = [
                    'fname' => $erfrec->user->employee->applicant->fname ?? '',
                    'lname' => $erfrec->user->employee->applicant->lname ?? '',
                    'jobPos' => $erfrec->jobTitle,
                    'reason' => $request->reason,
                    'ref_id' => $erfrec->ref_id,
                ];

                // Get email from multiple possible sources
                $recipientEmail = $request->requestor_email ??
                    $erfrec->user->employee->eogs ??
                    $erfrec->user->employee->applicant->email ??
                    null;

                if ($recipientEmail) {
                    Mail::to($recipientEmail)->send(new DeclinedErf($emailData));
                    Log::info("ERF decline email sent successfully to: " . $recipientEmail . " for ref_id: " . $erfrec->ref_id);
                } else {
                    Log::error("No email found for ERF decline notification. User ID: " . $erfrec->user_id . ", Ref ID: " . $erfrec->ref_id);
                }
            } catch (\Exception $e) {
                Log::error("Failed to send ERF decline email: " . $e->getMessage() . " for ref_id: " . $erfrec->ref_id);
                // Don't fail the request if email fails
            }
        }

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}
