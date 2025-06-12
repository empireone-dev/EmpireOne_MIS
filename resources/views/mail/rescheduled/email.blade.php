<x-mail::message>

    Dear HR Team,

    We would like to inform you that the following applicant has declined their scheduled interview:

    **Name:** {{ $data['fname'] }} {{ $data['lname'] }}
    **Reason for Declining:** {{ $data['reason'] }}

    The applicant has also expressed interest in being rescheduled for another interview.

    Kindly take note of this update and adjust the applicant's status accordingly.

    Thank you for your attention.

</x-mail::message>