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
