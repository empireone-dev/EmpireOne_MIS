<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Order</title>
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
      <p>Dear Mr./Ms. <b>{{$data['fname']}} {{$data['lname']}}</b>,</p>

      <p> Thank you for your interest in EmpireOne BPO Solutions Inc. We’d like to offer you the position of <b>{{$data['jobPos']}}</b>. Below is our Job Offer: .
      </p>

      <p> 1. Employment Status
        Your employment status with EmpireOne BPO Solutions Inc. will be Probationary for a period of 3 to 6 months from the start of your employment.</p>

      <p> 2. Compensation
        You shall receive a monthly salary Package of <b>Php {{$data['salary']}} {{$data['allowance'] != 0?'+ Php':''}} {{$data['allowance'] != 0?$data['allowance']:''}} {{$data['typea']??''}}</b>.</p>

      <p>3. Benefits
        13th month pay, SSS, Philhealth, HDMF (Pag-ibig), 10% Night Differential, EmpireOne points and other government mandated benefits applicable to your employment.
      </p>

      <p> 4. Employment Review
        The management will review your performance during your probationary employment and your continued employment will depend on your ability to meet all required expectation and performance set by the company.</p>

      <p>
        5. Working Schedule
        Your working schedule will be discussed with you upon the start of your employment.
      </p>

      <p>
        To accept/decline this job offer you may click on this link: <br> https://empireone-hris.com/job_offer/{{$data['app_id']}}/{{ urlencode($data['site']) }}?id={{ $data['id'] }}
      </p>

      <p>
        We expect you to follow all the policies and provisions indicated in the company Code of Conduct and Discipline of EmpireOne Global Solution Inc. which will be issued to you when you start your career with us.
      </p>

      <p>
        We are excited to welcome you in our EmpireOne BPO Solutions Inc. family! Thank you.
      </p>

      <p>
        Note: This job offer letter will be effective within 24 hours upon service and shall be deemed binding and executory upon the issuance of an employment contract.
      </p>

      <p>Truly yours,</p>
      <p>HR Team</p>
      <p><strong>EmpireOne BPO Solutions Inc.</strong></p><br><br>

      <p>Visit and follow us on our social media accounts:</p>

      <div style="text-align: center;">
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
      </div><br>
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