<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Job Offer Letter</title>
    <style>
        @page {
            margin: 20px 25px;
            size: A4;
        }

        body {
            font-family: DejaVu Sans, Arial, sans-serif;
            font-size: 12px;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.4;
        }

        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 0;
        }

        .content {
            line-height: 1.5;
        }

        .header-info {
            margin-bottom: 20px;
        }

        .section {
            margin-bottom: 15px;
        }

        .signature-section {
            margin-top: 25px;
            margin-bottom: 20px;
        }

        .annexure {
            page-break-before: always;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #ccc;
        }

        .center {
            text-align: center;
        }

        .underline {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 150px;
            margin-bottom: 5px;
        }

        .bold {
            font-weight: bold;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 10px;
            color: #777;
        }

        .logo {
            max-width: 200px;
            height: auto;
            display: block;
            margin: 0 auto 20px auto;
        }

        .logo-fallback {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            margin: 0 auto 20px auto;
            padding: 20px 0;
        }

        p {
            margin: 8px 0;
        }

        h3 {
            margin: 15px 0 10px 0;
        }

        strong {
            font-weight: bold;
        }

        .compensation-table {
            margin-left: 40px;
            line-height: 1.6;
        }

        .compensation-item {
            display: block;
            margin: 4px 0;
        }

        .compensation-label {
            display: inline-block;
            width: 200px;
            font-weight: bold;
        }

        .compensation-value {
            display: inline-block;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="content">
            <div class="center">
                <!-- Option 2: If you have a new logo URL, replace the src below -->
                <div style="text-align: center;"><img src="images/newlogo.png" alt="EmpireOne Logo" style="max-width: 200px;"></div>
            </div>

            <div class="header-info">
                <strong>DATE:</strong> {{ date('F j, Y') }}<br>
                <strong>NAME:</strong> {{strtoupper($data['fname'])}} {{strtoupper($data['lname'])}}<br>
                <strong>HOME ADDRESS:</strong> {{$data['address'] ?? 'Philippines'}}
            </div>

            <div class="section">
                <p>Dear {{($data['gender'] ?? 'Male') == 'Male' ? 'Mr.' : 'Ms.'}} {{$data['lname']}},</p>
                <p>We are pleased to make you an offer of employment with us and this letter sets forth the terms of appointment:</p>
            </div>

            <div class="section">
                <div class="compensation-item">
                    <span class="compensation-label">Designation:</span>
                    <span class="compensation-value">{{$data['jobPos']}}</span>
                </div>
                <div class="compensation-item">
                    <span class="compensation-label">Company:</span>
                    <span class="compensation-value">EmpireOne BPO Solutions, Inc.</span>
                </div>
                <div class="compensation-item">
                    <span class="compensation-label">Place of Posting:</span>
                    <span class="compensation-value">Any EmpireOne office as business requires</span>
                </div>
                <div class="compensation-item">
                    <span class="compensation-label">Date of Joining:</span>
                    <span class="compensation-value">{{ date('F j, Y', strtotime('+4 days')) }}</span>
                </div>
                <div class="compensation-item">
                    <span class="compensation-label">Compensation and Benefits:</span>
                    <span class="compensation-value"></span>
                </div>
                <div class="compensation-item">
                    <span class="compensation-label">Annual Fixed Pay:</span>
                    <span class="compensation-value"></span>
                </div>
                <div class="compensation-item">
                    <span class="compensation-label">Night Shift Differential:</span>
                    <span class="compensation-value">10%</span>
                </div>
                <div class="compensation-item">
                    <span class="compensation-label">Total Compensation (TC):</span>
                    <span class="compensation-value">PHP {{number_format($data['salary'])}}{{$data['allowance'] != 0 ? ' + PHP ' . number_format($data['allowance']) . ' ' . ($data['typea'] ?? '') : ''}}</span>
                </div>
            </div>

            <div class="section">
                <p><strong>Background Checks/ Pre-employment Medical Check-up/ Critical/ Requirements</strong></p>
                <p>Your appointment is subject to the background check clearance in all aspects, any discrepancies in the background/ pre-employment medical check-up will lead to withdrawal of the offer. Non-completion of background check within 60 days from the date of hire may lead to revocation of employment offer. TA will let you know of the final status of your check once it is completed.</p>

                <p>Your Start Date will be dependent once you have completed and submitted the following pre-employment requirements:</p>
                <p>• SSS Number (E-4/1902/1905/2316)<br>
                    • Tax Identification Number (TIN)<br>
                    • Philhealth Identification Number (PIN)<br>
                    • Pag Ibig Number (HDMF Number)<br>
                    • NBI/police Clearance<br>
                    • Medical Exam results</p>
            </div>

            <div class="section">
                <p><strong>Confidentiality</strong></p>
                <p>You are requested to maintain confidentiality on all aspects of the letter at all times. You shall not divulge, communicate or pass on any information regarding the company, its business, customers, work practices and security practices to any outsider or any external vendor or contractor employed by the Company.</p>
            </div>

            <div class="section">
                <p><strong>Notice Period</strong></p>
                <p>The Employee may terminate his/her employment only after serving the Employer a written notice duly received by the Employer not less than 30 days prior to the actual date of resignation., otherwise, the Employee shall be liable for whatever legal damages the Employer may sustain on account of non-observance of the period stated herein, and shall mean that the Employees agrees to forfeit any salary dude to him/her for such period and thereby authorize the deductions in favor of the Company.</p>

                <p>The Employer also reserves the right to undertake such action or institute a case necessary for the recovery of the liquidated damages and any amount which the employer may be entitled to under the law. Similarly, EmpireOne may, at any time terminate your employment on the account of just cause and authorized cause.</p>
            </div>

            <div class="section">
                <p><strong>Probation Period</strong></p>
                <p>Employee will join the team on a probationary employment status for a period of six (6) months. His/her skills, performance, and competence will be evaluated based on the standards of the Company, which will determine your qualification for regularization or otherwise. The management of Company shall have full right to rescind this employment contract at any time with due cause in accordance with the labor code and in accordance with due process. If employee fails the required pre-employment processes, employment will be discontinued and the Company shall pay worked days only.</p>
            </div>

            <div class="section">
                <p><strong>Cause for Termination</strong></p>
                <p>A willful failure by the employee to substantially perform his/her duties and responsibilities, breach of company policies and Code of Ethics and Business Conduct and the commission by the employee of theft, fraud, breach of trust or any material act of dishonesty involving the Company and its affiliates.</p>
            </div>

            <div class="section">
                <p><strong>Sharing of this information will result in withdrawal of your Offer Letter</strong><br>
                    A detail Employment Contract/ Appointment Letter will be issued as you have joined the Organization<br>
                    The Annexure I needs to be accepted and signed along with this Offer Letter</p>
            </div>

            <div class="section">
                <p>Please report to any HR personnel for your orientation and on-boarding procedures, submission of requirements and for the formalization of Employment Contract once you qualify for the position. For any concerns, please contact the HR through the Talent Acquisition Team at careers@empireonegroup.com.</p>

                <p><strong>Note that this is NOT the actual employment contract and should never be considered as such. Nor should it be used as a replacement for your actual employment contract with EmpireOne. Your actual employment contract will be served to you upon the commencement of your employment with the Company.</strong></p>
            </div>

            <p>We look forward to having you on board with Team EmpireOne!</p>

            <div class="signature-section">
                <p>Very truly yours,</p>
                <br>
                <p><strong>CHRISTI ANN SANCHEZ</strong><br>
                    Talent Acquisition Manager</p>
            </div><br>

            <div class="signature-section">
                <p>I hereby accept the above offer on the terms and conditions outlined.</p>
                <p><span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                    Signature over Printed Name / Date</p>
            </div>

            <div class="annexure">
                <h3 class="center bold">ANNEXURE I</h3>
                <h3 class="center bold">SCHEDULE OF BENEFITS</h3>

                <p><strong>Service Incentive Leave</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;upon regularization at 0.42 (5.04 days annually)<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Conversion every February of the following year</p>

                <p><strong>Government Mandated Benefits</strong>&nbsp;&nbsp;&nbsp;&nbsp;as applicable</p>

                <p><strong>Medical Benefits</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;effective period of coverage is upon hire</p>

                <p><strong>Hospitalization</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Room and Board: Regular Private<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maximum Benefit Limit: 100,000</p>

                <p><strong>Dental</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Included in the HMO Plan</p>

                <p><strong>Dependent</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Entitled to 1 free dependent</p>

                <p><strong>Allowances</strong></p>

                <p><strong>Note:</strong></p>
                <p>All benefits are subject to annual review and may be amended, abrogated, modified, rescinded/reinstated by the Company from time to time<br>
                    All Philippines government mandated benefits will be provided as applicable</p>

                <div class="signature-section">
                    <p>I hereby accept the above schedule of benefits on the terms and conditions outlined.</p>
                    <br>
                    <p>Name: <span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                        Signature: <span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                        Date: <span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                </div>
            </div>

            <div class="annexure">
                <h3 class="center bold">Annexure II</h3>
                <h3 class="center bold">PERSONAL INFORMATION AS REQUIRED UNDER DATA PRIVACY ACT 2012 (RA10173)</h3>

                <p>I confirm that I am voluntarily sharing my personal information with EmpireOne's duly authorized representative for the following purposes:</p>

                <p>• Validating my Curriculum Vitae and retaining records on the same for any future reference / verification<br>
                    • Processing my job application including background verification check and medical checks<br>
                    • Employment-related actions including record keeping, processing compensation and benefits and any action required in the context of my employment with EmpireOne</p>

                <p>In this context, I also agree to the retention of such Personal Information by EmpireOne for any future reference/ verification and authorize EmpireOne to transfer the same to a third party.</p>

                <p>I understand the Personal Information means any information relating to me that is available with EmpireOne and is capable of identifying me.</p>

                <div class="signature-section">
                    <p>Name: <span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                        Signature: <span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
                        Date: <span class="underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                </div>
            </div>

        </div>
    </div>
</body>

</html>