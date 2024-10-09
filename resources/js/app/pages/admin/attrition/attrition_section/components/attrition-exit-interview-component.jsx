import { Menu } from 'antd';
import React, { useState } from 'react'

export default function AttritionExitInterviewComponent({ data, item }) {
  function openHandler(params) {
    // setOpen(true);
    window.open(`/exit_interview/${data.app_id}`, "_blank");
  }
  return (
    <>
      <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
        {item.label}
      </Menu.Item>
    </>
  )
}
