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
import SendUploadQuitClaimSection from "../sections/upload-last-pay-section";

export default function AttritionCheckLastPayComponent({
    data,
    item,
    setStatusModalOpen,
    setPayDetailsModalOpen,
}) {
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        reason: "",
        accountName: "",
        accountNumber: "",
    });

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
                    accountName: form.accountName,
                    accountNumber: form.accountNumber,
                    email: data.applicant.email,
                    fname: data.applicant.fname,
                    lname: data.applicant.lname,
                    emp_id: data.applicant.emp_id,
                    app_id: data.applicant.id,
                    userId: data.applicant.userId,
                    site: data.applicant.site,
                })
            );
            await store.dispatch(get_employee_attrition_thunk());
            message.success("Quit claim approved successfully");
            setStatusModalOpen(false);
            setPayDetailsModalOpen(false);
        } catch (error) {
            message.error("Failed to approve quit claim");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={approve_quit_claim}
                className="bg-green-500 hover:bg-green-600 flex w-full text-white items-center justify-center py-2 rounded"
                type="button"
                disabled={loading}
            >
                {loading ? (
                    <span className="flex items-center">
                        <LoadingOutlined spin />
                        Processing...
                    </span>
                ) : (
                    <span className="flex items-center">
                        <CheckCircleFilled className="mr-1" />
                        Check
                    </span>
                )}
            </button>
        </>
    );
}
