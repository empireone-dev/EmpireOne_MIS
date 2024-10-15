import { router } from '@inertiajs/react';
import { Menu } from 'antd';
import React from 'react'
import { useState } from 'react';

export default function EditOnboardingDocumentComponent({ data, item }) {
  const [open, setOpen] = useState(false);
  function openHandler(params) {
    // setOpen(true);
    router.visit(`/admin/onboarding/onboarding_docu/edit_docu/${data.id}`);
  }
  return (
    <>
      <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
        {item.label}
      </Menu.Item>
    </>
  );
}
