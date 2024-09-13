import { Menu } from 'antd';
import React from 'react'
import { useState } from 'react';

export default function ApplicantProceedInitalPhaseComponent({ data,item }) {
  const [open, setOpen] = useState(false);
  function openHandler(params) {
    // setOpen(true);
    window.open(`/admin/initial_result/${data.app_id}`, "_blank");
}
return (
    <>
        <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
            {item.label}
        </Menu.Item>
        
    </>
);
}
