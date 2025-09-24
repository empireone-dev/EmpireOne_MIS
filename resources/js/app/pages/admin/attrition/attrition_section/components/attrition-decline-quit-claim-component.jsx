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

export default function AttritionDeclineQuitClaimComponent({
    data,
    item,
    setStatusModalOpen,
}) {
    const [reasonModalOpen, setReasonModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [reason, setReason] = useState("");

    // const { applicants, interviewer } = useSelector(
    //     (state) => state.applicants
    // );

    console.log("daasdadta", data);

    async function decline_quit_claim(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                decline_quit_claim_thunk({
                    ...data,
                    status: "Declined",
                    email: data.applicant.email,
                    fname: data.applicant.fname,
                    lname: data.applicant.lname,
                    reason: reason,
                })
            );
            await store.dispatch(get_employee_attrition_thunk());
            message.success("Quit claim has been declined");
            setStatusModalOpen(false);
            setReasonModalOpen(false);
        } catch (error) {
            message.error("Failed to decline quit claim");
        } finally {
            setLoading(false);
        }
    }

    function openHandler(params) {
        setReasonModalOpen(true);
    }

    function closeModalHandler() {
        setReasonModalOpen(false);
        setFile(null);
        setUploadedFile(null);
        setReason("");
    }
    return (
        <>
            <button
                onClick={() => openHandler(true)}
                className="bg-red-500 text-white px-4 py-2 rounded"
                type="button"
            >
                Declined
            </button>
            <Modal
                title="Reason for Declining Quit Claim"
                centered
                visible={reasonModalOpen}
                onOk={closeModalHandler}
                onCancel={closeModalHandler}
                width={1000}
                footer={null}
            >
                <form onSubmit={decline_quit_claim} className="w-full h-full">
                    <div>
                        <textarea
                            className="w-full h-28"
                            name="reason"
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please enter the reason for declining the quit claim..."
                        ></textarea>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <LoadingOutlined className="mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
