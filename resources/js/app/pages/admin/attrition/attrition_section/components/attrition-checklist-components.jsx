import { CheckSquareOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import React, { useState } from "react";

export default function AttritionChecklistComponents({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    function openHandler(params) {
        setStatusModalOpen(true);
    }

    console.log("data", data);

    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title={
                    <span className="text-xl">
                        <CheckSquareOutlined /> Offboarding Documents Checklist
                        of{" "}
                        <p className="font-bold inline">
                            {data?.applicant?.fname ?? ""}{" "}
                            {data?.applicant?.lname ?? ""}
                        </p>
                    </span>
                }
                centered
                open={statusModalOpen}
                onCancel={() => setStatusModalOpen(false)}
                width={700}
                footer={null}
            >
                <form className="w-full h-full">
                    <div className="flex flex-col -mx-3 mb-2 px-2 mt-10">
                        <div>
                            <div
                                className="flex items-center mb-4"
                                // key={i}
                            >
                                <input
                                    // id={`checkbox-${i}`}
                                    type="checkbox"
                                    // value={res.reqs}
                                    // checked={approvedRequirements?.some(
                                    //     (req) => req.reqs == res.reqs
                                    // )}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    // htmlFor={`checkbox-${i}`}
                                    className="ms-2 text-lg font-medium "
                                >
                                    Last Pay Payment
                                </label>
                            </div>
                            <div
                                className="flex items-center mb-4"
                                // key={i}
                            >
                                <input
                                    // id={`checkbox-${i}`}
                                    type="checkbox"
                                    // value={res.reqs}
                                    // checked={approvedRequirements?.some(
                                    //     (req) => req.reqs == res.reqs
                                    // )}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    // htmlFor={`checkbox-${i}`}
                                    className="ms-2 text-lg font-medium "
                                >
                                    2316 File
                                </label>
                            </div>
                            <div
                                className="flex items-center mb-4"
                                // key={i}
                            >
                                <input
                                    // id={`checkbox-${i}`}
                                    type="checkbox"
                                    // value={res.reqs}
                                    // checked={approvedRequirements?.some(
                                    //     (req) => req.reqs == res.reqs
                                    // )}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label
                                    // htmlFor={`checkbox-${i}`}
                                    className="ms-2 text-lg font-medium "
                                >
                                    COE (Certificate of Employment)
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
