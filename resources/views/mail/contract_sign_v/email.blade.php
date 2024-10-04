<x-mail::message>

    Dear {{$data['fname']}} {{$data['lname']}},

    I hope this message finds you well. After a thorough review, we regret to inform you that the contract for the position of {{$data['jobPos']}} has been declined due to the following reason(s):

    Reason: {{$data['decline_reason'] ?? 'Blurred Contract'}}

    In light of this, we kindly request that you re-upload the corrected or signed contract document to proceed with the next steps in the process. Please follow the instructions below:

    Download and print the PDF Document Contract.
    Sign the printed contract.
    Scan and ensure the document is clear and legible.
    Convert the scanned file into PDF format.
    Upload the new version of the signed contract to the link below:
    Re-upload Link

    If you encounter any issues or require assistance during this process, please do not hesitate to reach out. We are committed to providing support to ensure a smooth and successful contract submission.

    Thank you for your prompt attention to this matter. We are eager to move forward once the corrected document is received and we remain enthusiastic about the opportunity to have you join our team.

    Warm regards,
    HR Team
    EmpireOne BPO Solutions Inc

</x-mail::message>