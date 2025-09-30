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
import AttritionBankLastPayComponent from "./attrition-bank-last-pay-component";
import AttritionCheckLastPayComponent from "./attrition-check-last-pay-component";

export default function AttritionapproveQuitClaimComponent({
    data,
    item,
    setStatusModalOpen,
}) {
    const [payDetailsModalOpen, setPayDetailsModalOpen] = useState(false);
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

    function openHandler(params) {
        setPayDetailsModalOpen(true);
    }

    function closeModalHandler() {
        setPayDetailsModalOpen(false);
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
                visible={payDetailsModalOpen}
                onOk={closeModalHandler}
                onCancel={closeModalHandler}
                width={1000}
                footer={null}
            >
                <div className="w-full h-full">
                    <div className="mt-4 flex flex-1 gap-4 mb-1 py-2">
                        <AttritionBankLastPayComponent
                            data={data}
                            item={item}
                            setStatusModalOpen={setStatusModalOpen}
                            setPayDetailsModalOpen={setPayDetailsModalOpen}
                        />
                        <AttritionCheckLastPayComponent
                            data={data}
                            item={item}
                            setStatusModalOpen={setStatusModalOpen}
                            setPayDetailsModalOpen={setPayDetailsModalOpen}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
