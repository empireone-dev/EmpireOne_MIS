<x-mail::message>

    # Dear {{$data['fname']}} {{$data['lname']}},

    I hope this message finds you well. We kindly invite you to join us for the official signing of your employment contract. The details are as follows:.

    Job Position: {{$data['jobPos']}}
    Salary: {{$data['salary']}}
    Date & Time: {{ \Carbon\Carbon::parse($data['ifftime'])->format('g:i A') }}

    Your presence at this contract signing is crucial as it signifies the formal acceptance of the terms discussed during the recruitment process.

    Should you have any questions or require further information prior to the scheduled date, please do not hesitate to contact us.

    We are excited about the prospect of you joining our team and contributing your valuable skills and expertise. We eagerly anticipate your presence at the contract signing.


    Warm regards,

    HR Team
    EmpireOne BPO Solutions Inc.

</x-mail::message>