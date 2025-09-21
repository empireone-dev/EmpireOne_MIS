<x-mail::message>

    Dear HR Team,

    We would like to inform you that the following applicant has confirmed their attendance for the Final Interview:

    👤 Name: {{ $data['fname'] }} {{ $data['lname'] }}
    🆔 Application ID: {{ $data['app_id'] }}
    📆 Interview Date and Time: {{ \Carbon\Carbon::parse($data['iffdate'])->format('F j, Y') }} {{ \Carbon\Carbon::parse($data['ifftime'])->format('g:i A') }}
    
    Please ensure the necessary preparations are made for the scheduled interview. Thank you!

</x-mail::message>