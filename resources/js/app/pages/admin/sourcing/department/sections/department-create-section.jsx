import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import Input from "@/app/pages/_components/input";
import store from "@/app/store/store";
import {
    create_department_thunk,
    get_department_thunk,
} from "../redux/department-thunk";
import { useSelector } from "react-redux";
import { PlusSquareTwoTone } from "@ant-design/icons";

const DepartmentCreateSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.app);
    const { users } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        dept: "",
        depthead: "",
        site: "",
    });

    const showModal = () => {
        setForm((prev) => ({
            ...prev,
        }));
        setIsModalOpen(true);
    };
    console.log("users", users);
    const handleOk = async () => {
        setLoading(true);
        try {
            await store.dispatch(
                create_department_thunk({
                    ...form,
                }),
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
            <button
                type="button"
                onClick={showModal}
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white gap-1"
            >
                <PlusSquareTwoTone className="text-xl" />
                Create Department
            </button>
            <Modal
                title="Create Department"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
                okText="Save"
            >
                <div className="flex flex-col gap-4">
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
                        <option value="" disabled>
                            Select Department Head
                        </option>
                        {users
                            .filter(
                                (res) =>
                                    (!user?.site ||
                                        res.site === user.site ||
                                        !res.site) &&
                                    [
                                        "Manager",
                                        "Account Manager",
                                        "Supervisor",
                                        "Director",
                                        "CEO",
                                        "HR Lead",
                                        "TQA Manager",
                                        "TQA Director",
                                        "IT Manager",
                                        "I.T Manager",
                                        "IT Lead",
                                        "Compliance Officer",
                                        "Site Admin",
                                        "Talent Acquisition Manager",
                                        "HR Director",
                                        "Director of Operations",
                                        "Operations Manager",
                                        "Site Director",
                                        "Site Manager",
                                        "Director, Learning Leadership & Development",
                                        "Director, Accounting & Finance",
                                        "Director, Marketing & Communications",
                                        "Director, Quality & Training",
                                    ].includes(res.position),
                            )
                            .sort((a, b) => {
                                const nameA =
                                    `${a.employee_fname} ${a.employee_lname}`.toLowerCase();
                                const nameB =
                                    `${b.employee_fname} ${b.employee_lname}`.toLowerCase();
                                return nameA.localeCompare(nameB);
                            })
                            .map((res) => (
                                <option key={res.id} value={res.id}>
                                    {res.employee_fname} {res.employee_lname}
                                </option>
                            ))}
                    </select>
                    <select
                        className="border p-2 rounded-md w-full"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                site: e.target.value,
                            })
                        }
                        value={form.site}
                    >
                        <option value="" disabled>
                            Select Site
                        </option>
                        <option value="San Carlos">San Carlos</option>
                        <option value="Carcar">Carcar</option>
                        <option value="Cebu">Cebu</option>
                    </select>
                </div>
            </Modal>
        </>
    );
};

export default DepartmentCreateSection;
