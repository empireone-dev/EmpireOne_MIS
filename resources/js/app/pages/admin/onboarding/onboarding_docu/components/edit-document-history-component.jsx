import { Menu, Modal, Button, message } from "antd";
import React from "react";
import { useState } from "react";
import store from "@/app/store/store";
import { delete_onboarding_doc_thunk, get_onboarding_docu_thunk } from "../redux/onboarding-docu-thunk";

export default function EditDocumentHistoryComponent({ data, item, status }) {
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
    console.log('dataaaaaa', data);

    return (
        <>
            <Menu.Item onClick={openHandler} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title={`Edit Document History of ${data?.doc_name}`}
                centered
                open={open}
                onCancel={closeHandler}
                footer={null}
                width={1000}
            >
                <div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                            <thead class="bg-gray-100 text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 border-b">Employee ID</th>
                                    <th class="px-4 py-2 border-b">Name</th>
                                    <th class="px-4 py-2 border-b">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.edit_logs
                                    ?.slice()
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((res) => {
                                        return (
                                            <tr className="hover:bg-gray-50" key={res.id}>
                                                <td className="px-4 py-2 border-b">{res.emp_id}</td>
                                                <td className="px-4 py-2 border-b">{res?.name}</td>
                                                <td className="px-4 py-2 border-b">{res?.created_at}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </>
    );
}
