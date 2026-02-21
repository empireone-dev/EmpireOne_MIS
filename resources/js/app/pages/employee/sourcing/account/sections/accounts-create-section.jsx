import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import Input from "@/app/pages/_components/input";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import { PlusSquareTwoTone } from "@ant-design/icons";
import create from "@ant-design/icons/lib/components/IconFont";
import { create_account_thunk, get_account_thunk } from "@/app/pages/admin/employee_relation/employee_section/redux/account-thunk";

const AccountsCreateSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.app);
    const { users } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        acc: "",
        site: user?.site || '',
        depthead: "",
    });

    console.log('site', user?.site)

    const showModal = () => {
        setForm((prev) => ({
            ...prev,
            site: user?.site || '',
        }));
        setIsModalOpen(true);
    };
    console.log('users', users)
    const handleOk = async () => {
        setLoading(true);
        try {
            await store.dispatch(
                create_account_thunk({
                    ...form,
                })
            );
            await store.dispatch(get_account_thunk());
            message.success("Successfully Added!"); // Show success message
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            message.error("Failed to add account. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={showModal}
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white gap-1"
            >
                <PlusSquareTwoTone className='text-xl' />
                Create Account
            </button>
            <Modal
                title="Create Account"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
                okText="Save"
            >
                <div className="flex flex-col gap-4">
                    <input
                        onChange={(e) =>
                            setForm({
                                ...form,
                                site: e.target.value,
                            })
                        }
                        value={user?.site ?? ""}
                        type="hidden"
                        className="border p-2 rounded w-full"
                    />
                    <Input
                        onChange={(e) =>
                            setForm({
                                ...form,
                                acc: e.target.value,
                            })
                        }
                        required={true}
                        name="acc"
                        label="Account Name"
                        type="text"
                        value={form.acc}
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
                        <option value="">Select Department Head</option>
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
            </Modal>
        </>
    );
};

export default AccountsCreateSection;
