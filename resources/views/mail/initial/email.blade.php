<x-mail::message>

    # Dear {{$data['fname']}} {{$data['lname']}},

    We appreciate your interest in joining our team at EmpireOne BPO Solutions Inc. It is with great pleasure that we inform you of your selection for the initial phase interview.

    **Interview Details:**
    Date: {{ \Carbon\Carbon::parse($data['iffdate'])->format('F j, Y') }}
    Time: {{ \Carbon\Carbon::parse($data['ifftime'])->format('g:i A') }}

    To ensure a smooth start to the interview process, we kindly request that you arrive a few minutes early. During this interview, we will have the opportunity to discuss your qualifications, experience, and how your skills align with the requirements of the position you applied for.

    We are genuinely excited to get to know you better and learn more about the unique contributions you can make to our team.

    We eagerly anticipate meeting you and delving further into your application. Thank you for considering EmpireOne BPO Solutions Inc. as your potential employer. We look forward to this next step in the selection process.

    Should you have any questions or require further information before the interview, please do not hesitate to contact our HR department at hiring@empireonegroup.com for our San Carlos Site and carcar@empireonegroup.com for CarCar Site.

    Warm regards,

    HR Team
    EmpireOne BPO Solutions Inc.

</x-mail::message>