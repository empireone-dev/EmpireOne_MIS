<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class JobOfferSupport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $data;
    public function __construct($data)
    {
        $this->data = $data;
    }
    // /**
    //  * Get the message envelope.
    //  */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Job Offer',
    //     );
    // }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content(): Content
    // {
    //     return new Content(
    //         markdown: 'mail.jo.job_offer',
    //     );
    // }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    // public function attachments(): array
    // {
    //     return [];
    // }
    public function build()
    {
        try {
            // Generate PDF from the HTML template
            $pdf = Pdf::loadView('mail.jo.pdf_template', ['data' => $this->data]);
            $pdf->setPaper('A4', 'portrait');
            $pdf->setOption('isHtml5ParserEnabled', true);
            $pdf->setOption('isPhpEnabled', true);

            // Generate filename with candidate name and date
            $candidateName = strtoupper($this->data['fname'] . '_' . $this->data['lname']);
            $date = date('Y-m-d');
            $filename = "Job_Offer_Letter_{$candidateName}_{$date}.pdf";

            return $this->from('hrisempireone@gmail.com', 'No Reply')
                ->subject('EmpireOne BPO Solutions Inc - Job Offer')
                ->view('mail.jo_support.email_html')
                ->text('mail.jo_support.email_text')
                ->with($this->data)
                ->attachData($pdf->output(), $filename, [
                    'mime' => 'application/pdf',
                ]);
        } catch (\Exception $e) {
            // Fallback to email without PDF attachment if PDF generation fails
            Log::error('PDF generation failed for job offer: ' . $e->getMessage());

            return $this->from('hrisempireone@gmail.com', 'No Reply')
                ->subject('EmpireOne BPO Solutions Inc - Job Offer')
                ->view('mail.jo_support.email_html')
                ->text('mail.jo_support.email_text')
                ->with($this->data);
        }
    }
}
