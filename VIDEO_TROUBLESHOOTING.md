# AI Interview Video Display Troubleshooting

## Problem: Video shows black screen with audio controls only

### Common Causes & Solutions

#### 1. **Video Format Compatibility**
- **Issue**: Browser doesn't support the recorded video format
- **Solution**: The component now includes multiple source formats as fallbacks
- **Check**: Look at the debug info overlay for file type

#### 2. **File Path/URL Issues**
- **Issue**: Video file URL is incorrect or inaccessible
- **Solution**: Use the "Direct Video Link" or "Open in New Tab" buttons
- **Check**: Console logs will show the actual URL being used

#### 3. **CORS (Cross-Origin) Issues**
- **Issue**: Video files served from different domain without proper headers
- **Solution**: Ensure Laravel storage is properly configured
- **Fix**: Run `php artisan storage:link` to create public symlink

#### 4. **Large File Size**
- **Issue**: Video file is too large for browser to handle
- **Solution**: Use the download option instead
- **Check**: File size is shown in the interface

### Updated Component Features

The component now includes several fixes:

1. **Multiple Source Formats**
   ```jsx
   <source src={url} type="video/webm" />
   <source src={url} type="video/mp4" />
   ```

2. **Better Video Attributes**
   - `preload="metadata"` - Loads video information without full download
   - `playsInline` - Better mobile compatibility
   - `objectFit: 'contain'` - Proper video scaling

3. **Debug Information**
   - Shows video URL and file type in overlay
   - Console logging for troubleshooting
   - Error code display when video fails

4. **Alternative Access Methods**
   - "Open in New Tab" button
   - Direct download link
   - Direct video URL access

### Testing Steps

1. **Check Browser Console**
   - Look for error messages
   - Verify URL accessibility
   - Check for CORS errors

2. **Test Direct Access**
   - Click "Open in New Tab" button
   - Try the direct video link
   - Download the file to verify it's valid

3. **Verify File Storage**
   ```bash
   # Check if storage link exists
   ls -la public/storage
   
   # Create storage link if missing
   php artisan storage:link
   ```

4. **Check File Permissions**
   ```bash
   # Ensure files are readable
   chmod 644 storage/app/public/ai_interviews/*
   ```

### Alternative Solutions

If video still doesn't display:

1. **Use External Video Player**
   - Copy video URL
   - Open in VLC or other media player
   - Use browser's native video controls

2. **Download and Review Locally**
   - Use the download button
   - Play file locally
   - Check if file is corrupted

3. **Browser Compatibility**
   - Try different browser (Chrome, Firefox, Edge)
   - Check browser's video codec support
   - Update browser to latest version

### Technical Details

The video element now includes:
- Better error handling with specific error codes
- Multiple fallback formats for broader compatibility
- Improved styling for better display
- Debug information for troubleshooting

### Server-side Requirements

Ensure your server configuration supports:
- Large file uploads (for recording)
- Proper MIME type detection
- CORS headers if needed
- Sufficient storage space

### Common Error Codes

- **Error 1**: MEDIA_ERR_ABORTED - User aborted playback
- **Error 2**: MEDIA_ERR_NETWORK - Network error during download  
- **Error 3**: MEDIA_ERR_DECODE - Error decoding the video
- **Error 4**: MEDIA_ERR_SRC_NOT_SUPPORTED - Video format not supported

The component will now display these error codes to help with troubleshooting.
