# AI Interview Recording Feature

## Overview
The AI Interview system now includes automatic recording functionality that captures the entire interview session (both audio and video) and saves it to the database for later review.

## Features
- **Automatic Recording**: Recording starts automatically when the interview begins
- **Audio + Video**: Captures both microphone audio and camera video (if enabled)
- **Secure Storage**: Files are stored in `storage/app/public/ai_interviews/`
- **Database Integration**: Recording metadata saved to `a_i_interviews` table
- **Real-time Status**: Shows recording status in the UI
- **Auto-Save**: Recording is automatically saved when interview completes

## How It Works

### Frontend (React)
1. **Recording States**: Added new state variables for recording management
2. **MediaRecorder API**: Uses browser's native MediaRecorder for capture
3. **File Upload**: Automatically uploads recording file after interview completion
4. **UI Indicators**: Shows recording status, duration, and any errors

### Backend (Laravel)
1. **API Endpoint**: `/api/save_ai_interview_recording` handles file uploads
2. **File Storage**: Files saved to `storage/app/public/ai_interviews/`
3. **Database Record**: Metadata stored in `a_i_interviews` table
4. **Validation**: File type and size validation (max 200MB)

## Database Schema
The `a_i_interviews` table includes:
- `app_id`: Applicant ID
- `file`: Recording filename
- `duration`: Interview duration in seconds
- `file_size`: File size in bytes
- `file_type`: MIME type (video/webm, video/mp4, etc.)
- `interview_date`: When the interview was conducted
- `metadata`: JSON field with additional recording info

## API Endpoints

### Save Recording
```
POST /api/save_ai_interview_recording
Content-Type: multipart/form-data

Parameters:
- recording (file): The interview recording file
- app_id (string): Applicant ID
- interview_duration (integer): Duration in seconds
```

### Get Recording Info
```
GET /api/get_ai_interview_recording/{app_id}

Response:
{
  "status": "success",
  "data": {
    "id": 1,
    "app_id": "APP123",
    "file": "interview_APP123_1638360000.webm",
    "duration": 1200,
    "file_size": 15728640,
    "file_type": "video/webm",
    "file_url": "http://domain.com/storage/ai_interviews/interview_APP123_1638360000.webm",
    "interview_date": "2025-12-01T13:20:00Z",
    "metadata": {...}
  }
}
```

### Get Interview Results (includes recording)
```
GET /api/get_ai_interview_results/{app_id}

Response includes both interview Q&A and recording information
```

## File Formats Supported
- **Primary**: WebM (video/webm) with VP8 video and Opus audio
- **Fallback**: MP4, AVI, MOV formats
- **Audio-only**: WebM audio format if video is not available

## Technical Notes

### Browser Compatibility
- Requires modern browsers with MediaRecorder API support
- WebRTC getUserMedia for camera/microphone access
- Automatic fallback for different MIME types

### File Handling
- Files are uniquely named with timestamp
- Existing recordings are replaced (old files deleted)
- File integrity checks before saving
- Proper error handling and logging

### Security
- File type validation on upload
- Size limits (200MB max)
- Secure file storage location
- Access control through Laravel routes

## Usage for Admins

### Viewing Recordings
1. Use the API endpoint to get recording URL
2. Access files directly via the generated URL
3. Files are publicly accessible once uploaded

### File Management
- Recordings are stored in `storage/app/public/ai_interviews/`
- Use `php artisan storage:link` to make files publicly accessible
- Regular cleanup may be needed to manage storage space

## Example Implementation

### Getting Recording for Review
```javascript
// Fetch recording info
const response = await fetch(`/api/get_ai_interview_recording/${applicantId}`);
const data = await response.json();

if (data.status === 'success') {
  const recordingUrl = data.data.file_url;
  const duration = data.data.duration;
  
  // Display video player with recording
  const video = document.createElement('video');
  video.src = recordingUrl;
  video.controls = true;
  document.body.appendChild(video);
}
```

### Admin Panel Integration
The recording URLs can be embedded in admin panels for HR review:
```html
<video controls width="800">
  <source src="{{ $recording->file_url }}" type="{{ $recording->file_type }}">
  Your browser does not support video playback.
</video>
```

## Troubleshooting

### Common Issues
1. **Recording not starting**: Check camera/microphone permissions
2. **File upload fails**: Check file size limits and server configuration
3. **Playback issues**: Verify file format support in browser
4. **Storage full**: Monitor disk space in storage directory

### Error Messages
- "Failed to start recording": Permission or hardware issue
- "Recording error": MediaRecorder API failure
- "Failed to save recording": Server-side upload/storage issue

## Future Enhancements
- Compression options for smaller file sizes
- Multiple format exports
- Streaming upload during recording
- Advanced playback controls in admin panel
- Automatic transcription integration
