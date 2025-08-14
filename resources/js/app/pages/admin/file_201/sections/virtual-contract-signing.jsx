import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React from "react";
import { useState } from "react";
import SendUploadContractSection from "./send-upload-contract-section";
import store from "@/app/store/store";
import { sendiv_contract_email_thunk, sendiv_email_thunk } from "../../recruitment/applicants/applicant_records/redux/applicant-thunk";

export default function VirtualContractSigning({ data, setOpen }) {
    const [openVirtualSigning, setVirtualSigningOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);

    const jo = data?.joboffer?.find((res) => res.status == "Contract Signing");
    // const { applicants, interviewer } = useSelector(
    //     (state) => state.applicants
    // );

    async function send_virtual_signing(e) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('phase_status', 'virtual_contract_signing');
        fd.append('jobPos', jo?.jobPos);
        fd.append('salary', jo?.salary);
        fd.append('app_id', data?.app_id);
        fd.append('fname', data?.fname);
        fd.append('lname', data?.lname);
        fd.append('email', data?.email);
        fd.append('email', data?.email);
        fd.append('job_offer_id', jo?.id);

        try {
            await store.dispatch(
                sendiv_contract_email_thunk(fd)
            );
            setLoading(false);
            setVirtualSigningOpen(false);
            message.success("Email sent successfully");
        } catch (error) {
            message.error("There was an error sending the email!");
            setLoading(false);
        }
    }
    return (
        <div className="flex w-full items-center justify-center">
            <button
                onClick={() => {
                    setVirtualSigningOpen(true);
                    setOpen(false);
                }}
                className="bg-blue-500 w-full rounded-md text-white hover:bg-blue-600 p-1.5"
            >
                Virtual Contract Signing
            </button>
            <Modal
                title={`Contract Signing (Virtual Contract Signing)`}
                centered
                visible={openVirtualSigning}
                width={900}
                onOk={() => {
                    setVirtualSigningOpen(false);
                }}
                onCancel={() => setVirtualSigningOpen(false)}
                footer={null}
            >
                <li className="bg-gray-300 h-0.5 mb-3"></li>
                <form onSubmit={send_virtual_signing} className="w-full h-full">
                    <div className="flex flex-col -mx-3 mb-3">
                        <div className="w-full px-2.5">
                            <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1"
                                for="grid-text"
                            >
                                Application No.
                            </label>
                            <input
                                value={data?.app_id}
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="number"
                                placeholder=""
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Applicant's Name
                                </label>
                                <input
                                    value={`${data.fname} ${data.mname} ${data.lname}`}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 ">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Email Address
                                </label>
                                <input
                                    value={data?.email}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="email"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Job Position
                                </label>
                                <input
                                    value={jo?.jobPos}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1 ">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Salary
                                </label>
                                <input
                                    value={jo?.salary}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Allowance
                                </label>
                                <input
                                    value={jo?.allowance}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* <div className="w-full px-2.5">
                            <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                {status} Interviewer
                            </label>
                            <select
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name=""
                                id=""
                            >
                                {interviewer?.map((res, i) => {
                                    return (
                                        <option
                                            value={res?.employee_id}
                                            key={i}
                                        >
                                            {res?.employee_fname}{" "}
                                            {res?.employee_lname}
                                        </option>
                                    );
                                })}
                            </select>
                        </div> */}
                    </div>
                    <SendUploadContractSection
                        setFile={setFile}
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                    />
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                            }`}
                        onClick={send_virtual_signing}
                        disabled={loading}
                    >
                        {loading ? (
                            <LoadingOutlined spin />
                        ) : (
                            <CheckCircleFilled />
                        )}
                        {loading ? " SENDING..." : " CONFIRM"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
