import {
    CheckCircleOutlined,
    CheckSquareFilled,
    CheckSquareOutlined,
    FormOutlined,
    PlusSquareFilled,
    PlusSquareTwoTone,
} from "@ant-design/icons";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PhysicalCOntractSigning from "./physical-contract-signing";
import VirtualContractSigning from "./virtual-contract-signing";
import OnboardingAcknowledgeSection from "./onboarding-acknowledge-section";

export default function File201ChecklistButtonSection({ data }) {
    const [openChecklistModal, setOpenChecklistModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const { checklists } = useSelector((state) => state.checklists);
    const { applicant } = useSelector((state) => state.final_rate);
    const approvedRequirements = applicant?.requirements?.filter(
        (req) => req.status === "Approved"
    );

    console.log("applicant", applicant);
    async function send_contract_signing() {
        // Trigger any logic to send the contract signing
        setOpenConfirmationModal(true);
        setOpenChecklistModal(false);
    }
    const url = window.location.pathname + window.location.search;
    function getQueryParam(url, param) {
        const queryString = url.split("?")[1]; // Get the query string
        if (!queryString) return null; // Return null if no query string

        const params = new URLSearchParams(queryString); // Create a URLSearchParams object
        return params.get(param); // Get the value of the specified parameter
    }

    // Get the search status
    const status = getQueryParam(url, "status");

    console.log("status", status);
    return (
        <div className="my-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpenChecklistModal(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1"
                >
                    <CheckSquareOutlined className="text-xl" />
                    Pre Employment Checklist
                </button>
            </div>

            {/* Checklist Modal */}
            <Modal
                title={
                    <span className="text-xl">
                        <CheckSquareOutlined /> Pre Employment Checklist of{" "}
                        <p className="font-bold inline">
                            {applicant?.fname ?? ""} {applicant?.lname ?? ""}
                        </p>
                    </span>
                }
                centered
                open={openChecklistModal}
                onCancel={() => setOpenChecklistModal(false)}
                width={700}
                footer={null}
            >
                <form className="w-full h-full">
                    <div className="flex items-center justify-center p-3">
                        <img
                            className="w-48"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <div className="flex flex-col -mx-3 mb-2 px-2">
                        <div>
                            {checklists
                                .filter((res) => res.site === "San Carlos")
                                .map((res, i) => (
                                    <div
                                        className="flex items-center mb-4"
                                        key={i}
                                    >
                                        <input
                                            id={`checkbox-${i}`}
                                            type="checkbox"
                                            value={res.reqs}
                                            checked={approvedRequirements?.some(
                                                (req) => req.reqs == res.reqs
                                            )}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label
                                            htmlFor={`checkbox-${i}`}
                                            className="ms-2 text-lg font-medium "
                                        >
                                            {res.reqs}{" "}
                                            {res.remarks === "Yes" && (
                                                <span className="text-red-500 text-xl">
                                                    *
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    </div>
                </form>
                {/* <div className="w-full">
                    {status == "Accepted" && (
                        <OnboardingAcknowledgeSection data={data} setOpen={setOpenChecklistModal} />
                    )}
                    {status == "Contract Signing" && (
                        <button
                            onClick={send_contract_signing}
                            className="flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md"
                        >
                            <FormOutlined />
                            <div>Contract Signing</div>
                        </button>
                    )}
                    {status == "Signed" && (
                        <div className=" text-slate-500 text-md">
                            <i>Contract signing completed.</i>
                        </div>
                    )}
                </div> */}
            </Modal>
        </div>
    );
}
