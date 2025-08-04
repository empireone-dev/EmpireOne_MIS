import React, { useState, useEffect } from "react";
import { message, Modal } from "antd";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Input from "@/app/pages/_components/input";
import { useSelector } from "react-redux";
import store from "@/app/store/store";
import { get_account_thunk, update_account_thunk } from "../../../employee_relation/employee_section/redux/account-thunk";

export default function AccountsUpdateSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const { users } = useSelector((state) => state.app);

    useEffect(() => {
        setForm({
            id: data?.id,
            acc: data?.acc || "",
            depthead: data?.user?.id || "",
        })
    }, []);
    const showModal = () => {
        setIsModalOpen(true);
    };


    console.log('datsssa', data)
    async function update_account(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await store.dispatch(update_account_thunk({
                ...form,
                id: data.id
            }));
            await store.dispatch(get_account_thunk());
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
                title="Edit Account"
                open={isModalOpen}
                onOk={update_account}
                onCancel={handleCancel}
                confirmLoading={loading}
                okText="Update"
            >
                <form className="w-full pb-4" onSubmit={update_account}>
                    <div className="flex flex-col gap-4">
                        <h1>Account Information</h1>
                        <Input
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    acc: e.target.value,
                                })
                            }
                            value={form?.acc}
                            name="acc"
                            label="Account Name"
                            type="text"
                        />
                        {/* <select
                            className="border p-2 rounded-md w-full"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    depthead: e.target.value,
                                })
                            }
                            value={form.depthead}
                        >
                            <option value="">
                                {data?.user?.employee_fname ?? ''} {data?.user?.employee_lname ?? ''}
                            </option>
                            {Array.isArray(users) && users
                                .filter((res) =>
                                    [
                                        "Manager",
                                        "Account Manager",
                                        "Supervisor",
                                        "Operations Manager",
                                        "Director",
                                        "CEO",
                                        "HR Lead",
                                        "HR Manager",
                                        "I.T Manager",
                                        "Accounting Head",
                                    ].includes(res.position)
                                )
                                .sort((a, b) => a.employee_fname.localeCompare(b.employee_fname))
                                .map((res) => (
                                    <option value={res.id} key={res.id}>
                                        {`${res.employee_fname} ${res.employee_lname}`}
                                    </option>
                                ))}
                        </select> */}
                    </div>
                </form>
            </Modal>
        </div>
    );
}
