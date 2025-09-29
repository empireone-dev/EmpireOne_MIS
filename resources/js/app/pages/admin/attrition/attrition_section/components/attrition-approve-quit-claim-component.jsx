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
import AttritionBankLastPayComponent from "./attrition-bank-last-pay-component";
import AttritionCheckLastPayComponent from "./attrition-check-last-pay-component";

export default function AttritionapproveQuitClaimComponent({
    data,
    item,
    setStatusModalOpen,
}) {
    const [bankDetailsModalOpen, setBankDetailsModalOpen] = useState(false);
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
            setBankDetailsModalOpen(false);
        } catch (error) {
            message.error("Failed to approve quit claim");
        } finally {
            setLoading(false);
        }
    }

    function openHandler(params) {
        setBankDetailsModalOpen(true);
    }

    function closeModalHandler() {
        setBankDetailsModalOpen(false);
        setFile(null);
        setUploadedFile(null);
        setForm({
            reason: "",
            accountName: "",
            accountNumber: "",
        });
    }
    return (
        <>
            <button
                onClick={() => openHandler(true)}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                type="button"
                disabled={loading}
            >
                Approved
            </button>
            <Modal
                title="Choose mode for last pay"
                centered
                visible={bankDetailsModalOpen}
                onOk={closeModalHandler}
                onCancel={closeModalHandler}
                width={1000}
                footer={null}
            >
                <form onSubmit={approve_quit_claim} className="w-full h-full">
                    <div className="mt-4">
                        <div className="flex flex-1 gap-4 mt-3 mb-2 py-2">
                            <div>
                                <AttritionBankLastPayComponent
                                    data={data}
                                    item={item}
                                    setStatusModalOpen={setStatusModalOpen}
                                />
                            </div>
                            <div>
                                <AttritionCheckLastPayComponent
                                    data={data}
                                    item={item}
                                    setStatusModalOpen={setStatusModalOpen}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
