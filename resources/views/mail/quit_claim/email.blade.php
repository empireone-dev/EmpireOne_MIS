<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quit Claim</title>
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

            <p>We hope this message finds you well. Attached to this email is a copy of your <b>Quit Claim and Release Document</b> from <strong>EmpireOne BPO Solutions Inc.</strong></p>

            <p>Please review the attached file carefully. If everything is in order, kindly affix your signature and return the signed document to us at your earliest convenience. This will serve as confirmation that all final dues and obligations between you and EmpireOne BPO Solutions Inc. have been fully settled.</p>

            <p>Steps to complete the process:</p>
            <p>
                1. Download the attached Quit Claim document.<br>
                2. Review the details carefully.<br>
                3. Choose one of the following options to complete the signing:
            </p>
            <p>
                <b>Option 1:</b> Print and sign the document. Then, scan or take a clear photo of the signed copy and send it back via email or through the upload link below.<br><br>
            <div style="text-align: center;">
                <a href="https://empireone-hris.com/quit-claim/{{$data['emp_id']}}"
                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
                    target="_blank">
                    Upload Signed Quit Claim
                </a>
            </div><br>
            <b>Option 2:</b> If you are unable to print or provide a hard copy of the document, you may visit our office and sign the Quit Claim directly with our HR department.
            </p>

            <p>If you have any questions or concerns regarding the document, please don’t hesitate to reach out to our HR department for clarification.</p>

            <p>We thank you for your service and contributions to the company and wish you success in your future endeavors.</p>

            <p>Best regards,</p>
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