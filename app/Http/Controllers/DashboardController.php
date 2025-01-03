<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
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
        } else {
            // If no site, fetch counts for OutSourcingErf across all sites
            $active = OutSourcingErf::whereIn('status', ['Approved', 'Active'])->count();
            $pending = OutSourcingErf::where('status', '=', 'Pending')->count();
            $ongoing = OutSourcingErf::where('status', '=', 'In Review')->count();
            $declined = OutSourcingErf::where('status', '=', 'Declined')->count();

            // Fetch counts for Applicant across all sites
            $app_active = Applicant::whereIn('status', ['Approved', 'Active'])->count();
            $app_pending = Applicant::where('status', '=', 'Pending')->count();
            $app_initial = Applicant::where('status', '=', 'Initial Phase')->count();
            $app_final = Applicant::where('status', '=', 'Final Phase')->count();
            $app_passed = Applicant::where('status', '=', 'Passed')->count();
            $app_failed = Applicant::where('status', '=', 'Failed')->count();
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
        ], 200);
    }
}
