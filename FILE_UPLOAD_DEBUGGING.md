# File Upload Troubleshooting Guide

## Common Issues and Solutions

### 1. Frontend Issues
- **File not selected**: Ensure file is properly selected before upload
- **Validation errors**: Check file size, type, and required fields
- **Network errors**: Check internet connection and server status

### 2. Backend Issues
- **Server configuration**: Check PHP upload limits and server settings
- **S3 configuration**: Verify AWS credentials and bucket settings
- **Database errors**: Check database connection and table structure

### 3. Debugging Steps

#### Frontend Debugging
```javascript
// Add this before the upload attempt in handleOk function
console.log('Debug info:', {
    hasFile: !!fileList[0],
    fileName: fileList[0]?.originFileObj?.name,
    fileSize: fileList[0]?.originFileObj?.size,
    fileSizeMB: fileList[0]?.originFileObj?.size ? (fileList[0].originFileObj.size / (1024 * 1024)).toFixed(2) : 'N/A',
    reqs: reqs,
    app_id: app_id,
    fileType: fileList[0]?.originFileObj?.type
});
```

#### Backend Debugging
Check Laravel logs in `storage/logs/laravel.log` for detailed error information.

#### Common Server Settings to Check
```
# PHP settings that might cause issues:
upload_max_filesize = 50M
post_max_size = 50M
max_execution_time = 300
memory_limit = 256M
```

### 4. Error Code Meanings
- **422**: Validation failed - check required fields and file validity
- **413**: Payload too large - file size exceeds server limits
- **500**: Server error - check logs for detailed error information
- **404**: Route not found - check API endpoint configuration

### 5. Local vs Production Differences
- Server PHP configuration limits
- S3 credentials and permissions
- Database connection settings
- Storage directory permissions
