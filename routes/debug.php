<?php

use Illuminate\Support\Facades\Route;

// Debug route to check file upload configuration
Route::post('/debug/file-upload', function (\Illuminate\Http\Request $request) {
    return response()->json([
        'php_version' => PHP_VERSION,
        'max_file_uploads' => ini_get('max_file_uploads'),
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'post_max_size' => ini_get('post_max_size'),
        'memory_limit' => ini_get('memory_limit'),
        'max_execution_time' => ini_get('max_execution_time'),
        'file_uploads' => ini_get('file_uploads') ? 'enabled' : 'disabled',
        'tmp_dir' => ini_get('upload_tmp_dir') ?: sys_get_temp_dir(),
        'request_method' => $request->method(),
        'content_type' => $request->header('Content-Type'),
        'content_length' => $request->header('Content-Length'),
        'has_file' => $request->hasFile('file'),
        'all_files' => $request->allFiles(),
        'all_input' => $request->all(),
        'server_vars' => [
            'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'] ?? null,
            'CONTENT_TYPE' => $_SERVER['CONTENT_TYPE'] ?? null,
            'CONTENT_LENGTH' => $_SERVER['CONTENT_LENGTH'] ?? null,
        ],
        's3_config' => [
            'key_exists' => !empty(config('filesystems.disks.s3.key')),
            'secret_exists' => !empty(config('filesystems.disks.s3.secret')),
            'region' => config('filesystems.disks.s3.region'),
            'bucket' => config('filesystems.disks.s3.bucket'),
        ]
    ]);
});

// Test route for debugging pre_employment_file specifically
Route::post('/debug/pre-employment-file', function (\Illuminate\Http\Request $request) {
    \Illuminate\Support\Facades\Log::info('Pre-employment file debug', [
        'request_method' => $request->method(),
        'content_type' => $request->header('Content-Type'),
        'content_length' => $request->header('Content-Length'),
        'has_file' => $request->hasFile('file'),
        'all_files' => $request->allFiles(),
        'request_data' => $request->except(['file']),
        'validation_rules' => [
            'file' => 'required|file|max:51200', // Updated to 50MB to match controller
            'app_id' => 'required',
            'reqs' => 'required',
        ]
    ]);

    try {
        // Test the same validation as the actual controller
        $request->validate([
            'file' => 'required|file|max:51200', // 50MB max (updated to match controller)
            'app_id' => 'required',
            'reqs' => 'required',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            \Illuminate\Support\Facades\Log::info('File validation passed', [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getMimeType(),
                'valid' => $file->isValid(),
                'error' => $file->getError(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Validation passed',
            'has_file' => $request->hasFile('file'),
        ]);

    } catch (\Illuminate\Validation\ValidationException $e) {
        \Illuminate\Support\Facades\Log::error('Validation failed', [
            'errors' => $e->errors(),
            'message' => $e->getMessage(),
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Unexpected error', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Unexpected error: ' . $e->getMessage(),
        ], 500);
    }
});
