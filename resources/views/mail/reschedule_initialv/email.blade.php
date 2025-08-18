<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rescheduled Interview Notification</title>
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

            <p>Thank you for your continued interest in joining our team at EmpireOne BPO Solutions Inc.</p>

            <p>We would like to inform you that your <b>initial interview schedule has been rescheduled</b>. We apologize for any inconvenience this may have caused and appreciate your flexibility and understanding.</p>

            <p><b>**Updated Interview Details:**</b></p>
            <p><b>MEETING LINK: {{$data['meet_link']}}</b></p>
            <p><b>DATE: {{ \Carbon\Carbon::parse($data['ivdate'])->format('F j, Y') }}</b></p>
            <p><strong>TIME: {{ \Carbon\Carbon::parse($data['ivtime'])->format('g:i A') }}</strong></p>

            <p>Please make sure to join the meeting a few minutes early using the link provided above. During this session, we will discuss your qualifications, experience, and how your skills align with the role you're applying for.</p>

            <p>We are excited to get to know you better and explore the valuable contributions you can bring to our team.</p>

            <p><b>**Kindly confirm your attendance by clicking the confirmation button below:**</b></p>
            <div style="text-align: center;">
                <a href="https://empireone-hris.com/confirmation/{{$data['app_id']}}/{{$data['ivdate']}}/{{$data['ivtime']}}/{{ urlencode(base64_encode($data['meet_link'])) }}"
                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
                    target="_blank">
                    Confirm Attendance
                </a>
            </div><br>

            <p>If you have any questions or need further assistance, feel free to contact our HR department at hiring@empireonegroup.com for our San Carlos Site or career@empireonegroup.com for CarCar Site.</p><br>

            <p>Warm regards,</p>
            <p>HR Team<br>
                <strong>EmpireOne BPO Solutions Inc.</strong>
            </p><br><br>

            <p>As part of our commitment to transparency and engagement, we invite you to follow us on our official social media platforms.</p>

            <p>Visit and follow us on our social media accounts:</p>
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

            <p>We appreciate your patience and look forward to connecting with you soon!</p>

            <img src="https://empireone-hris.com/images/SCemp2.jpg" alt="">
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>

</body>

</html>