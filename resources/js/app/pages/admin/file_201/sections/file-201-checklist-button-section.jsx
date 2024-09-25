import {
    CheckSquareFilled,
    CheckSquareOutlined,
    PlusSquareFilled,
    PlusSquareTwoTone,
} from "@ant-design/icons";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function File201ChecklistButtonSection() {
    const [open, setOpen] = useState(false);
    const { checklists } = useSelector((state) => state.checklists);
    const { applicant } = useSelector((state) => state.final_rate);
    const approvedRequirements = applicant?.requirements?.filter(
        (req) => req.status === "Approved"
    );

    async function send_contract_signing(params) {}

    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <CheckSquareOutlined className="text-xl" />
                    Pre Employment Checklist
                </button>
            </div>
            <Modal
                title={
                    <span className="text-xl">
                        <CheckSquareOutlined /> Pre Employment Checklist of{" "}
                        <b>
                            {applicant?.fname ?? ""} {applicant?.lname ?? ""}
                        </b>
                    </span>
                }
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={700}
                footer={null}
            >
                <form class="w-full h-full">
                    <div className="flex items-center justify-center p-3">
                        <img
                            className="w-48"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <div class="flex flex-col -mx-3 mb-6 px-2">
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
                                            className="ms-2 text-lg font-medium dark:text-gray-300"
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

                        {/* <div class="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked />
                            <label for="default-checkbox" class="ms-2 text-lg font-medium dark:text-gray-300">SSS Form E1/SSS ID * </label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label for="default-checkbox" class="ms-2 text-lg font-medium dark:text-gray-300">Certificate of Employment from the previous employer </label>
                        </div> */}
                    </div>
                </form>
                <div className="w-full">
                    <button
                        onClick={send_contract_signing}
                        className="flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md"
                    >
                        <PaperAirplaneIcon className="h-5" />
                        <div>Send Contract Signing</div>
                    </button>
                </div>
            </Modal>
        </div>
    );
}
