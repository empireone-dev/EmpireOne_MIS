<!-- <div class="w-full flex items-center justify-center">
    <img src="/images/newlogo.png" alt="">
    ssss
</div> -->

<x-mail::message>

  Dear HR Team,

  A new applicant has submitted their application for review. Please find the details below:

  Applicant Details:

  Name: {{$data['fname']}} {{$data['lname']}}
  
  Position Applied For: Sample Position

  Submission Date: {{$data['submitted']}}

  Email: {{$data['email']}}
  
  Phone Number: {{$data['phone']}}

  Please review the application and proceed with the next steps as necessary.

  The CV file is attached for your reference.

</x-mail::message>