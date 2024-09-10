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

        // $active = Applicant::whereIn('status', ['Approved', 'Active'])->count();
        // $pending = Applicant::where('status', '=', 'Pending')->count();
        // $ongoing = Applicant::where('status', '=', 'In Review')->count();
        // $declined = Applicant::where('status', '=', 'Declined')->count();
    
        return response()->json([
            'active' => $active,
            'pending' => $pending,
            'ongoing' => $ongoing,
            'declined' => $declined

        ], 200);
    }
}
