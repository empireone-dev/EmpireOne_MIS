import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PrintCOEContentSection() {
    const { employee } = useSelector((store) => store.employees);
    const certificateRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            generatePDF();
        }, 500); // Increased timeout to ensure content is loaded

        return () => clearTimeout(timer);
    }, [employee]);

    const generatePDF = async () => {
        if (!employee || !certificateRef.current) return;

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                windowWidth: certificateRef.current.scrollWidth,
            });

            const imgData = canvas.toDataURL('image/png');

            // Convert canvas height to match PDF width (scale proportionally)
            const imgProps = {
                width: pdfWidth,
                height: (canvas.height * pdfWidth) / canvas.width
            };

            let position = 0;

            // First page
            pdf.addImage(imgData, 'PNG', 0, position, imgProps.width, imgProps.height);
            let heightLeft = imgProps.height - pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgProps.height;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgProps.width, imgProps.height);
                heightLeft -= pdfHeight;
            }

            const fileName = `COE_${employee?.applicant?.fname}_${employee?.applicant?.lname}_${moment().format('YYYY-MM-DD')}.pdf`;
            pdf.save(fileName);

            setTimeout(() => {
                window.close();
            }, 500);
        } catch (error) {
            console.error('Error generating PDF:', error);
            window.print();
        }
    };


    function get_province() {
        if (employee?.applicant?.site == "San Carlos") {
            return "Negros Occidental";
        } else if (employee?.applicant?.site == "Carcar") {
            return "Cebu";
        }
    }

    console.log('employee', employee)
    return (
        <div>
            <div className="mt-7" ref={certificateRef}>
                <div
                    className="pt-5"
                    style={{
                        width: "1330px", // A4 width at 96 DPI
                        minHeight: "2000px", // A4 height at 96 DPI
                        margin: "0 auto",
                        backgroundColor: "#fff"
                    }}
                >

                    <header >
                        <div className="flex items-center justify-center">
                            <img
                                className="w-96"
                                src="/images/newlogo.png"
                                alt="EmpireOne BPO"
                                crossOrigin="anonymous"
                            />
                        </div>
                    </header>

                    <div>
                        <h3 className="text-center text-4xl mt-5 text-bold text-sky-500 mb-5">
                            <b>CERTIFICATE OF EMPLOYMENT</b>
                        </h3>
                        <hr />
                        <div className="mt-5 text-3xl" style={{ textAlign: "justify" }}>
                            <p className="mb-5">
                                This is to certify that{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                    {employee?.applicant?.fname}{" "}
                                    {employee?.applicant?.mname}{" "}
                                    {employee?.applicant?.lname}
                                </b>{" "}
                                has been employed with EmpireOne BPO Solutions
                                Inc. from <b>{moment(employee?.hired).format("LL") ?? ""}</b>{" "}
                                {employee?.attrition ? (
                                    <>
                                        to{" "}
                                        <b>
                                            {" "}
                                            {moment(
                                                employee?.attrition?.separation
                                            ).format("LL") ?? ""}
                                        </b>
                                    </>
                                ) : (
                                    ", and remains employed today."
                                )}
                            </p>
                            <br />

                            <p className="mb-5">
                                This certificate is issued at the request of the
                                aforementioned individual for any legal purpose
                                that may serve him/her best.
                            </p>
                            <br />

                            <ul>
                                <li>
                                    <b>Job Title:</b>{" "}
                                    <i>{employee?.position}</i>
                                </li>
                                <li>
                                    <b>Department:</b> <i>{employee?.dept?.dept}</i>
                                </li>
                                <li>
                                    <b>Employee ID:</b>{" "}
                                    <i>{employee?.emp_id}</i>
                                </li>
                            </ul>
                            <br />

                            <p className="mb-5">
                                If you have any further questions or require
                                additional information, please contact us at
                                hr@empireonegs.com and schr@empireonegroup.com.
                            </p>
                            <br />

                            <p className="mb-5">
                                Given this <b>{moment().format("Do")}</b> day of{" "}
                                <b>{moment().format("MMMM YYYY")}</b> at{" "}
                                <b>
                                    {employee?.applicant?.site} City,{" "}
                                    {get_province()}, Philippines.
                                </b>
                            </p>
                            <br />
                            <br />
                            <br />

                            {employee?.applicant?.site === "Carcar" && (
                                <footer>
                                    <p className="text-bold mb-6">Approved By:</p>
                                    <br />
                                    <br />
                                    <p className="text-bold">
                                        Genevieve Lapuz
                                        <br />
                                        HR Lead
                                    </p>
                                </footer>
                            )}

                            {employee?.applicant?.site === "San Carlos" && (
                                <footer>
                                    <p className="text-bold mb-3">Approved By:</p>
                                    <br />
                                    <br />
                                    <p className="text-bold">
                                        Apple Lorraine Mag-usara
                                        <br />
                                        HR Lead
                                    </p>
                                </footer>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}