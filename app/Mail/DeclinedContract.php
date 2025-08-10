<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DeclinedContract extends Mailable
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
            ->subject('EmpireOne BPO Solutions Inc - Declined Contract')
            ->markdown('mail.declined_contract.email')
            ->with($this->data);

        // Add the attachment from the URL
        if ($this->filePath) {
            $email->attach($this->filePath, [
                'as' => 'attached-contract.pdf', // Renaming the file to a PDF format
                'mime' => 'application/pdf', // Specify the mime type for PDF
            ]);
        }

        return $email;
    }
}
