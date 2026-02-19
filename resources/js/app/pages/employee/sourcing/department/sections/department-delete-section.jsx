import Button from "@/app/pages/_components/button";
import store from "@/app/store/store";
import React, { useState } from "react";
import {
    delete_department_thunk,
    get_department_thunk,
} from "../redux/department-thunk";
import { message, Modal } from "antd";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DepartmentDeleteSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    function delete_department() {
        store.dispatch(delete_department_thunk(data.id));
        store.dispatch(get_department_thunk());
        message.success("Deleted Successfully!");
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
                title="Remove Department"
                open={isModalOpen}
                onOk={delete_department}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <div className="flex flex-col gap-4">
                    <h1>Are you sure you want to delete Department?</h1>
                    {/* <Input
                        onChange=""
                        value=""
                        required={false}
                        name="dept"
                        label="Department Name"
                        type="text"
                    /> */}
                </div>
            </Modal>
        </div>
    );
}
