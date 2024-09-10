<x-mail::message>

    # Dear {{$data['fname']}} {{$data['lname']}},

    Congratulations! We are thrilled to inform you that you have successfully passed the initial phase
    interview, and we would like to invite you to the Final Phase Interview.

    **Interview Details:**
    Date: {{ \Carbon\Carbon::parse($data['iffdate'])->format('F j, Y') }}
    Time: {{ \Carbon\Carbon::parse($data['ifftime'])->format('g:i A') }}

    During this final interview, we will delve deeper into your qualifications, experience, and the potential
    contributions you can make to our team. We encourage you to come prepared to discuss your relevant
    experience, skills, and any additional information you believe would be valuable for us to know. This
    interview serves as a platform for us to mutually determine if you are the right fit for our organization
    and if EmpireOne BPO Solutions Inc. aligns with your career goals.

    We genuinely appreciate your continued interest in becoming a part of our team, and we are looking
    forward to our upcoming conversation. This interview is an important step, and we believe it will provide

    us with a better understanding of your potential as a valuable addition to our organization.

    If you have any questions or require any additional information before the interview, please do not
    hesitate to contact our HR department at hiring@empireonegroup.com for our San Carlos Site and
    carcar@empireonegroup.com for CarCar Site.

    As part of this commitment, we invite you to explore our various social media platforms to stay updated
    on the latest news and insights about our company.

    Follow us on:

    Facebook:
    https://www.facebook.com/people/EmpireOne-Contact-Center/100089467625882/

    YouTube:
    https://www.youtube.com/@empireonecontactcenter1609

    LinkedIn:
    https://www.linkedin.com/company/empireone-contact-center-inc/?viewAsMember=true

    TikTok:
    https://www.tiktok.com/@empireonecontactcenter?_t=8h9VBrmc6xl&_r=1

    Thank you for being a valuable part of the EmpireOne BPO Solutions Inc community. We look forward to
    connecting with you across our social media channels!

    Best regards,

    HR Team
    EmpireOne BPO Solutions Inc.

</x-mail::message>