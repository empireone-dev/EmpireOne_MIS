import Button from "@/app/pages/_components/button";
import store from "@/app/store/store";
import React, { useState } from "react";
import { message, Modal } from "antd";
import { TrashIcon } from "@heroicons/react/24/outline";
import { delete_account_thunk, get_account_thunk } from "../../../employee_relation/employee_section/redux/account-thunk";

export default function AccountsDeleteSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    function delete_account() {
        store.dispatch(delete_account_thunk(data.id));
        store.dispatch(get_account_thunk());
        message.success("Deleted Successfully!");
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <button
                type="button"
                onClick={showModal}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-2 py-2 text-center"
            >
                <TrashIcon className="h-6" />
            </button>
            <Modal
                title="Remove Account"
                open={isModalOpen}
                onOk={delete_account}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <div className="flex flex-col gap-4">
                    <h1>Are you sure you want to delete Account?</h1>
                    {/* <Input
                        onChange=""
                        value=""
                        required={false}
                        name="acc"
                        label="Account Name"
                        type="text"
                    /> */}
                </div>
            </Modal>
        </div>
    );
}
