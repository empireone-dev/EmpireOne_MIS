# AI Interview Component Usage Guide

## ApplicantAiInterviewComponent

This component displays the AI interview recording and results for applicants in the admin panel.

### Features
- **Video Playback**: Full interview recording with HTML5 video controls
- **Interview Q&A**: All questions asked and answers provided during the interview
- **AI Feedback**: AI-generated feedback for each response
- **Recording Details**: Duration, file size, interview date
- **Export to PDF**: Generate a PDF report of the interview results
- **Download Recording**: Direct download link for the video file

### Usage

```jsx
import ApplicantAiInterviewComponent from './components/applicant-ai-interview-component';

// In your admin applicant list or detail page
<ApplicantAiInterviewComponent 
    data={applicantData} 
    item={{ icon: <RobotOutlined />, label: "AI Interview" }} 
/>
```

### Props
- **data**: Applicant data object containing:
  - `app_id`: Applicant ID (required)
  - `fname`: First name
  - `lname`: Last name
  - `position`: Applied position
  - `site`: Application site
  - Other applicant details...

- **item**: Menu item configuration (optional)
  - `icon`: Icon component
  - `label`: Display label

### Component Features

#### 1. Recording Playback
- HTML5 video player with full controls
- Automatic video format detection
- Responsive video sizing
- Download option for offline viewing

#### 2. Interview Analysis
- Question-by-question breakdown
- Applicant responses display
- AI-generated feedback for each answer
- Color-coded sections for easy reading

#### 3. Summary Statistics
- Total questions answered
- Interview duration
- Recording file size
- Interview completion date

#### 4. Export Functionality
- PDF export of complete interview results
- High-quality canvas rendering
- Automatic filename generation
- Includes all interview data

### API Integration
The component automatically fetches:
- Interview Q&A data via `/api/get_ai_interview_results/{app_id}`
- Recording information via `/api/get_ai_interview_recording/{app_id}`

### Error Handling
- Loading states during data fetch
- Error messages for failed requests
- Fallback content for missing data
- User-friendly error display

### Styling
- Uses Ant Design components for consistent UI
- Tailwind CSS for custom styling
- Responsive design for mobile/desktop
- Color-coded sections for different content types

### Example Data Structure

```javascript
// Applicant data object
const applicantData = {
    app_id: "APP123456",
    fname: "John",
    lname: "Doe", 
    position: "Customer Service Representative",
    site: "Manila Office",
    status: "For Final Interview",
    // ... other applicant fields
};

// Interview results structure
const interviewResults = {
    data: [
        {
            guideqs: "Tell me about yourself and your background",
            answer: "I am a motivated individual with 3 years experience...",
            ai_feedback: "Good response showing relevant experience and enthusiasm...",
            int_id: "AI_1638360000"
        }
        // ... more Q&A pairs
    ],
    recording: {
        file_url: "https://domain.com/storage/ai_interviews/recording.webm",
        duration: 1200, // seconds
        file_size: 15728640, // bytes
        interview_date: "2025-12-01T13:20:00Z",
        file_type: "video/webm"
    }
};
```

### Customization Options

#### Modal Size
Adjust the modal width by modifying the `width` prop:
```jsx
<Modal width={1600}> // Larger modal for more content
```

#### Video Player Settings
Customize video playback options:
```jsx
<video 
    controls 
    autoPlay={false}
    loop={false}
    muted={false}
    style={{ maxHeight: '500px' }}
>
```

#### Color Themes
Modify the color scheme by updating Tag colors:
```jsx
<Tag color="blue">Question</Tag>     // Question tags
<Tag color="green">Answer</Tag>      // Answer tags  
<Tag color="purple">Feedback</Tag>   // AI feedback tags
```

### Best Practices

1. **Performance**: Component loads data only when modal opens
2. **User Experience**: Clear loading states and error handling
3. **Accessibility**: Video controls and screen reader friendly
4. **Responsive**: Works on mobile and desktop devices
5. **Data Validation**: Handles missing or malformed data gracefully

### Troubleshooting

#### Video Not Playing
- Check if browser supports the video format
- Verify the file URL is accessible
- Ensure proper CORS headers if files are on different domain

#### Missing Interview Data
- Confirm the applicant completed the AI interview
- Check database for proper data storage
- Verify API endpoints are working correctly

#### PDF Export Issues
- Ensure html2canvas library is properly installed
- Check for CSS conflicts that might affect rendering
- Verify jsPDF library is available

### Integration Examples

#### In Applicant Table Actions
```jsx
const actionMenuItems = [
    {
        key: 'details',
        icon: <UserOutlined />,
        label: 'View Details',
        component: <ApplicantDetailsComponent data={record} />
    },
    {
        key: 'ai-interview', 
        icon: <RobotOutlined />,
        label: 'AI Interview',
        component: <ApplicantAiInterviewComponent data={record} />
    }
];
```

#### In Applicant Profile Page
```jsx
<Tabs>
    <TabPane tab="Personal Info" key="info">
        <ApplicantInfoComponent data={applicant} />
    </TabPane>
    <TabPane tab="AI Interview" key="interview">
        <ApplicantAiInterviewComponent data={applicant} />
    </TabPane>
</Tabs>
```

This component provides a comprehensive view of the AI interview process and results, making it easy for HR teams to review and assess applicant performance.
