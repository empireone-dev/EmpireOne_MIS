import WorkingExperienceSection from "@/app/pages/online_application/sections/working-experience-section";
import { store_pre_employment_file_service } from "@/app/pages/services/pre-employment-file-service";
import store from "@/app/store/store";
import { PlusSquareTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { get_applicant_by_app_id_thunk } from "../../final_rate/redux/final-rate-thunk";

export default function File201UploadReqsButtonSection() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.app);
    const { applicant } = useSelector((state) => state.final_rate);
    const { checklists } = useSelector((state) => state.checklists);
    const [fileList, setFileList] = useState([]);
    const [reqs, setReqs] = useState("");
    const app_id = window.location.pathname.split("/")[3];
    const job_offer_id = window.location.pathname.split("/")[4];
    const emp_id = applicant?.employee?.emp_id;

    const handleOk = async () => {
        setLoading(true);
        const fd = new FormData();
        fd.append("file", fileList[0].originFileObj);
        fd.append("status", "Uploaded");
        fd.append("reqs", reqs);
        fd.append("created", moment().format("YYYY-MM-DD HH:mm:ss"));
        fd.append("app_id", app_id);
        fd.append("job_offer_id", job_offer_id);
        try {
            if (fileList[0].status == "done") {
                await store_pre_employment_file_service(fd);
                await store.dispatch(get_applicant_by_app_id_thunk(app_id));
                message.success("Uploaded Successfully!");
                setOpen(false);
                setReqs("");
                setFileList([]);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    async function upload_file({ file, fileList }) {
        if (file.status === "removed") {
            setFileList([]);
        } else {
            // Set the file status to 'done' to prevent loading state
            const updatedFile = {
                ...file,
                status: "done",
            };
            setFileList([updatedFile]);
        }
    }
    const toRemove = applicant?.requirements?.map((res) => res.reqs) ?? [];
    const filteredEntries = checklists.filter(
        (entry) => !toRemove.includes(entry.reqs),
    );
    const isContract = applicant?.requirements?.find(
        (res) => res.reqs == "Contract",
    );
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UploadOutlined className="text-xl" />
                    Upload New Requirements
                </button>
            </div>
            <Modal
                confirmLoading={loading}
                title="Add Requirements"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText="Upload"
                cancelText="Cancel"
            >
                <form className="rounded-lg p-2">
                    <h1 className="text-lg font-medium leading-6 mb-3 ">
                        UPLOAD REQUIREMENTS
                    </h1>
                    <div className="mt-3 text-center sm:mt-0  sm:text-left">
                        <div className="mt-2">
                            <div className="mb-4">
                                <label htmlFor="">
                                    <b>Application ID</b>
                                </label>
                                <input
                                    name=""
                                    type="text"
                                    value={app_id ?? ""}
                                    className="border p-2 rounded  w-full"
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="">
                                    <b>Employee ID</b>
                                </label>
                                <input
                                    name=""
                                    type="text"
                                    value={emp_id ?? ""}
                                    className="border p-2 rounded  w-full"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="">
                                    <b>Document Type</b>
                                </label>
                                <select
                                    className="border p-2 rounded  w-full"
                                    onChange={(e) => setReqs(e.target.value)}
                                >
                                    {!reqs && (
                                        <option selected disabled>
                                            {" "}
                                        </option>
                                    )}
                                    {!isContract && (
                                        <option value="Contract">
                                            Employment Contract
                                        </option>
                                    )}
                                    <option value="1 Copy of 1x1 Picture White Background">
                                        1 Copy of 1x1 Picture White Background
                                    </option>
                                    <option value="1902 BIR Form">
                                        1902 BIR Form
                                    </option>
                                    <option value="1905 BIR Form">
                                        1905 BIR Form
                                    </option>
                                    <option value="2 Copies of 2x2 Picture White Background">
                                        2 Copies of 2x2 Picture White Background
                                    </option>
                                    <option value="2316 form previous employer">
                                        2316 form previous employer
                                    </option>
                                    <option value="2305 BIR Form">
                                        2305 BIR Form
                                    </option>
                                    <option value="Affidavit / Declaration">
                                        Affidavit / Declaration
                                    </option>
                                    <option value="Annexure C - NDA">
                                        Annexure C - NDA
                                    </option>
                                    <option value="Annexure D - Propriety">
                                        Annexure D - Propriety
                                    </option>
                                    <option value="Assessment and Interview Forms">
                                        Assessment and Interview Forms
                                    </option>
                                    <option value="Authorization to Deduct for Medical Examination">
                                        Authorization to Deduct for Medical
                                        Examination
                                    </option>
                                    <option value="Background Check">
                                        Background Check
                                    </option>
                                    <option value="Birth Certificate NSO Copy">
                                        Birth Certificate NSO Copy
                                    </option>
                                    <option value="Birth Certificate of Dependents">
                                        Birth Certificate of Dependents
                                    </option>
                                    <option value="Cert of Non-submission of Income Tax">
                                        Cert of Non-submission of Income Tax
                                    </option>
                                    <option value="Clearance Form">
                                        Clearance Form
                                    </option>
                                    <option value="College Diploma">
                                        College Diploma
                                    </option>
                                    <option value="COE from the most recent employer">
                                        COE from the most recent employer
                                    </option>
                                    <option value="Credit Card Information Security">
                                        Credit Card Information Security
                                    </option>
                                    <option value="Critical Work Day Memo">
                                        Critical Work Day Memo
                                    </option>
                                    <option value="Declaration and Authorization">
                                        Declaration and Authorization
                                    </option>
                                    <option value="Disciplinary Action Memos">
                                        Disciplinary Action Memos
                                    </option>
                                    <option value="Employment Contract">
                                        Employment Contract
                                    </option>
                                    <option value="Exit Interview Form">
                                        Exit Interview Form
                                    </option>
                                    <option value="HDMF MDR Form">
                                        HDMF MDR Form
                                    </option>
                                    <option value="HDMF MID Number (Photocopy of Pag-Ibig ID or Print Out)">
                                        HDMF MID Number (Photocopy of Pag-Ibig
                                        ID or Print Out)
                                    </option>
                                    <option value="High School Diploma">
                                        High School Diploma
                                    </option>
                                    <option value="ID Application Form">
                                        ID Application Form
                                    </option>
                                    <option value="ID with picture and signature">
                                        ID with picture and signature
                                    </option>
                                    <option value="Info Sheet/Application Form">
                                        Info Sheet/Application Form
                                    </option>
                                    <option value="Job Offer">Job Offer</option>
                                    <option value="Last issued COE">
                                        Last issued COE
                                    </option>
                                    <option value="Marriage Certificate">
                                        Marriage Certificate
                                    </option>
                                    <option value="Medical Examination Result">
                                        Medical Examination Result
                                    </option>
                                    <option value="NBI Clearance">
                                        NBI Clearance
                                    </option>
                                    <option value="Network Security Declaration">
                                        Network Security Declaration
                                    </option>
                                    <option value="Occupational Permit with CTC">
                                        Occupational Permit with CTC
                                    </option>
                                    <option value="Philhealth Number (Photocopy of Philhealth ID or Print Out)">
                                        Philhealth Number (Photocopy of
                                        Philhealth ID or Print Out)
                                    </option>
                                    <option value="Philhealth PMR Form">
                                        Philhealth PMR Form
                                    </option>
                                    <option value="Quit Claim Waiver">
                                        Quit Claim Waiver
                                    </option>
                                    <option value="Resignation Letter">
                                        Resignation Letter
                                    </option>
                                    <option value="Resume">Resume</option>
                                    <option value="Scorecards">
                                        Scorecards
                                    </option>
                                    <option value="Special Letters">
                                        Special Letters
                                    </option>
                                    <option value="SSS Number (Photocopy of SSS ID, E1 or Print Out)">
                                        SSS Number (Photocopy of SSS ID, E1 or
                                        Print Out)
                                    </option>
                                    <option value="Tax ID Number (Photocopy of TIN ID or 1902 duly received)">
                                        Tax ID Number (Photocopy of TIN ID or
                                        1902 duly received)
                                    </option>
                                    <option value="Transcript of Records (TOR)">
                                        Transcript of Records (TOR)
                                    </option>
                                    <option value="True Copy of Grades (TCG)">
                                        True Copy of Grades (TCG)
                                    </option>
                                </select>
                            </div>
                            {fileList.length === 0 && (
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture"
                                    method="GET"
                                    maxCount={1}
                                    onChange={upload_file}
                                    multiple={false}
                                    fileList={fileList}
                                >
                                    <Button
                                        type="primary"
                                        icon={<UploadOutlined />}
                                    >
                                        Upload Scanned Image
                                    </Button>
                                </Upload>
                            )}
                            {fileList.length > 0 && (
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture"
                                    method="GET"
                                    maxCount={1}
                                    onChange={upload_file}
                                    multiple={false}
                                    fileList={fileList}
                                    showUploadList={{
                                        showRemoveIcon: true,
                                    }}
                                />
                            )}
                            <div className="mt-3 text-zinc-400 text-sm">
                                <p>
                                    <i>
                                        Note: Requirements marked with an
                                        asterisk (*) are mandatory and must be
                                        submitted or uploaded to proceed to the
                                        next step of the application process.
                                    </i>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
