<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DeclinedErf extends Mailable
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
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: 'hrisempireone@gmail.com',
            subject: 'EmpireOne BPO Solutions Inc - Declined ERF Request',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.declined_erf.email',
            with: ['data' => $this->data],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    /**
     * Build the message (legacy method for compatibility).
     */
    public function build()
    {
        $email = $this->from('hrisempireone@gmail.com', 'No Reply')
            ->subject('EmpireOne BPO Solutions Inc - Declined ERF Request')
            ->view('mail.declined_erf.email')
            ->with(['data' => $this->data]);

        return $email;
    }
}
