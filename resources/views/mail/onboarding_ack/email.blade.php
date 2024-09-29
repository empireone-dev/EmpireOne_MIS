<!-- <div class="w-full flex items-center justify-center">
    <img src="/images/newlogo.png" alt="">
    ssss
</div> -->

<x-mail::message>

  # Dear Mr./Ms. {{$data['fname']}} {{$data['lname']}},

  Thank you for your interest in EmpireOne BPO Solutions Inc. We’d like to offer you the position of {{$data['jobPos']}}. Below is our Job Offer: .

  1. Employment Status
  Your Employment Status is Probationary upon the start of your employment with EmpireOne Global Solution Inc.

  2. Compensation
  You shall receive a monthly salary Package of Php {{$data['salary']}} {{$data['allowance'] != 0?'+ Php':''}} {{$data['allowance'] != 0?$data['allowance']:''}} {{$data['typea']??''}}.

  3. Benefits
  13th month pay, SSS, Philhealth, HDMF (Pag-ibig), 10% Night Differential, EmpireOne points and other government mandated benefits applicable to your employment.

  4. Employment Review
  The management will review your performance during your probationary employment and your continued employment will depend on your ability to meet all required expectation and performance set by the company.

  5. Working Schedule
  Your working schedule is for 9 hours every weekday during which one (1) hour is allotted for lunch break and weekdays for restdays.

  To accept/decline this job offer you may click on this link: http://127.0.0.1:8000/job_offer/{{$data['app_id']}}?id={{$data['id']}} EmpireOne BPO Solutions Inc - Job Offer

  We expect you to follow all the policies and provisions indicated in the company Code of Conduct and Discipline of EmpireOne Global Solution Inc. which will be issued to you when you start your career with us.

  We are excited to welcome you in our EmpireOne BPO Solutions Inc. family! Thank you.

  Note: This job offer letter will be effective within 24 hours upon service and shall be deemed binding and executory upon the issuance of an employment contract.


  Truly yours,

  HR Team
  EmpireOne BPO Solutions Inc.

</x-mail::message>