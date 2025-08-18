<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pre-Employment submission</title>
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

            <p>We hope this message finds you well. Congratulations once again on your successful application, and accepting the job offer for the position of <b>{{$data['jobPos']}}</b> at EmpireOne BPO Solutions Inc. We are delighted to welcome you to our team.</p>

            <p>
                To facilitate the onboarding process, we kindly request you to submit the following pre-employment requirements by clicking the button below.</p>

            <p>BELOW IS THE LIST OF REQUIREMENTS YOU NEED TO SUBMIT (<i>no asterisk is optional</i>):</p>
            <p>
                • Birth Certificate *<br>
                • SSS Form E1/SSS ID *<br>
                • TIN ID *<br>
                • Certificate of Employment from the previous employer<br>
                • Phil Health MDR/ID *<br>
                • Photocopy of Drivers License(if applicable)<br>
                • SSS & PAG-IBIG Loan Voucher(if applicable)<br>
                • Marriage Certificate(if married)<br>
                • Birth Certificates of Dependents(if Married - spouse & children; if Single - parents.)<br>
                • Barangay Clearance with the purpose of bank application *<br>
                • Police Clearance *<br>
                • NBI Clearance *
            </p>

            <p>
                ---HEALTH CERTIFICATE WITH THE FF. TESTS:---<br>
                • Chest X-ray *<br>
                • Drug Test *
            </p>

            <div style="text-align: center;">
                <a href="https://empireone-hris.com/pre-employment/{{$data['app_id']}}/{{ str_replace(' ', '+', $data['site']) }}?id={{$data['id']}}"
                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
                    target="_blank">
                    Submit Pre-Employment Requirements
                </a>
            </div><br>

            <p>Kindly ensure that all documents are clear, legible, and uploaded in the appropriate sections. Upon receipt of your complete documentation, our HR team will proceed with the necessary verification processes. If you have any questions or encounter any difficulties during the submission process, please do not hesitate to communicate to our HR department.</p>

            <p>We appreciate your prompt attention to this matter, as it will help ensure a smooth and efficient onboarding experience for you. We are excited to have you as part of the EmpireOne BPO Solutions Inc. family. Thank you for your cooperation.</p>

            <p></p>

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
    </div>

</body>

</html>