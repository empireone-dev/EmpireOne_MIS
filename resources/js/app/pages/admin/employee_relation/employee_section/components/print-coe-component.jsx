import { Menu } from 'antd';
import React from 'react'

export default function PrintCoeComponent({data, item}) {
    function openHandler(params) {
        // setOpen(true);
        window.open(`/print_coe/${data.app_id}`, "_blank");
      }
  return (
    <>
      <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
        {item.label}
      </Menu.Item>
    </>
  )
}
