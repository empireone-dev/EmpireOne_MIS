<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rescheduled Final Phase Interview</title>
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
            <div style="text-align: center;">
                <img src="https://empireone-hris.com/images/newlogo.png" alt="EmpireOne Logo" style="max-width: 200px;">
            </div>

            <p>Dear <b>{{$data['fname']}} {{$data['lname']}}</b>,</p>

            <p>We hope this message finds you well. We are writing to inform you that your <b>Final Phase Interview</b> has been <b>rescheduled</b> to a new date and time. We sincerely apologize for any inconvenience and thank you for your patience and flexibility.</p>

            <p>We remain excited about your application and look forward to further discussing your potential role within our organization.</p>

            <p><b>**Updated Interview Details:**</b></p>
            <p><b>DATE: {{ \Carbon\Carbon::parse($data['iffdate'])->format('F j, Y') }}</b></p>
            <p><strong>TIME: {{ \Carbon\Carbon::parse($data['ifftime'])->format('g:i A') }}</strong></p>

            <p>During this final interview, we will take a deeper dive into your qualifications, experience, and how you can contribute to the success of our team. Please prepare to discuss your skills, relevant experience, and anything else you believe will help us get to know you better.</p>

            <p>We appreciate your continued interest in becoming part of EmpireOne BPO Solutions Inc., and we are looking forward to this final step in the selection process.</p>

            <p><b>**Please confirm your attendance by clicking the confirmation button below:**</b></p>
            <div style="text-align: center;">
                <a href="https://empireone-hris.com/final/{{$data['app_id']}}/{{$data['iffdate']}}/{{$data['ifftime']}}" class="button">Confirm Attendance</a>
            </div><br>

            <p>If you have any questions or need assistance, feel free to contact our HR department at hiring@empireonegroup.com for San Carlos Site or career@empireonegroup.com for CarCar Site.</p><br>

            <p>Best regards,</p>
            <p>HR Team<br>
                <strong>EmpireOne BPO Solutions Inc.</strong>
            </p><br><br>

            <p>We also invite you to connect with us on our social media platforms to stay updated with our latest news and career opportunities:</p>

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

            <p>Thank you again for your interest in EmpireOne BPO Solutions Inc. We look forward to speaking with you soon!</p>

            <img src="https://empireone-hris.com/images/SCemp2.jpg" alt="">
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>

</body>

</html>