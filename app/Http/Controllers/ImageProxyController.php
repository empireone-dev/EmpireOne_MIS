<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Response;

class ImageProxyController extends Controller
{
    /**
     * Proxy images from S3 to avoid CORS issues
     */
    public function proxyImage(Request $request)
    {
        $imageUrl = $request->query('url');
        
        if (!$imageUrl) {
            return response()->json(['error' => 'URL parameter is required'], 400);
        }

        // Validate that the URL is from your S3 bucket
        if (!str_contains($imageUrl, 's3.amazonaws.com/empireone-ticketing-system')) {
            return response()->json(['error' => 'Invalid image source'], 403);
        }

        try {
            $response = Http::timeout(30)->get($imageUrl);
            
            if ($response->successful()) {
                $contentType = $response->header('Content-Type') ?? 'image/png';
                
                return response($response->body())
                    ->header('Content-Type', $contentType)
                    ->header('Access-Control-Allow-Origin', '*')
                    ->header('Access-Control-Allow-Methods', 'GET')
                    ->header('Access-Control-Allow-Headers', 'Content-Type');
            }
            
            return response()->json(['error' => 'Failed to fetch image'], $response->status());
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Image fetch failed: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Convert image to base64
     */
    public function imageToBase64(Request $request)
    {
        $imageUrl = $request->query('url');
        
        if (!$imageUrl) {
            return response()->json(['error' => 'URL parameter is required'], 400);
        }

        // Validate that the URL is from your S3 bucket
        if (!str_contains($imageUrl, 's3.amazonaws.com/empireone-ticketing-system')) {
            return response()->json(['error' => 'Invalid image source'], 403);
        }

        try {
            $response = Http::timeout(30)->get($imageUrl);
            
            if ($response->successful()) {
                $contentType = $response->header('Content-Type') ?? 'image/png';
                $base64 = base64_encode($response->body());
                $dataUrl = "data:{$contentType};base64,{$base64}";
                
                return response()->json(['base64' => $dataUrl]);
            }
            
            return response()->json(['error' => 'Failed to fetch image'], $response->status());
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Image fetch failed: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Download file from S3 through proxy
     */
    public function downloadFile(Request $request)
    {
        $fileUrl = $request->query('url');
        $filename = $request->query('filename', 'download');
        
        if (!$fileUrl) {
            return response()->json(['error' => 'URL parameter is required'], 400);
        }

        // Validate that the URL is from your S3 bucket
        if (!str_contains($fileUrl, 's3.amazonaws.com/empireone-ticketing-system')) {
            return response()->json(['error' => 'Invalid file source'], 403);
        }

        try {
            $response = Http::timeout(60)->get($fileUrl);
            
            if ($response->successful()) {
                $contentType = $response->header('Content-Type') ?? 'application/octet-stream';
                
                // Extract file extension from URL or content type
                $extension = '';
                if (preg_match('/\.([a-zA-Z0-9]+)$/', $fileUrl, $matches)) {
                    $extension = $matches[1];
                } elseif (str_contains($contentType, 'image/')) {
                    $extension = str_replace('image/', '', $contentType);
                }
                
                // Set filename with extension
                $downloadFilename = $filename . ($extension ? '.' . $extension : '');
                
                return response($response->body())
                    ->header('Content-Type', $contentType)
                    ->header('Content-Disposition', 'attachment; filename="' . $downloadFilename . '"')
                    ->header('Access-Control-Allow-Origin', '*')
                    ->header('Access-Control-Allow-Methods', 'GET')
                    ->header('Access-Control-Allow-Headers', 'Content-Type');
            }
            
            return response()->json(['error' => 'Failed to fetch file'], $response->status());
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'File download failed: ' . $e->getMessage()], 500);
        }
    }
}
