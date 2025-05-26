<x-mail::message>

    Dear HR Team,

    We would like to inform you that the following applicant has declined their attendance for the scheduled interview:

    Name: {{ $data['fname'] }} {{ $data['lname'] }}
    Reason for Declining: {{ $data['reason'] }}


    Please take note and update the applicant's status accordingly.

    Thank you.

</x-mail::message>