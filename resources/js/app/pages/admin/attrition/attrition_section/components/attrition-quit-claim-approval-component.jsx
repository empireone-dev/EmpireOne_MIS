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
import AttritionDeclineQuitClaimComponent from "./attrition-decline-quit-claim-component";
import AttritionapproveQuitClaimComponent from "./attrition-approve-quit-claim-component";

export default function AttritionQuitClaimApprovalComponent({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);

    // const { applicants, interviewer } = useSelector(
    //     (state) => state.applicants
    // );

    console.log("daasdadta", data);

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
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Approval for Quit Claim"
                centered
                visible={statusModalOpen}
                onOk={closeModalHandler}
                onCancel={closeModalHandler}
                width={1000}
                footer={null}
            >
                <div className="w-full h-full">
                    <div>
                        <h1 className="text-xl">
                            Would you like to approve or decline the quit claim
                            uploaded by this employee?
                        </h1>
                        <div className="mt-4 flex gap-2 justify-end">
                            <AttritionapproveQuitClaimComponent
                                data={data}
                                item={item}
                                setStatusModalOpen={setStatusModalOpen}
                            />
                            <AttritionDeclineQuitClaimComponent
                                data={data}
                                item={item}
                                setStatusModalOpen={setStatusModalOpen}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
