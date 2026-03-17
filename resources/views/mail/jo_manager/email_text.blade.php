Dear {{ ($data['gender'] ?? 'Male') == 'Male' ? 'Mr.' : 'Ms.' }} {{ $data['lname'] }},

We are pleased to make you an offer of employment with EmpireOne BPO Solutions, Inc.

Please find attached your official job offer letter with all terms and conditions.

Position: {{ $data['jobPos'] }}
Total Compensation: PHP {{ number_format($data['salary']) }}{{ $data['allowance'] != 0 ? ' + PHP ' . number_format($data['allowance']) . ' ' . ($data['typea'] ?? '') : '' }}
Start Date: {{ date('F j, Y', strtotime('+4 days')) }}

To accept or decline this offer, please visit:
https://empireone-hris.com/job_offer/{{ $data['app_id'] }}/{{ urlencode($data['site']) }}?id={{ $data['id'] }}

For any concerns, please contact the HR through the Talent Acquisition Team at careers@empireonegroup.com.

We look forward to having you on board with Team EmpireOne!

Very truly yours,

CHRISTI ANN SANCHEZ
Talent Acquisition Manager
EmpireOne BPO Solutions, Inc.

---
© 2025 EmpireOne BPO Solutions Inc. | All rights reserved.
