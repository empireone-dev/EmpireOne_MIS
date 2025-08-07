<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Final Interview Schedule</title>
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

        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="content">
            <div style="text-align: center;">
                <img src="https://empireone-hris.com/images/newlogo.png" alt="EmpireOne Logo" style="max-width: 200px;">
            </div>

            <p>Dear <b>{{$interviewer->employee_fname}} {{$interviewer->employee_lname}}</b>,</p>

            <p>This is to inform you that a <strong>Final Phase Interview</strong> has been scheduled with the following applicant:</p>

            <p><b>Interview Details:</b></p>
            <p><b>Applicant Name:</b> {{$data['fname']}} {{$data['lname']}}</p>
            <p><b>DATE:</b> {{ \Carbon\Carbon::parse($data['ivdate'])->setTimezone('Asia/Manila')->format('F j, Y') }} (Philippine Time)</p>
            <p><b>TIME:</b> {{ \Carbon\Carbon::parse($data['ivtime'])->setTimezone('Asia/Manila')->format('g:i A') }} (Philippine Time)</p>
            <p><b>Interview Mode:</b> Online</p>
            <p><b>Meeting Link:</b> <a href="{{$data['meet_link']}}" target="_blank">{{$data['meet_link']}}</a></p>

            <p>Please ensure to be available on the scheduled date and time. You may review the applicant’s profile and notes prior to the interview via the HRIS system.</p>

            <p>If there are any issues or adjustments needed, feel free to contact the HR department as soon as possible.</p>

            <p>Thank you for your cooperation and support in the recruitment process.</p>

            <p>Best regards,</p>
            <p>HR Team</p>
            <p><strong>EmpireOne BPO Solutions Inc.</strong></p><br><br>

            <p>
                <img src="https://empireone-hris.com/images/SCemp2.jpg" alt="" style="max-width: 100%; height: auto;">
            </p>
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>

</body>

</html>