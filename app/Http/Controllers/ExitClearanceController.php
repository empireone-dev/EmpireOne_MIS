<?php

namespace App\Http\Controllers;

use App\Mail\ExitClearanceMail;
use App\Mail\ExitClearanceToDepartment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ExitClearanceController extends Controller
{
    public function sendClearanceEmail(Request $request)
    {
        $data = [
            'employee_name' => $request->employee_name,
            'departments' => $request->departments,
            'clearance_date' => $request->clearance_date,
        ];

        // Department email addresses
        $departmentEmails = [
            'Immediate Supervisor' => 'eogs.quickly@gmail.com',
            'Employee Dept. Head' => 'quicklydeguzman@gmail.com',
            'HR/Admin' => 'quicklydeguz@gmail.com',
            'IT (Biometrics, Laptop)' => 'webdev@empireonegroup.com',
        ];

        // Send email to each department
        foreach ($departmentEmails as $department => $email) {
            Mail::to($email)->send(new ExitClearanceToDepartment($data));
        }

        return response()->json(['message' => 'Clearance emails sent successfully']);
    }
}
