<!-- <div class="w-full flex items-center justify-center">
    <img src="/images/newlogo.png" alt="">
    ssss
</div> -->

<x-mail::message>

    # Dear Mr./Ms. {{$data['fname']}} {{$data['lname']}},

    We hope this message finds you well. Congratulations once again on your successful application for the position of I.T Staff at EmpireOne BPO Solution Inc. We are delighted to welcome you to our team.

    To facilitate the onboarding process, we kindly request you to submit the following pre-employment requirements through the provided link: https://empireone-hris.com/pre-employment/{{$data['app_id']}}?id={{$data['id']}}

    • Birth Certificate
    • SSS Form E1/SSS ID
    • TIN ID
    • Certificate of Employment from the previous employer
    • Phil Health MDR/ID
    • Photocopy of Drivers License(if applicable)
    • SSS & PAG-IBIG Loan Voucher(if applicable)
    • Marriage Certificate(if married)
    • Birth Certificates of Dependents(if Married - spouse & children; if Single - parents.)
    • Barangay Clearance with the purpose of bank application
    • Police Clearance
    • NBI Clearance
    
    ---HEALTH CERTIFICATE WITH THE FF. TESTS:---
    • Chest X-ray
    • Drug Test


    Kindly ensure that all documents are clear, legible, and uploaded in the appropriate sections. Upon receipt of your complete documentation, our HR team will proceed with the necessary verification processes. If you have any questions or encounter any difficulties during the submission process, please do not hesitate to communicate to our HR department.

    We appreciate your prompt attention to this matter, as it will help ensure a smooth and efficient onboarding experience for you. We are excited to have you as part of the EmpireOne BPO Solution Inc. family. Thank you for your cooperation.

    Best regards,

    HR Team
    EmpireOne BPO Solutions Inc.
</x-mail::message>