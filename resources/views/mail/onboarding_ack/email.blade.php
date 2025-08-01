<!-- <div class="w-full flex items-center justify-center">
    <img src="/images/newlogo.png" alt="">
    ssss
</div> -->

<x-mail::message>

  # Dear Mr./Ms. {{$data['fname']}} {{$data['lname']}},

  I trust this message finds you well. We would like to express our sincere gratitude for your prompt and thorough completion of the pre-employment requirements. Your diligence in providing the necessary documentation is greatly appreciated, and it reflects your commitment to a smooth onboarding process.

  As we prepare to welcome you to our team, we want to ensure that you have all the information needed for a seamless transition. To facilitate this, we kindly invite you to review and acknowledge our company onboarding documents. These documents contain essential information about our policies, procedures, and the culture at EmpireOne.

  To access the onboarding documents, please click on the following link: https://empireone-hris.com/onboarding-documents/{{$data['app_id']}}
  
  We encourage you to carefully review each document and reach out to us if you have any questions or need further clarification. Your understanding and acknowledgment of these materials will contribute to a positive and successful onboarding experience.

  Once again, thank you for your cooperation and commitment to a successful onboarding process. We look forward to welcoming you officially to the EmpireOne family.


  Best regards,

  HR Team
  EmpireOne BPO Solutions Inc.

</x-mail::message>