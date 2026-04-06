<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpPasswordReset extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->from('hrisempireone@gmail.com', 'No Reply')
            ->subject('EmpireOne HRIS Employee Portal - Password Reset OTP')
            ->markdown('mail.otp_password_reset.email')
            ->with($this->data);
    }
}
