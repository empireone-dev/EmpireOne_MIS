import { Menu } from 'antd';
import React from 'react'
import { useState } from 'react';

export default function ViewOnboardingDocument({ data,item }) {
  const [open, setOpen] = useState(false);
  function openHandler(params) {
    // setOpen(true);
    window.open(`/admin/onboarding/onboarding_docu/view_docu/${data.id}`, "_blank");
}
return (
    <>
        <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
            {item.label}
        </Menu.Item>
        
    </>
);
}
