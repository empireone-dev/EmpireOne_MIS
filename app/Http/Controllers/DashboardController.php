<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Employee;
use App\Models\JobOffer;
use App\Models\OnboardingDoc;
use App\Models\OutSourcingErf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // Get the current authenticated user
        $user = Auth::user();

        // Get the site assigned to the user
        $site = $user->site;

        // Check if the site is not null and not an empty string
        if ($site !== null && $site !== '') {
            // If site is not null or empty, fetch counts for OutSourcingErf based on site
            $active = OutSourcingErf::whereIn('status', ['Approved', 'Active'])
                ->where('site', $site)
                ->count();
            $pending = OutSourcingErf::where('status', '=', 'Pending')
                ->where('site', $site)
                ->count();
            $ongoing = OutSourcingErf::where('status', '=', 'In Review')
                ->where('site', $site)
                ->count();
            $declined = OutSourcingErf::where('status', '=', 'Declined')
                ->where('site', $site)
                ->count();

            // Fetch counts for Applicant based on site
            $app_active = Applicant::whereIn('status', ['Approved', 'Active'])
                ->where('site', $site)
                ->count();
            $app_pending = Applicant::where('status', '=', 'Pending')
                ->where('site', $site)
                ->count();
            $app_initial = Applicant::where('status', '=', 'Initial Phase')
                ->where('site', $site)
                ->count();
            $app_final = Applicant::where('status', '=', 'Final Phase')
                ->where('site', $site)
                ->count();
            $app_passed = Applicant::where('status', '=', 'Passed')
                ->where('site', $site)
                ->count();
            $app_failed = Applicant::where('status', '=', 'Failed')
                ->where('site', $site)
                ->count();

            $pending_jo = JobOffer::where('status', 'Pending')
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
            $declined_jo = JobOffer::where('status', 'Declined')
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
            $accepted_jo = JobOffer::where('status', 'Accepted')
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
            $contract_signing = JobOffer::where('status', 'Contract Signing')
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
            $onboarded_app = JobOffer::where('status', 'Hired')
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();

            $onboarding_docs = OnboardingDoc::where('site', $site)
                ->count();

            $total_employee = Employee::whereHas('applicant', function ($query) use ($site) {
                $query->where('site', $site);
            })
                ->count();
            $resigned = Employee::where('status', 'Resigned')
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
            $eope = Employee::where('status', ['EOPE', 'End of Contract'])
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
            $dismissed = Employee::where('status', ['Dismissed', 'Terminated'])
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
            $awol = Employee::where('status', 'AWOL')
                ->whereHas('applicant', function ($query) use ($site) {
                    $query->where('site', $site);
                })
                ->count();
        } else {

            $active = OutSourcingErf::whereIn('status', ['Approved', 'Active'])->count();
            $pending = OutSourcingErf::where('status', '=', 'Pending')->count();
            $ongoing = OutSourcingErf::where('status', '=', 'In Review')->count();
            $declined = OutSourcingErf::where('status', '=', 'Declined')->count();


            $app_active = Applicant::whereIn('status', ['Approved', 'Active'])->count();
            $app_pending = Applicant::where('status', '=', 'Pending')->count();
            $app_initial = Applicant::where('status', '=', 'Initial Phase')->count();
            $app_final = Applicant::where('status', '=', 'Final Phase')->count();
            $app_passed = Applicant::where('status', '=', 'Passed')->count();
            $app_failed = Applicant::where('status', '=', 'Failed')->count();


            $pending_jo = JobOffer::where('status', '=', 'Pending')->count();
            $declined_jo = JobOffer::where('status', '=', 'Declined')->count();
            $accepted_jo = JobOffer::where('status', '=', 'Accepted')->count();
            $contract_signing = JobOffer::where('status', '=', 'Contract Signing')->count();
            $onboarded_app = JobOffer::where('status', '=', 'Hired')->count();

            $onboarding_docs = OnboardingDoc::count();
            $total_employee = Employee::count();
            $resigned = Employee::where('status', '=', 'Resigned')->count();
            $eope = Employee::whereIn('status', ['EOPE', 'End of Contract'])->count();
            $dismissed = Employee::whereIn('status', ['Dismissed', 'Terminated'])->count();
            $awol = Employee::where('status', '=', 'AWOL')->count();
        }

        return response()->json([
            'active' => $active,
            'pending' => $pending,
            'ongoing' => $ongoing,
            'declined' => $declined,
            'app_initial' => $app_initial,
            'app_final' => $app_final,
            'app_active' => $app_active,
            'app_pending' => $app_pending,
            'app_failed' => $app_failed,
            'app_passed' => $app_passed,
            'pending_jo' => $pending_jo,
            'declined_jo' => $declined_jo,
            'accepted_jo' => $accepted_jo,
            'contract_signing' => $contract_signing,
            'onboarding_docs' => $onboarding_docs,
            'onboarded_app' => $onboarded_app,
            'total_employee' => $total_employee,
            'resigned' => $resigned,
            'eope' => $eope,
            'dismissed' => $dismissed,
            'awol' => $awol,
        ], 200);
    }
}
