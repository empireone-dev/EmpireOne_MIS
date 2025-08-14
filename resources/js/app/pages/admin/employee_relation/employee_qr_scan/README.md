# Employee QR Code System

This system allows you to generate QR codes containing employee ID links and view comprehensive employee information on a dedicated page when scanned.

## ✅ QR Code Scanning Fix

**Issue Resolved**: QR codes were too large to scan due to excessive data.

**Solution**: QR codes now contain simple URLs with employee IDs instead of full JSON data:
- **Format**: `https://yoursite.com/admin/employee-qr-scan/{employee_id}`
- **Example**: `https://yoursite.com/admin/employee-qr-scan/240814001`

## Features

### 1. QR Code Generation
- **Location**: Employee table actions menu
- **Content**: Clean URL with employee ID (scannable by any QR reader)
- **Data Retrieved**: Complete employee information fetched from database when scanned
- **Information Includes**:
  - Personal information (name, DOB, age, gender, etc.)
  - Contact information (email, phone, addresses)
  - Government IDs (SSS, TIN, PhilHealth, Pag-IBIG)
  - Work information (position, department, hire date, etc.)
  - Family information (parents' names)
  - Emergency contact details
  - Education information

### 2. QR Code Viewing Page
- **URL**: `/admin/employee-qr-scan/{employee_id}`
- **Fallback**: `/admin/employee-qr-scan` (for manual data entry)
- **Features**:
  - Fetches real-time data from database
  - Clean, organized display of all employee information
  - Responsive design with cards and sections
  - Professional layout suitable for verification purposes
  - Error handling for invalid employee IDs

### 3. QR Code Actions
- **Preview Page**: Opens the employee information page directly
- **Copy URL**: Copies the scannable QR code URL to clipboard
- **Mobile-friendly**: QR codes can be scanned with any QR scanner app
- **Compact**: Short URLs that are easily scannable

## How to Use

### Generating QR Codes
1. Go to the Employee Section page
2. Find the employee in the table
3. Click the actions menu (three dots)
4. Click "Generate QR Code"
5. The modal will show:
   - Compact QR code with employee ID URL
   - Preview of all employee information
   - Action buttons to copy URL or preview page
   - The actual QR URL for reference

### Viewing Employee Information
1. **Scan the QR code** with any QR scanner app on your phone
2. **The URL will be**: `https://yoursite.com/admin/employee-qr-scan/{employee_id}`
3. **Opens automatically** in browser with all employee details
4. **Real-time data** fetched from the database

### Alternative Access Methods
1. **Employee ID Lookup**: Enter employee ID directly in the viewer
2. **URL Entry**: Paste the QR URL manually
3. **Direct Preview**: Click "Preview Page" in the QR generation modal
4. **Sample Data**: Use the demo feature (note: requires valid employee ID)

## Technical Details

### Files Created/Modified
1. `generate-qr-component.jsx` - Enhanced QR generation with compact URLs
2. `employee_qr_scan/page.jsx` - Page for displaying employee data with API integration
3. `qr-scanner-component.jsx` - Component for manual employee ID lookup
4. `employee-table-header-section.jsx` - Header component with QR scanner button
5. `routes/web.php` - Added routes for QR scan pages

### Data Structure
- **QR Content**: Simple URL format `/admin/employee-qr-scan/{employee_id}`
- **Data Source**: Real-time fetch from `/api/employee/{employee_id}` endpoint
- **Compact**: Short URLs that are easily scannable by any QR reader

### API Integration
- **Endpoint**: `GET /api/employee/{emp_id}`
- **Controller**: `EmployeeController@show`
- **Relationships**: Automatically includes applicant, user, department, and attrition data
- **Response Format**: Standard JSON with employee and related data

### Security Considerations
- QR codes only contain employee ID (no sensitive data in URL)
- Data fetched securely from backend API
- Consider adding authentication to the scan page if needed
- Employee ID exposure is minimal security risk

### Performance Benefits
- **Smaller QR codes**: Easier to scan and print
- **Real-time data**: Always shows current information
- **Cacheable URLs**: Can be bookmarked or shared
- **Database integrity**: Single source of truth

## Integration

To add the QR scanner button to your employee table:

```jsx
import QRScannerComponent from '../components/qr-scanner-component';

// In your component JSX:
<QRScannerComponent />
```

The QR generation is already integrated into the existing employee table actions menu.
