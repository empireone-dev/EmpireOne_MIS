import { Menu, Modal, Button, message } from "antd";
import React from "react";
import { useState } from "react";
import store from "@/app/store/store";
import { delete_onboarding_doc_thunk, get_onboarding_docu_thunk } from "../redux/onboarding-docu-thunk";

export default function RemoveDocumentComponent({ data, item, status }) {
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
            store.dispatch(delete_onboarding_doc_thunk(data.id));
            store.dispatch(get_onboarding_docu_thunk());
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Document has been removed successfully');
            closeHandler();
        } catch (error) {
            console.error("Error deleting document:", error);
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
                title="Remove Document"
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
                    <h1>Are you sure you want to remove this document?</h1>
                </div>
            </Modal>
        </>
    );
}
