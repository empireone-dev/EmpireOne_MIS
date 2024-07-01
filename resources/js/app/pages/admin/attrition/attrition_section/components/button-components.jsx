import React from 'react';
import { DownOutlined,  FolderOpenOutlined, FileSearchOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { router } from '@inertiajs/react';
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick = (item) => {
  if (item.onClick) item.onClick();
  if (item.key === '1') setModalOpen(true);
  if (item.key === '2') router.visit('/admin/file_201');
  if (item.key === '3') router.visit('/exit_interview');
};
const items = [
  {
    label: 'View Reason',
    key: '1',
    icon: <FileSearchOutlined />,
  },
  {
    label: '201 File',
    key: '2',
    icon: <FolderOpenOutlined />,
  },
  {
    label: 'Process Exit Interview & Clearance',
    key: '3',
    icon: <DeliveredProcedureOutlined />,
    onClick: () => router.visit('/exit_interview')
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const ButtonComponents = () => (
  <Space wrap>
    <Dropdown menu={menuProps} trigger={['click']}>
      <Button type='primary'>
        <Space>
          Menu
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </Space>
);
export default ButtonComponents;