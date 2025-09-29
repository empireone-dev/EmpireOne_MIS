<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Last Pay and Quit Claim Approved</title>
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
    </style>
</head>

<body>

    <div class="container">
        <div class="content">
            <div style="text-align: center;">
                <img src="https://empireone-hris.com/images/newlogo.png" alt="EmpireOne Logo" style="max-width: 200px;">
            </div>

            <p>Dear <b>{{$data['fname']}} {{$data['lname']}}</b>,</p>

            <p>
                We are pleased to inform you that your <strong>Quit Claim</strong> has been successfully reviewed and
                <strong>approved</strong>. Along with this, your <strong>Last Pay</strong> has also been processed.
            </p>

            <div class="account-box">
                <p><strong>Account Details:</strong></p>
                <p>Bank Name: {{$data['accountName'] ?? 'N/A'}}</p>
                <p>Account Number: {{$data['accountNumber'] ?? 'N/A'}}</p>
                <p class="note">
                    <i>If the above account details are incorrect, please visit our office for verification and updating of your details.</i>
                </p>
            </div>

            <p>
                Please be advised that your last pay will be credited to the above account within
                <strong>thirty (30) days</strong> from the date of this notice.
            </p>

            <p>
                Should you have any questions or require further clarification, please do not hesitate to reach out to us.
                Our team is always ready to assist you.
            </p>

            <p>
                We thank you for your time and contributions with <strong>EmpireOne BPO Solutions Inc.</strong> and wish
                you the very best in your future endeavors.
            </p>

            <p>Best regards,</p>
            <p>
                HR Department<br>
                <strong>EmpireOne BPO Solutions Inc.</strong>
            </p>

            <br><br>
            <p>Connect with us:</p>
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