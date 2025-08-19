<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

// Test S3 connectivity
Route::get('/test-s3', function () {
    try {
        // Test S3 connection by trying to put a simple file
        $testContent = 'Test file created at ' . now();
        $path = Storage::disk('s3')->put('test/test-' . time() . '.txt', $testContent);
        
        if ($path) {
            $url = 'https://s3.amazonaws.com/' . config('filesystems.disks.s3.bucket') . '/' . $path;
            
            return response()->json([
                'success' => true,
                'message' => 'S3 connection successful',
                'path' => $path,
                'url' => $url,
                'config' => [
                    'bucket' => config('filesystems.disks.s3.bucket'),
                    'region' => config('filesystems.disks.s3.region'),
                    'key_exists' => !empty(config('filesystems.disks.s3.key')),
                    'secret_exists' => !empty(config('filesystems.disks.s3.secret')),
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'S3 upload returned false'
            ], 500);
        }
    } catch (\Exception $e) {
        Log::error('S3 test failed', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'config' => [
                'bucket' => config('filesystems.disks.s3.bucket'),
                'region' => config('filesystems.disks.s3.region'),
                'key_exists' => !empty(config('filesystems.disks.s3.key')),
                'secret_exists' => !empty(config('filesystems.disks.s3.secret')),
            ]
        ], 500);
    }
});
