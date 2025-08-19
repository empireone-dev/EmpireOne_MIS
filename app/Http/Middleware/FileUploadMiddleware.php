<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class FileUploadMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Log detailed request information for file uploads
        if ($request->hasFile('file') || $request->has('file')) {
            Log::info('File upload middleware triggered', [
                'url' => $request->url(),
                'method' => $request->method(),
                'content_type' => $request->header('Content-Type'),
                'content_length' => $request->header('Content-Length'),
                'has_file' => $request->hasFile('file'),
                'all_files' => array_keys($request->allFiles()),
                'file_sizes' => $this->getFileSizes($request),
                'php_settings' => [
                    'upload_max_filesize' => ini_get('upload_max_filesize'),
                    'post_max_size' => ini_get('post_max_size'),
                    'max_file_uploads' => ini_get('max_file_uploads'),
                    'file_uploads' => ini_get('file_uploads') ? 'enabled' : 'disabled',
                ]
            ]);
        }

        // Check if the request size exceeds PHP limits
        $maxPostSize = $this->convertToBytes(ini_get('post_max_size'));
        $contentLength = $request->header('Content-Length');
        
        if ($contentLength && $contentLength > $maxPostSize) {
            Log::error('Request size exceeds post_max_size', [
                'content_length' => $contentLength,
                'post_max_size' => $maxPostSize,
                'post_max_size_ini' => ini_get('post_max_size')
            ]);
            
            return response()->json([
                'error' => 'File size exceeds server limit',
                'max_size' => ini_get('post_max_size')
            ], 413);
        }

        return $next($request);
    }

    private function getFileSizes(Request $request): array
    {
        $sizes = [];
        foreach ($request->allFiles() as $key => $file) {
            if (is_array($file)) {
                foreach ($file as $index => $f) {
                    $sizes["{$key}[{$index}]"] = $f->getSize();
                }
            } else {
                $sizes[$key] = $file->getSize();
            }
        }
        return $sizes;
    }

    private function convertToBytes(string $value): int
    {
        $value = trim($value);
        $last = strtolower($value[strlen($value) - 1]);
        $number = (int) $value;

        switch ($last) {
            case 'g':
                $number *= 1024;
            case 'm':
                $number *= 1024;
            case 'k':
                $number *= 1024;
        }

        return $number;
    }
}
