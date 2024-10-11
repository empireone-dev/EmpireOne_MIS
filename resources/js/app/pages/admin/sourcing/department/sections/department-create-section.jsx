import React, { useState } from "react";
import { Button, Modal } from "antd";
import Input from "@/app/pages/_components/input";
import store from "@/app/store/store";
import { create_department_thunk } from "../redux/department-thunk";

const DepartmentCreateSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        // setIsModalOpen(false);
        setLoading(true);
        try {
            await store.dispatch(create_department_thunk(form));
            setLoading(false);
            setIsModalOpen(false);
        } catch (error) {
            setLoading(false);
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
