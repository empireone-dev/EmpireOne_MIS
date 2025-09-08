<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LastPay extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The data passed to the mailable.
     */
    public $data;

    /**
     * The file path of the attachment.
     */
    public $filePath;

    /**
     * Create a new message instance.
     */
    public function __construct($data, $filePath = null)
    {
        $this->data = $data;
        $this->filePath = $filePath;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $email =  $this->from('hrisempireone@gmail.com', 'No Reply')
            ->subject('EmpireOne BPO Solutions Inc - Proof of Last Pay')
            ->markdown('mail.last_pay.email')
            ->with($this->data);

        // Attach the file if it exists
        if ($this->filePath) {
            $email->attach($this->filePath, [
                'as' => 'last_pay_document.pdf',
                'mime' => 'application/pdf',
            ]);
        }

        return $email;
    }
}
