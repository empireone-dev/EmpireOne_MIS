<x-mail::message>

    # Dear {{$data['fname']}} {{$data['lname']}},

    I hope this message finds you well. We are delighted to inform you that we have reached the point in our agreement process where we are ready to proceed with the signing of the {{$data['jobPos']}}. Embracing the efficiency and convenience of technology, we have opted for an contract signing method utilizing a PDF document. The details are as follows:

    Job Position: {{$data['jobPos']}}
    Salary: {{$data['salary']}}

    To sign the document, follow these steps:

    1. Download and print the PDF Document Contract.
    2. Sign the printed contract.
    3. Scan and Convert the image into PDF File:
    4. Upload your signed contract to this link below:
    
    http://127.0.0.1:8000/virtual-contract/{{$data['app_id']}}

    If, for any reason, you are unable or encounter difficulties with the process, please inform us promptly. We are happy to explore alternative arrangements to accommodate your contract signing or provide assistance with the virtual contract signing process.

    We appreciate your cooperation and commitment to this process and we are excited about the prospect of you joining our team and contributing your valuable skills and expertise. Our goal is to facilitate a seamless and secure signing experience as we formalize our partnership. We are confident that this approach will enhance the overall efficiency and effectiveness of our collaboration.

    In preparation for the virtual contract signing, Attached here is the PDF document for Contract Signing.

    Thank you for your attention to this matter, and we look forward to a successful contract signing.

    Warm regards,

    HR Team
    EmpireOne BPO Solutions Inc.

</x-mail::message>