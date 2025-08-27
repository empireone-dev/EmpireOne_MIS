import SummernoteEditor from "@/app/pages/_components/summernote-editor2";
import { App, Button, Spin } from "antd";
import { FilePdfOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";

export default function ViewDocumentSection() {
    const { onboarding_ackdoc, signature } = useSelector(
        (state) => state.onboarding_ackdocs
    );
    const { applicant } = useSelector((state) => state.final_rate);
    const { onboarding_doc } = useSelector((state) => state.onboarding_docs);

    const [pdfLoading, setPdfLoading] = useState(false);
    const documentRef = useRef(null);

    // Check if document is loading
    const isDocumentLoading = !onboarding_doc?.data?.doc_content;

    // Get the e-signature
    const eSignature = signature;

    // Build document content + signature
    const getDocumentContentWithSignature = () => {
        let content = onboarding_doc?.data?.doc_content ?? "";

        // Clean unwanted backgrounds/colors
        content = content.replace(/background-color:[^;"]+;?/gi, "");
        content = content.replace(/background:[^;"]+;?/gi, "");
        content = content.replace(/bgcolor="[^"]*"/gi, "");

        if (signature) {
            const signatureHtml = `
               <div style="
    display: block; 
    text-align: left; 
    margin: 40px 0; 
    page-break-inside: avoid; 
    break-inside: avoid; 
">
    <img 
        src="${signature}" 
        alt="Electronic Signature" 
        style="max-width: 400px; max-height: 180px; margin-left: 50px; display: block"
        loading="eager"
    />
    <div style="border-top: 1px solid #000; padding-top: 6px; text-transform: uppercase; letter-spacing: 1px; width: 300px; ">
    <div style="align-items: center; justify-content: center; display: flex; font-weight: bold; font-size: 12px; color: #000;">
    ${
        [applicant?.fname, applicant?.lname]
            .filter(Boolean)
            .join(" ")
            .toUpperCase() || "NO NAME PROVIDED"
    }
    </div>
    </div>
</div>

            `;
            content += signatureHtml;
        }

        return content;
    };

    const handleDownloadPDF = async () => {
        const element = documentRef.current;
        setPdfLoading(true);

        const opt = {
            margin: 0.5,
            filename: `${
                onboarding_doc?.data?.doc_name ?? "No Document Title"
            } (${applicant?.lname}).pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };

        await html2pdf().set(opt).from(element).save();
        setPdfLoading(false);
    };

    return (
        <div>
            {isDocumentLoading ? (
                <div className="bg-white p-8 shadow-sm border rounded-lg flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{ fontSize: 48 }}
                                    spin
                                />
                            }
                            size="large"
                        />
                        <div className="mt-4 text-lg text-gray-600">
                            Loading document...
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-24 py-20 bg-gray-200">
                    <div className="mb-3 flex justify-end items-center">
                        <Button
                            type="primary"
                            icon={<FilePdfOutlined />}
                            onClick={handleDownloadPDF}
                            loading={pdfLoading}
                            disabled={isDocumentLoading}
                            size="large"
                            className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                        >
                            {pdfLoading ? "Generating PDF..." : "Download PDF"}
                        </Button>
                    </div>
                    <div
                        ref={documentRef}
                        className="p-4 bg-white rounded-lg"
                        // style={{
                        //     width: "100%",
                        //     maxWidth: "none",
                        //     minHeight: "auto",
                        //     height: "auto",
                        // }}
                    >
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {onboarding_doc?.data?.doc_name ??
                                    "No Document Title"}
                            </h1>
                        </div>

                        {/* Document Content */}
                        <div
                            className="document-content"
                            dangerouslySetInnerHTML={{
                                __html: getDocumentContentWithSignature(),
                            }}
                            // style={{
                            //     fontFamily: "Arial, sans-serif",
                            //     lineHeight: "1.6",
                            //     color: "#333",
                            //     fontSize: "14px",
                            //     width: "100%",
                            //     wordWrap: "break-word",
                            //     overflow: "visible",
                            //     display: "block",
                            //     background: "white",
                            // }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
