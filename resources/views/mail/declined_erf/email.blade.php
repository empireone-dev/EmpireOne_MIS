<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Declined ERF Request</title>
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
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="content">
            <div style="text-align: center;"><img src="https://empireone-hris.com/images/newlogo.png" alt="EmpireOne Logo" style="max-width: 200px;"></div>

            <p>Dear <b>{{$data['fname']}} {{$data['lname']}}</b>,</p>

            <p>I hope this message finds you well. After a thorough review, we regret to inform you that your ERF request with Reference ID <strong>{{$data['ref_id']}}</strong> for the position of <strong>{{$data['jobPos']}}</strong> has been declined due to the following reason:</p>

            <p><strong>Reason: {{$data['reason'] ?? 'No reason provided'}}</strong></p>

            <p>If you encounter any issues or require assistance during this process, please do not hesitate to reach out. We are committed to providing support and are available to discuss this decision further if needed.</p>

            <p>Thank you for your understanding. Please feel free to submit a new ERF request in the future if circumstances change.</p>

            <p></p>

            <p>Warm regards,</p>
            <p>Human Resources<br>
                <strong>EmpireOne BPO Solutions Inc.</strong>
            </p><br><br>
        </div>
    </div>


    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>
    </div>

</body>

</html>