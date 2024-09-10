import { Menu } from 'antd';
import React from 'react'
import { useState } from 'react';

export default function ApplicantInitialRatingScale({ data,item }) {
  const [open, setOpen] = useState(false);
  function openHandler(params) {
    // setOpen(true);
    window.open(`/admin/initial_rate/${data.app_id}`, "_blank");
}
return (
    <>
        <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
            {item.label}
        </Menu.Item>
    </>
);
}
