<!-- <div class="w-full flex items-center justify-center">
    <img src="/images/newlogo.png" alt="">
    ssss
</div> -->

<x-mail::message>

  Dear HR Team,

  An applicant named **{{$data['fname']}} {{$data['lname']}}** has uploaded **{{$data['reqs']}}** for your review.

  Kindly review the submitted file and proceed with the necessary next steps in the pre-employment process. Thank you!

</x-mail::message>