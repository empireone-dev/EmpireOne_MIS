import { Menu } from 'antd';
import React, { useState } from 'react'

export default function File201Component({ data, item }) {
  function openHandler(params) {
    // setOpen(true);
    window.open(`/admin/file_201/${data.app_id}`, "_blank");
  }
  return (
    <>
      <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
        {item.label}
      </Menu.Item>
    </>
  )
}
