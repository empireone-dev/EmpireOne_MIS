<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exit Interview Invitation</title>
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

            <p>We hope this message finds you well.</p>

            <p>As part of our offboarding process, we would like to invite you to complete your <strong>Exit Interview</strong>. This is a valuable opportunity for you to share your experiences and provide feedback that will help us improve our workplace.</p>

            <p>Please click the button below to proceed with your <strong>online exit interview</strong>. The process is quick and convenient, and you can complete it at your own pace.</p>

            <div style="text-align: center;">
                <a href="https://empireone-hris.com/exit_interview/{{$data['int_id']}}/{{$data['emp_id']}}/{{$data['app_id']}}" class="button">Proceed to Exit Interview</a>
            </div>

            <p>We appreciate your time and contributions to EmpireOne BPO Solutions Inc. and wish you continued success in your future endeavors.</p>

            <p>Warm regards,</p>
            <p>HR Team<br>
                <strong>EmpireOne BPO Solutions Inc.</strong>
            </p><br><br>

            <p>Visit us on our social media accounts:</p>
            <p>
                <a href="https://www.facebook.com/profile.php?id=100089467625882" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" style="width: 24px; height: 24px;">
                </a>
                <a href="https://www.instagram.com/empireonebposolutions/" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;">
                </a>
                <a href="https://www.tiktok.com/@empireonebposolutions" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/3046/3046122.png" alt="TikTok" style="width: 24px; height: 24px;">
                </a>
                <a href="https://www.linkedin.com/company/empireone-contact-center-inc/?viewAsMember=true" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/174/174857.png" alt="LinkedIn" style="width: 24px; height: 24px;">
                </a>
            </p><br>
            <img src="https://empireone-hris.com/images/SCemp2.jpg" alt="">
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>

</body>

</html>