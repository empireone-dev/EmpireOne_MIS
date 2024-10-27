<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\OutSourcingErf;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
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
