# File Upload Troubleshooting Guide

## Current Issue
Getting a 500 error with message: "File upload failed: The file failed to upload."

## Debugging Routes Added

### 1. S3 Connection Test
```
GET /test-s3
```
This will test if S3 is properly configured and accessible.

### 2. File Upload Debug
```
POST /debug/file-upload
```
This will show PHP configuration and request details.

### 3. Simple File Upload Test
```
POST /api/test-file-upload
```
This will test basic file upload functionality without S3.

## Recent Changes Made

### 1. Enhanced Error Handling
- Added specific S3 upload error handling
- Added database insert error handling
- Added fallback to local storage if S3 fails
- Added comprehensive logging

### 2. Added Middleware
- Created `FileUploadMiddleware` for detailed request logging
- Registered middleware in `app/Http/Kernel.php`
- Applied middleware to file upload routes

### 3. Improved Controller Logic
- Better validation and error messages
- Null coalescing operators for optional fields
- Fixed JobOffer query bug in reupload_file method
- Added try-catch blocks around critical operations

## Testing Steps

### Step 1: Test S3 Connection
1. Visit `/test-s3` in your browser
2. Check if S3 credentials are working
3. If S3 fails, the controller will now fallback to local storage

### Step 2: Check Laravel Logs
After attempting a file upload, check:
```bash
Get-Content storage/logs/laravel.log -Tail 50
```

### Step 3: Test Basic File Upload
1. Use the test route `/api/test-file-upload` with a simple file
2. This bypasses the complex logic and tests basic file handling

### Step 4: Check PHP Configuration
Use the debug route to verify:
- `file_uploads = On`
- `upload_max_filesize` is sufficient
- `post_max_size` is sufficient
- S3 credentials are present

## Common Solutions

### 1. S3 Configuration Issues
If S3 is the problem, check your `.env` file:
```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=your_region
AWS_BUCKET=your_bucket
```

### 2. PHP Limits
Common production issues:
- `upload_max_filesize = 10M`
- `post_max_size = 10M`
- `memory_limit = 256M`
- `max_execution_time = 300`

### 3. Web Server Limits
- **Nginx**: `client_max_body_size 10M;`
- **Apache**: `LimitRequestBody 10485760`

### 4. File Permissions
Ensure storage directories are writable:
```bash
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

## Fallback Mechanism
The controller now has a fallback mechanism:
1. Try S3 upload first
2. If S3 fails, try local storage
3. If both fail, return detailed error message

## Next Steps
1. Deploy the updated code
2. Test with the debug routes
3. Check the Laravel logs for specific error messages
4. Based on the logs, apply the appropriate fix

## Error Messages to Look For
- "S3 upload failed" - S3 configuration issue
- "Database insert failed" - Database/model issue
- "File upload failed completely" - Both S3 and local storage failed
- "Invalid file upload" - File validation issue
