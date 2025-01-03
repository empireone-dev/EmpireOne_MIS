import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { get_department_thunk, update_department_thunk } from "../redux/department-thunk";
import Input from "@/app/pages/_components/input";
import { useSelector } from "react-redux";
import store from "@/app/store/store";

export default function DepartmentUpdateSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const { users } = useSelector((state) => state.app);

    useEffect(() => {
        setForm({
            id: data?.id,
            dept: data?.dept || "",
            depthead: data?.user?.id || "",
        })
    }, []);
    const showModal = () => {
        setIsModalOpen(true);
    };


    console.log('datsssa', data)
    async function update_department(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await store.dispatch(update_department_thunk({
                ...form,
                id: data.id
            }));
            await store.dispatch(get_department_thunk());
            message.success("Updated Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to update. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setForm({
            dept: data?.dept || "",
            depthead: data?.user?.id || "",
        });
    };

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
                <form className="w-full pb-4" onSubmit={update_department}>
                    <div className="flex flex-col gap-4">
                        <h1>Department Information</h1>
                        <Input
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    dept: e.target.value,
                                })
                            }
                            value={form?.dept}
                            name="dept"
                            label="Department's Name"
                            type="text"
                        />
                        <select
                            className="border p-2 rounded-md w-full"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    depthead: e.target.value,
                                })
                            }
                            value={form.depthead}
                        >
                            {/* <option value="">
                                {data?.user?.employee_fname ?? ''} {data?.user?.employee_lname ?? ''}
                            </option> */}
                            {Array.isArray(users) &&
                                users
                                    .filter((res) =>
                                        ["Manager", "Account Manager", 'Supervisor', "Operations Manager", "Director", "CEO", "HR Lead", "HR Manager", "I.T Manager", "Accounting Head",].includes(res.position)
                                    )
                                    .map((res) => (
                                        <option value={res.id} key={res.id}>
                                            {`${res.employee_fname} ${res.employee_lname}`}
                                        </option>
                                    ))}
                        </select>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
