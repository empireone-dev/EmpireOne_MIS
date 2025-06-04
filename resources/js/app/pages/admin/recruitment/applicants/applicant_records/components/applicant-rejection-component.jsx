import { FilePdfOutlined, LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Menu, message, Modal, Tooltip } from "antd";
import React from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import store from "@/app/store/store";
import { router } from "@inertiajs/react";
import { get_applicant_thunk, send_rejection_email_thunk } from "../redux/applicant-thunk";

export default function ApplicantRejectionComponent({ data, item }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function openHandler(params) {
        setOpen(true);
    }


    async function send_rejection_email(e) {
        e.preventDefault();
        setLoading(true);
        await store.dispatch(send_rejection_email_thunk(data));
        await store.dispatch(get_applicant_thunk());
        await message.success('Email sent successfully');
        router.visit('/admin/recruitment/applicant_records?searching=' + app_id)
            (() => setLoading(false));
        (() => setOpen(false));
    }

    console.log('data', data)
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                visible={open}
                centered
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1200}
                footer={null}
            >
                <form onSubmit={send_rejection_email} className="">
                    <div className="mt-2 py-3">
                        <div className="text-xl">
                            Confirm Send Rejection Email to <b>{data.fname} {data.mname} {data.lname}</b>
                        </div>
                        <div className="flex gap-2 mt-1 items-center justify-end">
                            <div>
                                <button type="button" onClick={() => setOpen(false)} className=" hover:bg-gray-400 rounded-md p-2 px-8">Cancel</button>
                            </div>
                            <div>
                                <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-400 text-white rounded-md p-2 px-8">
                                    {loading ? (
                                        <LoadingOutlined spin />
                                    ) : (
                                        <SendOutlined />
                                    )}
                                    {loading ? " Sending..." : " Send"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
