<x-mail::message>

Dear Employee **{{ $data['employee_id'] }}**,

You have requested to reset your password for the **EmpireOne HRIS Portal**.

Please use the One-Time Password (OTP) below to proceed:

<x-mail::panel>
# {{ $data['otp'] }}
</x-mail::panel>

This OTP is valid for **10 minutes only**. Do not share this code with anyone.

If you did not request a password reset, please ignore this email or contact HR immediately.

Thanks,<br>
**EmpireOne BPO Solutions Inc.**

</x-mail::message>
