<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Offer Letter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            color: #333;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #007bff;
        }

        .logo {
            max-width: 200px;
            height: auto;
        }

        .content {
            margin-bottom: 30px;
        }

        .highlight {
            background-color: #e7f3ff;
            padding: 15px;
            border-left: 4px solid #007bff;
            margin: 20px 0;
        }

        .button {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
        }

        .attachment-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://empireone-hris.com/images/newlogo.png" alt="EmpireOne Logo" class="logo">
            <h2 style="margin: 15px 0 0 0; color: #007bff;">Job Offer Letter</h2>
        </div>

        <div class="content">
            <p>Dear {{ ($data['gender'] ?? 'Male') == 'Male' ? 'Mr.' : 'Ms.' }} {{ $data['lname'] }},</p>

            <p>We are pleased to make you an offer of employment with <strong>EmpireOne BPO Solutions, Inc.</strong></p>

            <div class="highlight">
                <h3 style="margin-top: 0;">Position Details:</h3>
                <p><strong>Position:</strong> {{ $data['jobPos'] }}</p>
                <p><strong>Total Compensation:</strong> PHP {{ number_format($data['salary']) }}{{ $data['allowance'] != 0 ? ' + PHP ' . number_format($data['allowance']) . ' ' . ($data['typea'] ?? '') : '' }}</p>
                <p><strong>Start Date:</strong> {{ date('F j, Y', strtotime('+4 days')) }}</p>
            </div>

            <div class="attachment-notice">
                <p><strong>📎 Important:</strong> Please find your detailed job offer letter attached as a PDF document. This attachment contains all terms and conditions, benefits, and requirements.</p>
            </div>

            <p>To accept or decline this offer, please click the button below:</p>

            <div style="text-align: center; color: white;">
                <a href="https://empireone-hris.com/job_offer/{{ $data['app_id'] }}/{{ urlencode($data['site']) }}?id={{ $data['id'] }}"
                    class="button" style="background-color: #007bff; color: white;">
                    Accept/Decline Offer
                </a>
            </div>

            <p>For any concerns or questions, please contact our HR team through the Talent Acquisition Team at <a href="mailto:careers@empireonegroup.com">careers@empireonegroup.com</a> & <a href="mailto:hiring@empireonegroup.com">hiring@empireonegroup.com</a>.</p>

            <p>We look forward to having you on board with Team EmpireOne!</p>

            <div style="margin-top: 30px;">
                <p>Very truly yours,</p>
                <p><strong>CHRISTI ANN SANCHEZ</strong><br>
                    Talent Acquisition Manager<br>
                    EmpireOne BPO Solutions, Inc.</p>
            </div>
        </div>

        <div class="footer">
            <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
            <p>This email and its attachment contain confidential information. If you are not the intended recipient, please notify the sender and delete this email.</p>
        </div>
    </div>
</body>

</html>