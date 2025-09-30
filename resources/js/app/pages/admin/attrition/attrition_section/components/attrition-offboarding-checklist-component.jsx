import {
    CheckCircleFilled,
    InboxOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { Menu, message, Modal } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import {
    send_last_pay_thunk,
    send_offboarding_checklist_thunk,
    send_quit_claim_thunk,
    upload_exit_clearance_thunk,
} from "../redux/employee-attrition-thunk";
import store from "@/app/store/store";
import UploadCoeSection from "../sections/upload-coe-section";
import Upload2316Section from "../sections/upload-2316-section";
import UploadLastPaySection from "../sections/upload-last-pay-section";

export default function AttritionOffboardingChecklistComponent({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFile2, setUploadedFile2] = useState(null);
    const [uploadedFile3, setUploadedFile3] = useState(null);
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);

    // const { applicants, interviewer } = useSelector(
    //     (state) => state.applicants
    // );

    console.log("daasdadta", data);

    async function send_offboarding_checklist(e) {
        e.preventDefault();

        // Validate that a file is selected
        if (!file) {
            message.error(
                "Please select a file before sending the quit claim."
            );
            return;
        }

        setLoading(true);
        const fd = new FormData();
        fd.append("file", file);
        fd.append("file2", file2);
        fd.append("file3", file3);
        // fd.append('phase_status', 'virtual_contract_signing');
        // fd.append('jobPos', jo?.jobPos);
        // fd.append('salary', jo?.salary);
        fd.append("app_id", data?.applicant?.app_id);
        fd.append("emp_id", data?.employee?.emp_id);
        fd.append("fname", data?.applicant?.fname);
        fd.append("lname", data?.applicant?.lname);
        fd.append("email", data?.applicant?.email);
        // fd.append('job_offer_id', jo?.id);

        try {
            await store.dispatch(send_offboarding_checklist_thunk(fd));
            setLoading(false);
            setFile(null);
            setFile2(null);
            setFile3(null);
            setUploadedFile(null);
            setUploadedFile2(null);
            setUploadedFile3(null);
            setStatusModalOpen(false);
            message.success("Email sent successfully with attachment");
        } catch (error) {
            console.error("Error sending quit claim:", error);
            const errorMessage =
                error.response?.data?.error ||
                "There was an error sending the email!";
            message.error(errorMessage);
            setLoading(false);
        }
    }
    function openHandler(params) {
        setStatusModalOpen(true);
    }

    function closeModalHandler() {
        setStatusModalOpen(false);
        setFile(null);
        setFile2(null);
        setFile3(null);
        setUploadedFile1(null);
        setUploadedFile2(null);
        setUploadedFile3(null);
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Send Last Pay Proof"
                centered
                visible={statusModalOpen}
                onOk={closeModalHandler}
                onCancel={closeModalHandler}
                width={1000}
                footer={null}
            >
                <form class="w-full h-full">
                    <div class="flex flex-col -mx-3 mb-2">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Employee No.
                            </label>
                            <input
                                class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                value={data?.emp_id}
                                readOnly
                            />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Employee's Name
                            </label>
                            <input
                                class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                value={`${data?.applicant?.fname} ${data?.applicant?.mname} ${data?.applicant?.lname}`}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1 ">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    job Position
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.position}
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Department
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.dept}
                                    readOnly
                                />
                            </div>
                            {/* <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.account} readOnly />
                            </div> */}
                        </div>

                        <div className="flex flex-1">
                            {/* <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Supervisor
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.sup_id} readOnly />
                            </div> */}
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    EOGS Email
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="email"
                                    value={data?.eogs}
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Employment Status
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="email"
                                    value={data?.status}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Hired Date
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.hired}
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Separation Date
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.separation}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Reason for Separation
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.reas}
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Reason for End of Contract
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.reas}
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Exit Interview & Clearance Status
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.estatus}
                                    readOnly
                                />
                            </div>
                        </div>
                        <UploadLastPaySection
                            setFile={setFile}
                            uploadedFile={uploadedFile}
                            setUploadedFile={setUploadedFile}
                        />
                        <Upload2316Section
                            setFile={setFile2}
                            uploadedFile={uploadedFile2}
                            setUploadedFile={setUploadedFile2}
                        />
                        <UploadCoeSection
                            setFile={setFile3}
                            uploadedFile={uploadedFile3}
                            setUploadedFile={setUploadedFile3}
                        />
                        <div className="flex justify-end space-x-2 px-3 mt-1">
                            <button
                                type="submit"
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${
                                    loading
                                        ? "cursor-not-allowed opacity-75"
                                        : ""
                                }`}
                                onClick={send_offboarding_checklist}
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoadingOutlined spin />
                                ) : (
                                    <CheckCircleFilled />
                                )}
                                {loading
                                    ? " PROCESSING..."
                                    : " SEND OFFBOARDING CHECKLIST"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
