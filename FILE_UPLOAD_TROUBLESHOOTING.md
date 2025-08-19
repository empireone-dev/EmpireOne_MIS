# File Upload Troubleshooting Guide

## Common Issues and Solutions

### 1. PHP Configuration Issues
Check these PHP settings in production:
- `file_uploads = On`
- `upload_max_filesize = 10M` (or higher)
- `post_max_size = 10M` (or higher)
- `max_file_uploads = 20`
- `memory_limit = 256M`

### 2. Web Server Configuration
- **Nginx**: Check `client_max_body_size`
- **Apache**: Check `LimitRequestBody`

### 3. Laravel Configuration
- Verify S3 credentials in `.env`
- Check `config/filesystems.php`

### 4. Debugging Steps

#### Step 1: Test with debug route
```
POST /debug/file-upload
```

#### Step 2: Test simple file upload
```
POST /api/test-file-upload
```

#### Step 3: Check logs
```
tail -f storage/logs/laravel.log
```

### 5. Common Fixes Applied

1. **Added validation** to ensure required fields are present
2. **Added error handling** with try-catch blocks
3. **Added logging** to track upload attempts
4. **Added file validation** to check if uploaded files are valid
5. **Added middleware** to log detailed request information
6. **Fixed JobOffer query** in reupload_file method (was using wrong ID)
7. **Added null coalescing** operators for optional fields

### 6. Environment Differences

The most common differences between local and production:
- PHP configuration limits
- Web server configuration
- S3 credentials/permissions
- Disk space on server
- Network timeouts

### 7. Testing Commands

To test the fixes:
```bash
# Check PHP configuration
php -i | grep upload

# Test S3 connection
php artisan tinker
Storage::disk('s3')->put('test.txt', 'test content');
```
