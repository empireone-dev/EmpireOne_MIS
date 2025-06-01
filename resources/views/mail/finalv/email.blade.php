<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Final Phase</title>
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

            <p> Congratulations! We are thrilled to inform you that you have successfully passed the initial phase
                interview, and we would like to invite you to the Final Phase Interview via online.</p>

            <p><b>**Interview Details:**</b></p>
            <p><b>MEETING LINK: {{$data['meet_link']}}</b></p>
            <p><b>DATE: {{ \Carbon\Carbon::parse($data['ivdate'])->format('F j, Y') }}</b></p>
            <p><strong>TIME: {{ \Carbon\Carbon::parse($data['ivtime'])->format('g:i A') }}</strong></p>

            <p>During this final interview, we will delve deeper into your qualifications, experience, and the potential
                contributions you can make to our team. We encourage you to come prepared to discuss your relevant
                experience, skills, and any additional information you believe would be valuable for us to know. This
                interview serves as a platform for us to mutually determine if you are the right fit for our organization
                and if EmpireOne BPO Solutions Inc. aligns with your career goals.</p>

            <p>We genuinely appreciate your continued interest in becoming a part of our team, and we are looking
                forward to our upcoming conversation. This interview is an important step, and we believe it will provide
                us with a better understanding of your potential as a valuable addition to our organization.</p>

            <p><b>**Please confirm your attendance by clicking the confirmation button below:**</b></p>
            <div style="text-align: center;"><a href="https://empireone-hris.com/final/{{$data['app_id']}}/{{$data['ivdate']}}/{{$data['ivtime']}}/{{ urlencode(base64_encode($data['meet_link'])) }}"
                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
                    target="_blank">
                    Confirm Attendance
                </a>
            </div><br>


            <p> If you have any questions or require any additional information before the interview, please do not
                hesitate to contact our HR department at hiring@empireonegroup.com for our San Carlos Site and
                career@empireonegroup.com for CarCar Site.</p><br>

            <p>Best regards,</p>
            <p>HR Team</p>
            <p><strong>EmpireOne BPO Solutions Inc.</strong></p><br><br>


            <p>As part of this commitment, we invite you to explore our various social media platforms to stay updated
                on the latest news and insights about our company.</p>

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

            <p>Thank you for being a valuable part of the EmpireOne BPO Solutions Inc community. We look forward to
                connecting with you across our social media channels!</p>

            <img src="https://empireone-hris.com/images/SCemp2.jpg" alt="">

        </div>
    </div>


    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>
    </div>

</body>

</html>