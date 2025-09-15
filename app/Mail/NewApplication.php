<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NewApplication extends Mailable
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
            ->subject('EmpireOne BPO Solutions Inc - New Applicant Submission Notification')
            ->markdown('mail.new_application.email')
            ->with($this->data);

        if ($this->filePath) {
            // Check if it's an S3 URL or local file path
            if (filter_var($this->filePath, FILTER_VALIDATE_URL)) {
                // For URLs, always use the download approach as it's more reliable
                // across different S3 configurations and buckets
                $this->fallbackToDownload($email, $this->filePath);
            } else {
                // It's a local file path
                try {
                    $email->attach($this->filePath, [
                        'as' => 'cv-file.pdf',
                        'mime' => 'application/pdf',
                    ]);
                } catch (\Exception $e) {
                    Log::error('Failed to attach local file', [
                        'path' => $this->filePath,
                        'error' => $e->getMessage()
                    ]);
                }
            }
        }
        return $email;
    }

    /**
     * Get mime type based on file extension
     */
    private function getMimeType($extension)
    {
        $mimeTypes = [
            'pdf' => 'application/pdf',
            'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'txt' => 'text/plain',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ];

        return $mimeTypes[$extension] ?? 'application/octet-stream';
    }

    /**
     * Fallback method to download file content and attach it
     */
    private function fallbackToDownload($email, $url)
    {
        try {
            // Set a timeout for the download to prevent hanging
            $context = stream_context_create([
                'http' => [
                    'timeout' => 30 // 30 seconds timeout
                ]
            ]);
            
            $fileContent = file_get_contents($url, false, $context);
            if ($fileContent !== false && !empty($fileContent)) {
                $urlParts = parse_url($url);
                $pathParts = pathinfo($urlParts['path']);
                $filename = $pathParts['basename'] ?? 'cv-file.pdf';
                $extension = strtolower($pathParts['extension'] ?? 'pdf');
                $mimeType = $this->getMimeType($extension);
                
                Log::info('Successfully downloaded file content for attachment', [
                    'url' => $url,
                    'filename' => $filename,
                    'size' => strlen($fileContent)
                ]);
                
                $email->attachData($fileContent, $filename, [
                    'mime' => $mimeType,
                ]);
            } else {
                Log::error('Failed to download file content or content is empty', [
                    'url' => $url
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Exception during file download fallback', [
                'url' => $url,
                'error' => $e->getMessage()
            ]);
        }
    }
}
