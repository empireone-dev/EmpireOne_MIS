import { Menu, Modal, QRCode } from "antd";
import React from "react";
import { useState } from "react";

export default function GenerateQrComponent({ data, item }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    function openHandler(params) {
        // setOpen(true);
        window.open(`/admin/file_201/${data.app_id}`, "_blank");
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log("data", data);
    return (
        <>
            <Menu.Item
                // onClick={() => openHandler(true)}
                onClick={showModal}
                icon={item.icon}
            >
                {item.label}
            </Menu.Item>
            <Modal
                footer={false}
                title={`${data?.applicant?.fname} ${data?.applicant?.lname}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex w-full justify-center">
                    <div className="relative">
                        <QRCode
                            value={`${data?.applicant?.fname} ${data?.applicant?.lname}`}
                            size={256} // Adjust size here
                            level="H" // High error correction level
                            includeMargin={true}
                            icon='/images/e-logo.jpeg'
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
