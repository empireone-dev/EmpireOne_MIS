import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import Input from "@/app/pages/_components/input";
import store from "@/app/store/store";
import {
    create_department_thunk,
    get_department_thunk,
} from "../redux/department-thunk";
import { useSelector } from "react-redux";

const DepartmentCreateSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.app);
    const { users } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        dept: "",
        depthead: "",
        site: user?.site || '',
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
                create_department_thunk({
                    ...form,
                })
            );
            await store.dispatch(get_department_thunk());
            message.success("Successfully Added!"); // Show success message
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            message.error("Failed to add department. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Department
            </Button>
            <Modal
                title="Create Department"
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
                                dept: e.target.value,
                            })
                        }
                        required={false}
                        name="dept"
                        label="Department Name"
                        type="text"
                        value={form.dept}
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
                        <option value="">Select Department Head</option>
                        {Array.isArray(users) && users
                            .filter((res) =>
                                ["Manager", "Account Manager", 'Supervisor', "Operations Manager", "Director", "CEO"].includes(res.position)
                            )
                            .map((res) => (
                                <option value={res.id} key={res.id}>
                                    {`${res.employee_fname} ${res.employee_lname}`}
                                </option>
                            ))}
                    </select>

                </div>
            </Modal>
        </>
    );
};

export default DepartmentCreateSection;
