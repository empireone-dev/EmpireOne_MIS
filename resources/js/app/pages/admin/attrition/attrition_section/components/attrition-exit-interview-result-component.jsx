import { Menu } from 'antd';
import React, { useState } from 'react'

export default function AttritionExitInterviewResultComponent({ data, item }) {
  function openHandler(params) {
    // setOpen(true);
    window.open(`/admin/attrition/exit_interview_result/${data.emp_id}/${data.app_id}`, "_blank");
  }
  return (
    <>
      <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
        {item.label}
      </Menu.Item>
    </>
  )
}
