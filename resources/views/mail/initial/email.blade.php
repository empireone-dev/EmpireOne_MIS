<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PARASAT Application Status</title>
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

            <p>We appreciate your interest in joining our team at EmpireOne BPO Solutions Inc. It is with great pleasure that we inform you of your selection for the initial phase interview.</p>

            <p><b>**Interview Details:**</b></p>
            <p><b>DATE: {{ \Carbon\Carbon::parse($data['iffdate'])->format('F j, Y') }}</b></p>
            <p><strong>TIME: {{ \Carbon\Carbon::parse($data['ifftime'])->format('g:i A') }}</strong></p>

            <p> To ensure a smooth start to the interview process, we kindly request that you arrive a few minutes early. During this interview, we will have the opportunity to discuss your qualifications, experience, and how your skills align with the requirements of the position you applied for.</p>

            <p>We are genuinely excited to get to know you better and learn more about the unique contributions you can make to our team.</p>

            <p> We eagerly anticipate meeting you and delving further into your application. Thank you for considering EmpireOne BPO Solutions Inc. as your potential employer. We look forward to this next step in the selection process.</p>

            <p><b>**Please confirm your attendance by clicking the confirmation button below:**</b></p>
            <div style="text-align: center;"><a href="https://empireone-hris.com/confirmation/{{$data['app_id']}}" class="button">Confirmation</a></div><br>

            <p> Should you have any questions or require further information before the interview, please do not hesitate to contact our HR department at hiring@empireonegroup.com for our San Carlos Site and career@empireonegroup.com for CarCar Site.</p><br>

            <p>Warm regards,</p>
            <p>HR Team</p>
            <p><strong>EmpireOne BPO Solutions Inc.</strong></p>


        </div>
    </div>


    <div class="footer">
        <p>&copy; 2025 EmpireOne BPO Solutions Inc. | All rights reserved.</p>
    </div>
    </div>

</body>

</html>