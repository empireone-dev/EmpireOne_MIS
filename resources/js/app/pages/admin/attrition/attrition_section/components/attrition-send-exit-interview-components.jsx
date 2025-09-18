import {
    CheckCircleFilled,
    CheckSquareOutlined,
    LoadingOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { Menu, message, Modal } from "antd";
import React, { useState } from "react";
import {
    get_employee_attrition_thunk,
    send_exit_interview_thunk,
} from "../redux/employee-attrition-thunk";
import store from "@/app/store/store";
import { use } from "react";
import { useSelect } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function AttritionSendExitInterviewComponents({ data, item }) {
    const { user } = useSelector((state) => state.app);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function openHandler(params) {
        setStatusModalOpen(true);
    }

    function closeHandler() {
        setStatusModalOpen(false);
    }

    console.log("user", user);

    async function handleSendExitInterview(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                send_exit_interview_thunk({ data, userId: user?.id })
            );
            // store.dispatch(get_employee_attrition_thunk());
            message.success("Exit interview sent successfully");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            closeHandler();
        } catch (error) {
            console.error("Error proceeding with interview:", error);
            message.error("Failed to send exit interview");
        } finally {
            setLoading(false);
        }
    }

    console.log("data", data);

    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title={
                    <span className="text-md">
                        <i>
                            Send Exit Interview for{" "}
                            <p className="font-bold inline">
                                {data?.applicant?.fname ?? ""}{" "}
                                {data?.applicant?.lname ?? ""}
                            </p>
                        </i>
                    </span>
                }
                centered
                open={statusModalOpen}
                onCancel={() => setStatusModalOpen(false)}
                width={700}
                footer={null}
            >
                <form
                    onSubmit={handleSendExitInterview}
                    className="w-full h-full"
                >
                    <div className="flex flex-col -mx-3 mb-2 px-2 mt-6">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Are you sure you want to send this employee an
                                exit interview?
                            </h1>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-2">
                            <button
                                type="button"
                                onClick={closeHandler}
                                className="mt-4 bg-gray-300 text-black py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
                                    loading
                                        ? "cursor-not-allowed opacity-75"
                                        : ""
                                }`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoadingOutlined spin />
                                ) : (
                                    <SendOutlined />
                                )}
                                {loading ? " SENDING..." : " CONFIRM"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
