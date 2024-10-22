import { EditFilled, EditOutlined } from '@ant-design/icons';
import { PencilIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';
import { Input, Menu, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'

export default function UpdateEmployeeComponent({ data, item }) {

    const [modalOpen, setModalOpen] = useState(false);
    function openHandler(params) {
        router.visit(`/admin/employee_relation/employee_section/update_employee/${data.app_id}`);
    }

    console.log('data', data)
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
        </>
    )
}
