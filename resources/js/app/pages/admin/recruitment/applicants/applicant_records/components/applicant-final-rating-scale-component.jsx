import { Menu } from 'antd';
import React from 'react'
import { useState } from 'react';

export default function ApplicantFinalRatingScaleComponent({ data,item }) {
  const [open, setOpen] = useState(false);
  function openHandler(params) {
    window.open(`/admin/final_rate/${data.app_id}`, "_blank");
}
return (
    <>
        <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
            {item.label}
        </Menu.Item>
    </>
);
}
