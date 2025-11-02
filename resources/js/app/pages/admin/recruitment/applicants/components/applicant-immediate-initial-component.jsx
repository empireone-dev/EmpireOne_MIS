import { Menu, Modal, Button } from "antd";
import React from "react";
import { useState } from "react";
import store from "@/app/store/store";
import { get_applicant_thunk, proceed_initial_immediate_thunk } from "../applicant_records/redux/applicant-thunk";

export default function ApplicantImmediateInitialComponent({ data, item, status }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function openHandler() {
        setOpen(true);
    }

    function closeHandler() {
        setOpen(false);
    }

    async function handleProceed() {
        setLoading(true);
        try {
            store.dispatch(proceed_initial_immediate_thunk(data));
            store.dispatch(get_applicant_thunk());
            await new Promise(resolve => setTimeout(resolve, 1000));
            closeHandler();
        } catch (error) {
            console.error("Error proceeding with interview:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Menu.Item onClick={openHandler} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Proceed Immediately"
                centered
                open={open}
                onCancel={closeHandler}
                footer={[
                    <Button key="cancel" onClick={closeHandler}>
                        Cancel
                    </Button>,
                    <Button
                        key="proceed"
                        type="primary"
                        loading={loading}
                        onClick={handleProceed}
                    >
                        Proceed
                    </Button>
                ]}
            >
                <div className="flex flex-col gap-4 mb-7">
                    <h1>Are you sure you want to proceed with the initial interview immediately?</h1>
                    {data && (
                        <div className="text-sm text-gray-600">
                            <p><strong>Applicant:</strong> {(data.fname || data.lname) ? `${data.fname ?? ''} ${data.lname ?? ''}`.trim() : 'N/A'}</p>
                            <p><strong>Status:</strong> {data.status || 'N/A'}</p>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
