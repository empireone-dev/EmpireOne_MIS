<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class OffboardingChecklist extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The data passed to the mailable.
     */
    public $data;

    /**
     * The file paths of the attachments.
     */
    public $filePath;
    public $filePath2;
    public $filePath3;

    /**
     * Create a new message instance.
     */
    public function __construct($data, $filePath = null, $filePath2 = null, $filePath3 = null)
    {
        $this->data = $data;
        $this->filePath = $filePath;
        $this->filePath2 = $filePath2;
        $this->filePath3 = $filePath3;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $email =  $this->from('hrisempireone@gmail.com', 'No Reply')
            ->subject('EmpireOne BPO Solutions Inc - Offboarding Checklist')
            ->markdown('mail.offboarding_checklist.email')
            ->with($this->data);

        // Attach the files from S3 storage if they exist
        if ($this->filePath) {
            try {
                $email->attachFromStorageDisk('s3', $this->filePath, 'last_pay.pdf', [
                    'mime' => 'application/pdf',
                ]);
            } catch (\Exception $e) {
                // Log the error but don't fail the email send
                Log::warning('Failed to attach last pay document: ' . $e->getMessage());
            }
        }

        if ($this->filePath2) {
            try {
                $email->attachFromStorageDisk('s3', $this->filePath2, '2316_form.pdf', [
                    'mime' => 'application/pdf',
                ]);
            } catch (\Exception $e) {
                // Log the error but don't fail the email send
                Log::warning('Failed to attach 2316 form document: ' . $e->getMessage());
            }
        }

        if ($this->filePath3) {
            try {
                $email->attachFromStorageDisk('s3', $this->filePath3, 'certificate_of_employment.pdf', [
                    'mime' => 'application/pdf',
                ]);
            } catch (\Exception $e) {
                // Log the error but don't fail the email send
                Log::warning('Failed to attach COE document: ' . $e->getMessage());
            }
        }

        return $email;
    }
}
