<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Review ERF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 900px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }

        .account-box {
            background-color: #f3f7ff;
            border: 1px solid #cce0ff;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
        }

        .btn-primary {
            display: inline-block;
            background-color: #007bff;
            color: white !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #0056b3;
            text-decoration: none;
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="content">
            <div style="text-align: center;">
                <img src="https://empireone-hris.com/images/newlogo.png" alt="EmpireOne Logo" style="max-width: 200px;">
            </div>

            <p>Dear <b>{{$data['approver_name'] ?? 'Site Director / Site Manager'}}</b>,</p>

            <p>
                Good day.
            </p>

            <p>
                This is to formally request your review and approval of the <strong>Employee Requisition Form (ERF)</strong> submitted for your site.
            </p>

            <div class="account-box">
                <p><strong>ERF Details:</strong></p>
                <p>Position: {{$data['position'] ?? 'N/A'}}</p>
                <p>Department: {{$data['department'] ?? 'N/A'}}</p>
                <p>Employment Type: {{$data['employment_type'] ?? 'N/A'}}</p>
                <p>Requested Headcount: {{$data['headcount'] ?? 'N/A'}}</p>
                <p>Justification: {{$data['justification'] ?? 'N/A'}}</p>
                <p>Requested By: {{$data['requested_by'] ?? 'N/A'}}</p>

                @if(isset($data['ref_id']))
                <div style="margin-top: 20px; text-align: center;">
                    <a href="{{ url('/erf/' . $data['reviewer_id'] . '/' . $data['ref_id']) }}" class="btn-primary">
                        View Complete ERF Details
                    </a>
                </div>
                @endif
            </div>

            <p>
                Kindly review the details of this requisition and provide your approval or feedback at your earliest convenience to proceed with the recruitment process.
            </p>

            <p>
                Should you require any clarification or additional information regarding this request, please feel free to reach out.
            </p>

            <p>
                Thank you for your prompt attention to this matter.
            </p>

            <p>Best regards,</p>
            <p>
                HR Department<br>
                <strong>EmpireOne BPO Solutions Inc.</strong>
            </p>

            <br><br>

            <div class="footer">
                <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
            </div>

</body>

</html>