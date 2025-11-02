import store from "@/app/store/store";
import { LoadingOutlined } from "@ant-design/icons";
import { Menu, message, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { get_applicant_thunk, update_applicant_status_thunk } from "../applicant_records/redux/applicant-thunk";

export default function ApplicantPoolingComponent({ data, item }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    function openHandler(params) {
        setOpen(true);
    }

    async function for_pooling(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                update_applicant_status_thunk({
                    ...data,
                    status: "Pooling"
                })
            );
            store.dispatch(get_applicant_thunk());
            setLoading(false);
            setOpen(false);
            message.success("Applicant successfully added for Pooling");
        } catch (error) {
            message.error("Failed to add applicant for Pooling!");
            setLoading(false);
        }
    }
    return (
        <div>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title=""
                centered
                visible={open}
                width={900}
                onOk={() => {
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <form onSubmit={for_pooling} className="w-full h-full">
                    <div className="mt-3 text-lg font-sans">
                        <b>Are you sure you want to add this applicant for Pooling?</b>
                    </div>
                    <div className="flex gap-2 items-center justify-end">
                        <button type="button" className="bg-slate-300 hover:bg-slate-200 px-4 py-1 rounded-md" onClick={() => setOpen(false)}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-5 py-1 rounded-md text-white ${loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            disabled={loading}
                        >
                            {loading ? <LoadingOutlined /> : "Yes"}
                        </button>
                    </div>

                </form>
            </Modal>
        </div>
    );
}
