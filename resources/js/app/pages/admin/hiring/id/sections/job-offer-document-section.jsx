import { Modal, Tooltip } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { FilePdfOutlined } from "@ant-design/icons";
import html2pdf from "html2pdf.js";

export default function JobOfferDocumentSection() {
    const { applicant } = useSelector((state) => state.final_rate);
    const jo_id = window.location.search.split("=")[1];
    const jo = applicant?.joboffer?.find((res) => res.id == jo_id);

    const pdfRef = useRef();

    // Helper function to clean and parse numeric values
    const parseNumericValue = (value) => {
        if (!value) return 0;
        const cleanedValue = value
            .toString()
            .replace(/,/g, "")
            .replace(/[^\d.-]/g, "");
        const parsed = parseFloat(cleanedValue);
        return isNaN(parsed) ? 0 : parsed;
    };

    const generatePDF = () => {
        const element = pdfRef.current;
        const opt = {
            margin: 0.5,
            filename: `${applicant?.fname}_${applicant?.lname}_Job_Offer.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="bg-white shadow-2xl border border-gray-300 rounded-xl p-6 h-screen w-full">
            <div className="flex justify-end w-full mb-2">
                <Tooltip title="Convert PDF format">
                    <FilePdfOutlined
                        className="text-4xl hover:text-gray-500 cursor-pointer"
                        onClick={generatePDF}
                    />
                </Tooltip>
            </div>

            <div ref={pdfRef}>
                <div className="flex items-center justify-center">
                    <img
                        className="w-60"
                        src="/images/newlogo.png"
                        alt="logo"
                    />
                </div>
                <div className="flex text-2xl items-center justify-center">
                    <h1>
                        <b>JOB OFFER</b>
                    </h1>
                </div>
                <form className="h-full px-4">
                    Name:{" "}
                    <b>
                        {applicant?.fname} {applicant?.lname}
                    </b>
                    ,<br />
                    <br />
                    Job Position: <b>{jo?.jobPos}</b>
                    <br />
                    <br />
                    1. <b>Employment Status</b>
                    <br />
                    Your employment status with EmpireOne BPO Solutions Inc.
                    will be Probationary for a period of 3 to 6 months from the
                    start of your employment.
                    <br />
                    <br />
                    2. <b>Compensation</b>
                    <br />
                    You shall receive a monthly salary of{" "}
                    <b>
                        Php&nbsp;
                        {jo?.allowance ? (
                            <>
                                {new Intl.NumberFormat("en-PH", {
                                    style: "decimal",
                                    minimumFractionDigits: 2,
                                }).format(parseNumericValue(jo?.salary))}{" "}
                                + Php&nbsp;
                                {new Intl.NumberFormat("en-PH", {
                                    style: "decimal",
                                    minimumFractionDigits: 2,
                                }).format(
                                    parseNumericValue(jo?.allowance)
                                )}{" "}
                                {jo?.typea}
                            </>
                        ) : (
                            new Intl.NumberFormat("en-PH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                            }).format(parseNumericValue(jo?.salary))
                        )}
                    </b>
                    .<br />
                    <br />
                    3. <b>Benefits</b>
                    <br />
                    13th month pay, SSS, Philhealth, HDMF (Pag-ibig), 10% Night
                    Differential, EmpireOne points and other government mandated
                    benefits applicable to your employment.
                    <br />
                    <br />
                    4. <b>Employment Review</b>
                    <br />
                    The management will review your performance during your
                    probationary employment and your continued employment will
                    depend on your ability to meet all required expectations and
                    performance set by the company.
                    <br />
                    <br />
                </form>
            </div>
        </div>
    );
}
