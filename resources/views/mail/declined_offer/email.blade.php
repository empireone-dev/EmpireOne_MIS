<x-mail::message>

    Dear HR Team,

    This is to inform that the applicant for the position of **{{$data['jobPos']}}** has **declined the job offer**. Below is the reason provided:

    Applicant Details:

    **Name:** {{$data['fname']}} {{$data['lname']}}
    **Reason:** {{$data['reas'] ?? 'No reason provided'}}

    You may consider extending a counter offer to retain the applicant's interest and potentially re-engage them in the hiring process.

    Thank you for your attention to this matter.

    Best regards,
    HR Team
    EmpireOne BPO Solutions Inc.

</x-mail::message>