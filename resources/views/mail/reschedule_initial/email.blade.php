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

            <p>We would like to inform you that your <b>initial interview schedule has been rescheduled</b> due to unforeseen circumstances. We sincerely apologize for any inconvenience this may cause and appreciate your understanding.</p>

            <p><b>**Updated Interview Schedule:**</b></p>
            <p><b>DATE: {{ \Carbon\Carbon::parse($data['iffdate'])->format('F j, Y') }}</b></p>
            <p><strong>TIME: {{ \Carbon\Carbon::parse($data['ifftime'])->format('g:i A') }}</strong></p>

            <p>Please make the necessary adjustments to your schedule and ensure to arrive a few minutes early for your interview. During this session, we’ll discuss your experience, qualifications, and how your profile aligns with the role you're applying for.</p>

            <p>We are looking forward to speaking with you and learning more about the contributions you can bring to our team.</p>

            <p><b>**Please confirm your attendance by clicking the confirmation button below:**</b></p>
            <div style="text-align: center;">
                <a href="https://empireone-hris.com/accept/{{$data['app_id']}}/{{$data['iffdate']}}/{{$data['ifftime']}}?auto=true"
                    class="button"
                    style="display:inline-block; margin: 0 10px;">
                    Accept Invitation
                </a>

                <a href="https://empireone-hris.com/confirmation/{{$data['app_id']}}/{{$data['iffdate']}}/{{$data['ifftime']}}"
                    class="button"
                    style="display:inline-block; margin: 0 10px; background-color: #e74c3c; color: white;">
                    Decline
                </a>
            </div>
            <br>

            <p>If you have any questions or need further assistance regarding your interview schedule, feel free to contact our HR department at hiring@empireonegroup.com for San Carlos Site or career@empireonegroup.com for CarCar Site.</p><br>

            <p>Warm regards,</p>
            <p>HR Team<br>
                <strong>EmpireOne BPO Solutions Inc.</strong>
            </p><br><br>

            <p>Stay connected with us by following our social media pages to get the latest updates and insights about our company.</p>

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

            <p>We appreciate your patience and look forward to meeting you soon!</p>

            <img src="https://empireone-hris.com/images/SCemp2.jpg" alt="Site Image">
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>

</body>

</html>