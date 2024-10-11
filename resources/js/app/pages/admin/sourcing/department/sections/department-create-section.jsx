import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import Input from "@/app/pages/_components/input";
import store from "@/app/store/store";
import {
    create_department_thunk,
    get_department_thunk,
} from "../redux/department-thunk";

const DepartmentCreateSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        try {
            await store.dispatch(create_department_thunk(form));
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
                    />
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
        </>
    );
};
export default DepartmentCreateSection;
