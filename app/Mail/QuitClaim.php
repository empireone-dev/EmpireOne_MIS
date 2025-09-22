<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class QuitClaim extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    public $filePath;

    /**
     * Create a new message instance.
     */
    public function __construct($data, $filePath = null)
    {
        // Ensure data is properly structured with required fields
        $this->data = array_merge([
            'fname' => '',
            'lname' => '',
            'emp_id' => '',
            'email' => ''
        ], $data ?? []);
        
        $this->filePath = $filePath;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $email = $this->from('hrisempireone@gmail.com', 'No Reply')
            ->subject('EmpireOne BPO Solutions Inc - Quit Claim')
            ->view('mail.quit_claim.email')
            ->with('data', $this->data);

        // Attach quit claim PDF from S3 if available
        if (!empty($this->filePath)) {
            try {
                $email->attachFromStorageDisk('s3', $this->filePath, 'quit_claim_document.pdf', [
                    'mime' => 'application/pdf',
                ]);
            } catch (\Exception $e) {
                // Log the error but don't fail the email send
                Log::warning('Failed to attach quit claim document: ' . $e->getMessage());
            }
        }

        return $email;
    }
}
