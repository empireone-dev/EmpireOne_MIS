<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Onboarding acknowledgment</title>
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

      <p> I trust this message finds you well. We would like to express our sincere gratitude for your prompt and thorough completion of the pre-employment requirements. Your diligence in providing the necessary documentation is greatly appreciated, and it reflects your commitment to a smooth onboarding process.
      </p>

      <p> As we prepare to welcome you to our team, we want to ensure that you have all the information needed for a seamless transition. To facilitate this, we kindly invite you to review and acknowledge our company onboarding documents. These documents contain essential information about our policies, procedures, and the culture at EmpireOne.</p>

      <p><b>**To access the onboarding documents, please click the button below:.**</b></p>
      <div style="text-align: center;"><a href="https://empireone-hris.com/onboarding-documents/{{$data['app_id']}}/{{$data['id']}}"
          style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
          target="_blank">
          Onboarding Documents
        </a>
      </div><br>

      <p>We encourage you to carefully review each document and reach out to us if you have any questions or need further clarification. Your understanding and acknowledgment of these materials will contribute to a positive and successful onboarding experience.
      </p>

      <p>Once again, thank you for your cooperation and commitment to a successful onboarding process. We look forward to welcoming you officially to the EmpireOne family.
      </p>

      <p>Best regards,</p>
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