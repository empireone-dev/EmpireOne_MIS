import { FilePdfOutlined } from "@ant-design/icons";
import { Menu, Modal, Tooltip } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ApplicantDetaillsComponent({ data, item }) {
    const [open, setOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Safety check for data and client-side rendering
    if (!data || !isClient) {
        return (
            <Menu.Item icon={item?.icon} disabled>
                {item?.label || "Loading..."} {!data ? "(No data available)" : ""}
            </Menu.Item>
        );
    }

    function openHandler(params) {
        setOpen(true);
    }

    const handleConvertToPDF = () => {
        try {
            const formElement = document.getElementById("form-to-pdf");

            if (!formElement) {
                console.error("Form element not found");
                return;
            }

            html2canvas(formElement, { scale: 4 }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save(`${data?.lname || 'applicant'}_${data?.fname || 'details'}.pdf`);
            }).catch((error) => {
                console.error("Error generating PDF:", error);
            });
        } catch (error) {
            console.error("Error in PDF conversion:", error);
        }
    };

    console.log('data', data)
    
    try {
        return (
            <>
                <Menu.Item onClick={() => openHandler(true)} icon={item?.icon}>
                    {item?.label}
                </Menu.Item>
                <Modal
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1200}
                    footer={null}
                    destroyOnClose={true}
                >
                <div className="flex text-2xl items-center justify-center mb-2">
                    <h1>
                        <b>APPLICATION DETAILS</b>
                    </h1>
                </div>
                <div className="flex justify-between">
                    <h1 className="text-lg mb-2">
                        <b>Status:</b> {data?.status}
                    </h1>
                    <div>
                        <Tooltip title="Convert to PDF">
                            <button onClick={handleConvertToPDF}>
                                <FilePdfOutlined className="text-4xl px-3 mb-2" />
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <form id="form-to-pdf" className="border rounded-lg p-3.5 px-7 py-6">
                    <h1 className="text-xl font-semibold mb-1 text-gray-900  text-center">Personal Information </h1>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>Application No.</b>
                        </label>
                        <input
                            type="number"
                            value={data?.app_id}
                            placeholder="N/A"
                            className="border p-2 rounded w-full h-12 mt-2"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-1 gap-4">
                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="">
                                <b>Full Name</b>
                            </label>
                            <div className="flex flex-1 gap-3">
                                <input
                                    type="text"
                                    value={data?.fname}
                                    placeholder="N/A"
                                    className="border p-2 rounded w-full h-12 mt-2"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={data?.mname}
                                    placeholder="N/A"
                                    className="border p-2 rounded w-full h-12 mt-2"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={data?.lname}
                                    placeholder="N/A"
                                    className="border p-2 rounded w-full h-12 mt-2"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={data?.suffix === "undefined" ? "--" : data?.suffix ?? ""}
                                    placeholder="(Suffix)"
                                    className="border p-2 rounded w-1/5 h-12 mt-2"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4">
                        <div className="flex w-full">
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Gender</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.gender}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full h-12 mt-2"
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Date of Birth</b>
                                    </label>
                                    <input
                                        type="date"
                                        value={data?.dob}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full h-12 mt-2"
                                        readOnly
                                    />
                                </div>
                                <div className=" w-full">
                                    <label htmlFor="">
                                        <b>Email</b>
                                    </label>
                                    <input
                                        type="email"
                                        value={data?.email}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full h-12 mt-2 "
                                        readOnly
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="">
                                        <b>Phone Number</b>
                                    </label>
                                    <input
                                        type="number"
                                        value={data?.phone}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full h-12 mt-2 "
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full">
                            <div className="flex flex-col gap-4 mb-4 w-full h-12 mt-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Marital Status</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.marital}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full h-12 mt-2 "
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Religion</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.religion}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full h-12 mt-2"
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="">
                                        <b>Nationality</b>
                                    </label>
                                    <input
                                        type="text"
                                        value={data?.nationality}
                                        placeholder="N/A"
                                        className="border p-2 rounded w-full h-12 mt-2"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>Mother's Maiden Name</b>
                        </label>
                        <input
                            type="text"
                            value={data?.mmname === "undefined" ? "--" : data?.mmname ?? ""}
                            placeholder="N/A"
                            className="border p-2 rounded w-full h-12 mt-2 "
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>Father's Full Name</b>
                        </label>
                        <input
                            type="text"
                            value={data?.ffname === "undefined" ? "--" : data?.ffname ?? ""}
                            placeholder="N/A"
                            className="border p-2 rounded w-full h-12 mt-2"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Highest Educational Attainment</b>
                            </label>
                            <input
                                type="text"
                                value={data?.educ}
                                placeholder="N/A"
                                className="border p-2 rounded w-full h-12 mt-2"
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Course Taken (Only if Applicable)</b>
                            </label>
                            <input
                                type="text"
                                value={data?.courset === "undefined" ? "--" : data?.courset ?? ""}
                                placeholder="N/A"
                                className="border p-2 rounded w-full h-12 mt-2"
                                readOnly
                            />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-5">
                        Address Information
                    </h1>
                    <div className="mb-4">
                        <label htmlFor="">
                            <b>
                                House/Lot No. , Street , Purok/Sitio , Barangay
                                , City/Municipality , Province
                            </b>
                        </label>
                        <input
                            type="text"
                            value={data?.caddress}
                            placeholder="N/A"
                            className="border p-2 rounded w-full h-12 mt-2"
                            readOnly
                        />
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-5">
                        Government ID Information
                    </h1>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>SSS No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.sss === "undefined" ? "--" : data?.sss ?? ""}
                                className="border p-2 rounded w-full h-12 mt-2"
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Pag-IBIG No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.pagibig === "undefined" ? "--" : data?.pagibig ?? ""}
                                className="border p-2 rounded w-full h-12 mt-2 "
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Tin No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.tin === "undefined" ? "--" : data?.tin ?? ""}
                                className="border p-2 rounded w-full h-12 mt-2"
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Philhealth No.</b>
                            </label>
                            <input
                                type="text"
                                value={data?.philh === "undefined" ? "--" : data?.philh ?? ""}
                                className="border p-2 rounded w-full h-12 mt-2"
                                readOnly
                            />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
                        Emergency Contact Information
                    </h1>
                    <div className="mb-4 w-full">
                        <label htmlFor="">
                            <b>Emergency Contact Fullname</b>
                        </label>
                        <input
                            type="text"
                            value={data?.ename === "undefined" ? "--" : data?.ename ?? ""}
                            placeholder="N/A"
                            className="border p-2 rounded w-full h-12 mt-2"
                            readOnly
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="">
                            <b>Address</b>
                        </label>
                        <input
                            type="text"
                            value={data?.eaddress === "undefined" ? "--" : data?.eaddress ?? ""}
                            placeholder="N/A"
                            className="border p-2 rounded w-full h-12 mt-2"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Relationship</b>
                            </label>
                            <input
                                type="text"
                                value={data?.relationship === "undefined" ? "--" : data?.relationship ?? ""}
                                placeholder="N/A"
                                className="border p-2 rounded w-full h-12 mt-2"
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="">
                                <b>Contact No.</b>
                            </label>
                            <input
                                type="number"
                                value={data?.ephone === "undefined" ? "--" : data?.ephone ?? ""}
                                placeholder="N/A"
                                className="border p-2 rounded w-full h-12 mt-2"
                                readOnly
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
    } catch (error) {
        console.error("Error rendering ApplicantDetaillsComponent:", error);
        return (
            <Menu.Item icon={item?.icon} disabled>
                {item?.label} (Error loading)
            </Menu.Item>
        );
    }
}
