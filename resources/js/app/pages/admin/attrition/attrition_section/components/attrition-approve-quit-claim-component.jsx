import {
    CheckCircleFilled,
    InboxOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { Menu, message, Modal } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useState } from "react";
import {
    approve_quit_claim_thunk,
    decline_quit_claim_thunk,
    get_employee_attrition_thunk,
    send_last_pay_thunk,
    send_quit_claim_thunk,
    upload_exit_clearance_thunk,
} from "../redux/employee-attrition-thunk";
import store from "@/app/store/store";
import SendUploadQuitClaimSection from "../sections/send-upload-quit-claim-section";

export default function AttritionapproveQuitClaimComponent({
    data,
    item,
    setStatusModalOpen,
}) {
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);

    // const { applicants, interviewer } = useSelector(
    //     (state) => state.applicants
    // );

    console.log("daasdadta", data);

    async function approve_quit_claim(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                approve_quit_claim_thunk({
                    ...data,
                    status: "Approved",
                })
            );
            await store.dispatch(get_employee_attrition_thunk());
            message.success("Quit claim approved successfully");
            setStatusModalOpen(false);
        } catch (error) {
            message.error("Failed to approve quit claim");
        } finally {
            setLoading(false);
        }
    }

    function openHandler(params) {
        setStatusModalOpen(true);
    }

    function closeModalHandler() {
        setStatusModalOpen(false);
        setFile(null);
        setUploadedFile(null);
    }
    return (
        <>
            <button
                onClick={approve_quit_claim}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                type="button"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <LoadingOutlined className="mr-2" />
                        Processing...
                    </>
                ) : (
                    "Approved"
                )}
            </button>
        </>
    );
}
