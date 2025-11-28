import React from "react";

export default function PrivacyPolicySection() {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    PRIVACY POLICY AND DATA PROTECTION CONSENT
                </h1>
            </div>

            {/* Content Section */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Data Collection Notice
                    </h3>
                    <p>
                        <span className="font-medium text-blue-700">
                            EmpireOne BPO Solutions Inc.
                        </span>{" "}
                        has obtained your personal data, resume and personally
                        identifiable information directly from you or from any
                        other third parties with whom you have shared your
                        resume for employment or engagement or from the sources
                        over internet, job portals, social media etc.
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Selection Process
                    </h3>
                    <p className="mb-4">
                        During our process of selection, your resume and other
                        personal information will be exposed to our internal
                        employees and other stakeholders who are responsible for
                        the process.
                    </p>
                    <p>
                        Post selection process you may be hired for permanent
                        employment / specific engagement/ contract employee /
                        consultant at
                        <span className="font-medium text-blue-700">
                            {" "}
                            EmpireOne BPO Solutions Inc.
                        </span>{" "}
                        or may not be found suitable for a specific role or
                        engagement.
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Data Retention Policy
                    </h3>
                    <p>
                        <span className="font-medium text-blue-700">
                            EmpireOne BPO Solutions Inc.
                        </span>{" "}
                        reserves the right of keeping your resume, personal
                        information in our database for the future employment
                        purpose as we may find it suitable.
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Data Protection Commitment
                    </h3>
                    <p>
                        We will{" "}
                        <span className="font-semibold text-green-700">
                            not
                        </span>{" "}
                        be using and sharing the data with any third party. We
                        are committed to preserving confidentiality, integrity
                        and availability of your personal data.
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Consent Requirement
                    </h3>
                    <p className="mb-4">
                        We would request you to go through the details carefully
                        and provide your consent by signing in this document.{" "}
                        <span className="font-semibold text-blue-700">
                            Without your consent we may not be able to process
                            your resume.
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-blue-700">
                            EmpireOne BPO Solutions Inc.
                        </span>{" "}
                        is abided by data protection rights of individuals and
                        you can choose to exercise your data protection rights
                        by not signing or agreeing in this document.
                    </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        Right to Rectification
                    </h3>
                    <p>
                        You have the right to rectification of inaccurate
                        personal data by providing details of corrections
                        required or latest resume by sending mail to concerned{" "}
                        <span className="font-medium text-blue-700 mr-1">
                            EmpireOne BPO Solutions Inc.
                        </span>
                        stakeholder.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                    Please read this document carefully before providing your
                    consent and agreeing to the terms outlined herein.
                </p>
            </div>
        </div>
    );
}
