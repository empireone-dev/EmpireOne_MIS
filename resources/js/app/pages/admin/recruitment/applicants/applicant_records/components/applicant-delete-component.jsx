import { Menu, Modal, Button, message } from "antd";
import React from "react";
import { useState } from "react";
import ApplicantChooseInterviewComponent from "./applicant-choose-interview-component";
import store from "@/app/store/store";
import { delete_applicant_thunk, get_applicant_thunk, proceed_initial_immediate_thunk } from "../redux/applicant-thunk";

export default function ApplicantDeleteComponent({ data, item, status }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function openHandler() {
        setOpen(true);
    }

    function closeHandler() {
        setOpen(false);
    }

    async function handleDelete() {
        setLoading(true);
        try {
            store.dispatch(delete_applicant_thunk(data.id));
            store.dispatch(get_applicant_thunk());
            message.success('Applicant has been deleted successfully');
            await new Promise(resolve => setTimeout(resolve, 1000));
            closeHandler();
        } catch (error) {
            console.error("Error Deleting Applicant:", error);
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
                title="Delete Applicant"
                centered
                open={open}
                onCancel={closeHandler}
                footer={[
                    <Button key="cancel" onClick={closeHandler}>
                        Cancel
                    </Button>,
                    <Button
                        key="delete"
                        type="primary"
                        loading={loading}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                ]}
            >
                <div className="flex flex-col gap-4 mb-7">
                    <h1 className="text-lg font-semibold">Are you sure you want to delete this applicant?</h1>
                    {data && (
                        <div className="text-sm text-gray-600">
                            <p><strong>Name:</strong> {(data.fname || data.lname) ? `${data.fname ?? ''} ${data.lname ?? ''}`.trim() : 'N/A'}</p>
                            <p><strong>Status:</strong> {data.status || 'N/A'}</p>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
