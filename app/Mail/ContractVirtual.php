<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContractVirtual extends Mailable
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
        $email = $this->from('hrisempireone@gmail.com', 'No Reply')
            ->subject('Virtual Contract Signing - EmpireOne BPO Solutions Inc')
            ->markdown('mail.contract_sign_v.email')
            ->with($this->data);

        // Add the attachment from the URL
        if ($this->filePath) {
            $email->attach($this->filePath, [
                'as' => 'contract-signature.jpg', // You can rename the file if needed
                'mime' => 'image/jpeg', // Specify the mime type of the file
            ]);
        }

        return $email;
    }
}
