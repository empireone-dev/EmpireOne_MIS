<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\OtpPasswordReset;
use App\Models\PasswordOtp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;

class ForgotPasswordOtpController extends Controller
{
    /**
     * Send a 6-digit OTP to the email linked to the given employee_id.
     */
    public function sendOtp(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
        ]);

        $user = User::where('employee_id', $request->employee_id)->first();

        if (!$user) {
            return response()->json([
                'field' => 'employee_id',
                'message' => 'No account found with this Employee ID.',
            ], 422);
        }

        // Traverse User → Employee → Applicant to get the email
        $email = optional($user->employee)->eogs;

        if (!$email) {
            return response()->json([
                'field' => 'employee_id',
                'message' => 'No email address is linked to this account. Please contact HR.',
            ], 422);
        }

        // Remove any previous unused OTPs for this employee
        PasswordOtp::where('employee_id', $request->employee_id)->delete();

        // Generate a 6-digit OTP and hash it for safe storage
        $plainOtp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $hashedOtp = hash('sha256', $plainOtp);

        PasswordOtp::create([
            'employee_id' => $request->employee_id,
            'otp'         => $hashedOtp,
            'expires_at'  => now()->addMinutes(10),
            'used'        => false,
        ]);

        Mail::to($email)->send(new OtpPasswordReset([
            'employee_id' => $request->employee_id,
            'otp'         => $plainOtp,
        ]));

        return response()->json([
            'message'    => 'OTP sent.',
            'email_hint' => $this->maskEmail($email),
        ]);
    }

    /**
     * Verify the OTP and reset the password in one step.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'employee_id'           => 'required|string',
            'otp'                   => 'required|string|size:6',
            'password'              => ['required', 'confirmed', Password::min(8)],
            'password_confirmation' => 'required|string',
        ]);

        $otpRecord = PasswordOtp::where('employee_id', $request->employee_id)
            ->where('otp', hash('sha256', $request->otp))
            ->where('used', false)
            ->first();

        if (!$otpRecord) {
            return response()->json([
                'field'   => 'otp',
                'message' => 'Invalid OTP. Please check the code and try again.',
            ], 422);
        }

        if ($otpRecord->isExpired()) {
            $otpRecord->delete();
            return response()->json([
                'field'   => 'otp',
                'message' => 'Your OTP has expired. Please request a new one.',
            ], 422);
        }

        $user = User::where('employee_id', $request->employee_id)->first();

        if (!$user) {
            return response()->json([
                'field'   => 'employee_id',
                'message' => 'Account not found.',
            ], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        $otpRecord->delete();

        return response()->json([
            'message' => 'Password reset successfully. You can now log in.',
        ]);
    }

    private function maskEmail(string $email): string
    {
        [$local, $domain] = explode('@', $email, 2);
        $visible    = max(2, (int) ceil(strlen($local) / 3));
        $maskedLocal = substr($local, 0, $visible) . str_repeat('*', max(strlen($local) - $visible, 0));
        return $maskedLocal . '@' . $domain;
    }
}
