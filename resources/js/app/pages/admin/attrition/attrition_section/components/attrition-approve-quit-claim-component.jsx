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
                title="Account Details for Last Pay"
                centered
                visible={bankDetailsModalOpen}
                onOk={closeModalHandler}
                onCancel={closeModalHandler}
                width={1000}
                footer={null}
            >
                <form onSubmit={approve_quit_claim} className="w-full h-full">
                    <div>
                        {/* <textarea
                            className="w-full h-28"
                            name="reason"
                            id="reason"
                            // value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please enter the reason for declining the quit claim..."
                        ></textarea> */}
                        <div className="w-full mt-5">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Account Name:
                            </label>
                            <input
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="account-name"
                                type="text"
                                value={form.accountName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        accountName: e.target.value,
                                    })
                                }
                                placeholder="Enter account name"
                                required
                            />
                        </div>
                        <div className="w-full mt-5">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Account Number:
                            </label>
                            <input
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="account-number"
                                type="text"
                                value={form.accountNumber}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        accountNumber: e.target.value,
                                    })
                                }
                                placeholder="Enter account number"
                                required
                            />
                        </div>
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
