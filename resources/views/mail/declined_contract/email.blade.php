<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Declined Contract Notification</title>
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

            <p> I hope this message finds you well. After a thorough review, we regret to inform you that the contract for the position of <strong>{{$data['jobPos']}}</strong> has been declined due to the following reason:</p>

            <p><strong>Reason: {{$data['reason'] ?? ''}}</strong></p>

            <p>In light of this, we kindly request that you re-upload the corrected or signed contract document to proceed with the next steps in the process. Please follow the instructions below:</p>
            <p>
                • Download and print the PDF Document Contract. <br>
                • Sign the printed contract. <br>
                • Scan and ensure the document is clear and legible. <br>
                • Convert the scanned file into PDF format. <br>
                • Find and re-upload the new version of the signed contract by clicking the button below:
            </p>
            <div style="text-align: center;">
                <a href="https://empireone-hris.com/pre-employment/{{$data['app_id']}}/{{ str_replace(' ', '+', $data['site']) }}?id={{$data['id']}}"
                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
                    target="_blank">
                    Upload Signed Contract
                </a>
            </div><br>

            <p>If you encounter any issues or require assistance during this process, please do not hesitate to reach out. We are committed to providing support to ensure a smooth and successful contract submission.</p>

            <p>Thank you for your prompt attention to this matter. We are eager to move forward once the corrected document is received and we remain enthusiastic about the opportunity to have you join our team.</p>

            <p></p>

            <p>Warm regards,</p>
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
    </div>

</body>

</html>