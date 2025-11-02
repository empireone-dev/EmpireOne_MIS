import { Menu } from 'antd';
import React from 'react'
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ApplicantInitialRatingScale({ data, item }) {
    const [open, setOpen] = useState(false);
    function openHandler(params) {
        // setOpen(true);
        router.visit(`/admin/initial_rate/${data.app_id}`);
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
        </>
    );
}
