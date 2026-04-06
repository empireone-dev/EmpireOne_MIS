import React, { useEffect, useState } from "react";
import AdminLayout from "../../admin-layout";
import moment from "moment";
import { get_cocd_acknowledge_service } from "@/app/pages/services/cocd-acknowledge-service";
import { get_handbook_acknowledge_service } from "@/app/pages/services/handbook-acknowledge-service";
import { get_ethics_acknowledge_service } from "@/app/pages/services/ethics-acknowledge-service";

const DOC_LABELS = {
    cocd: "Code of Conduct (COCD)",
    handbook: "Employee Handbook",
    ethics: "Code of Ethics",
};

const DOC_PDF_PATHS = {
    cocd: "/documents/code-of-discipline.pdf",
    handbook: "/documents/employee-handbook.pdf",
    ethics: "/documents/code-of-ethics.pdf",
};

const DOC_SERVICES = {
    cocd: get_cocd_acknowledge_service,
    handbook: get_handbook_acknowledge_service,
    ethics: get_ethics_acknowledge_service,
};

export default function Page() {
    const parts = window.location.pathname.split("/");
    // URL: /admin/acknowledgments/{doc_type}/view/{employee_id}
    const docType = parts[3];
    const employeeId = parts[5];

    const [ack, setAck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = DOC_SERVICES[docType];
        if (!fetchService || !employeeId) {
            setError("Invalid document type or employee ID.");
            setLoading(false);
            return;
        }

        fetchService(employeeId)
            .then((res) => {
                if (res?.data) {
                    setAck(res.data);
                } else {
                    setError("No acknowledgment record found for this employee.");
                }
            })
            .catch(() => setError("Failed to load acknowledgment data."))
            .finally(() => setLoading(false));
    }, [docType, employeeId]);

    return (
        <AdminLayout>
            <div className="w-full mb-10 px-4">
                <button
                    onClick={() => window.history.back()}
                    className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                {loading && (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                )}

                {!loading && error && (
                    <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center text-red-600">
                        {error}
                    </div>
                )}

                {!loading && ack && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center gap-3">
                                <img className="w-28" src="/images/newlogo.png" alt="logo" />
                            </div>
                            <div className="text-right">
                                <h2 className="text-base font-bold text-gray-800">
                                    {DOC_LABELS[docType] ?? docType}
                                </h2>
                                <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mt-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Signed &amp; Acknowledged
                                </div>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="border-b border-gray-200">
                            <iframe
                                src={DOC_PDF_PATHS[docType]}
                                title={DOC_LABELS[docType]}
                                className="w-full"
                                style={{ height: "800px" }}
                            />
                        </div>

                        {/* Signature Block */}
                        <div className="px-6 py-6 bg-gray-50">
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-4">
                                Acknowledgment Record
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">
                                        I hereby confirm that I have read and understood this document.
                                    </p>
                                    <p className="text-sm text-gray-800 font-semibold mt-2">
                                        {ack.emp_name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {moment(ack.acknowledged_at).format("MMMM D, YYYY [at] h:mm A")}
                                    </p>
                                </div>
                                <div className="border border-gray-300 rounded-lg p-3 bg-white flex flex-col items-center min-w-[180px]">
                                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">E-Signature</p>
                                    <img
                                        src={ack.signature}
                                        alt="E-Signature"
                                        className="max-h-20 max-w-[200px] object-contain"
                                    />
                                    <div className="mt-2 w-full border-t border-gray-300 pt-1 text-center">
                                        <p className="text-xs text-gray-500">{ack.emp_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
