<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InterviewerFinalV extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $data;
    public $interviewer;
    
    public function __construct($data, $interviewer)
    {
        $this->data = $data;
        $this->interviewer = $interviewer;
    }
    /**
     * Get the message envelope.
     */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Finalv Email',
    //     );
    // }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content(): Content
    // {
    //     return new Content(
    //         view: 'view.name',
    //     );
    // }

    // /**
    //  * Get the attachments for the message.
    //  *
    //  * @return array<int, \Illuminate\Mail\Mailables\Attachment>
    //  */
    // public function attachments(): array
    // {
    //     return [];
    // }
    public function build()
    {
        return $this->from('hrisempireone@gmail.com', 'No Reply')
            ->subject('Final Interview Schedule - EmpireOne BPO Solutions Inc')
            ->markdown('mail.interviewer_finalv.email')
            ->with([
                'data' => $this->data,
                'interviewer' => $this->interviewer
            ]);
    }
}
