import React, { useState } from "react";
import { Modal } from "antd";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { get_department_thunk } from "../redux/department-thunk";
import Input from "@/app/pages/_components/input";

export default function DepartmentUpdateSection(data) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    function update_department() {
        // store.dispatch(update_department_thunk(data.id));
        store.dispatch(get_department_thunk());
        message.success("Updated Successfully!");
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log("data", data);
    return (
        <div>
            <button
                type="button"
                onClick={showModal}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-2 py-2 text-center"
            >
                <PencilSquareIcon className="h-6" />
            </button>
            <Modal
                title="Edit Department"
                open={isModalOpen}
                onOk={update_department}
                onCancel={handleCancel}
                confirmLoading={loading}
                okText="Update"
            >
                <div className="flex flex-col gap-4">
                    <h1>Department Information</h1>
                    <Input
                        onChange={(e) =>
                            setForm({
                                ...form,
                                dept: e.target.value,
                            })
                        }
                        value={data?.data?.dept}
                        name="dept"
                        label="Department's Name"
                        type="text"
                    />
                    <select
                        // onChange={(event) => data_handler(event)}
                        name="depthead"
                        className="border p-2 rounded w-full"
                    >
                        <option disabled selected>
                            &nbsp; {data?.data?.depthead}
                        </option>
                        <option> </option>
                    </select>
                </div>
            </Modal>
        </div>
    );
}
