<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Virtual Contract Signing</title>
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

            <p>Dear <b>{{$data['fname']}} {{$data['lname']}}</b>,</p>

            <p>We hope this message finds you well. Congratulations once again on your successful application and acceptance of the job offer for the position of <b>{{$data['jobPos']}}</b> at EmpireOne BPO Solutions Inc. We are excited to have you join our team.</p>

            <p>
                As part of your onboarding process, we will proceed with a <b>virtual contract signing</b>. Please follow the steps below to complete this process:
            </p>

            <p>
                1. Download the attached contract from this email.<br>
                2. Print the contract.<br>
                3. Sign the printed contract.<br>
                4. Scan the signed contract ensuring it is clear and legible.<br>
                5. Save the scanned file in PDF format.<br>
                6. Upload the signed contract using the link below.
            </p>

            <div style="text-align: center;">
                <a href="https://empireone-hris.com/virtual-contract/{{$data['app_id']}}"
                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
                    target="_blank">
                    Upload Signed Contract
                </a>
            </div><br>

            <p>If you encounter any issues during this process, please feel free to reach out to our HR department for assistance. Your prompt submission will help us proceed smoothly with your onboarding.</p>

            <p>We look forward to receiving your signed contract and officially welcoming you to the EmpireOne BPO Solutions Inc. family.</p>

            <p>Best regards,</p>
            <p>HR Team</p>
            <p><strong>EmpireOne BPO Solutions Inc.</strong></p><br>

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