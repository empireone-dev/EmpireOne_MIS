import React from 'react';
import { DownOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { router } from '@inertiajs/react';
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick = (item) => {
  if (item.onClick) item.onClick();
  if (item.key === '1') router.visit('onboarding_docu/edit_docu');
  if (item.key === '2') { window.open('onboarding_docu/view_docu', '_blank'); }
  
};

const items = [
  {
    label: 'Edit Document',
    key: '1',
    icon: <EditOutlined />,
  },
  {
    label: 'View Document',
    key: '2',
    icon: <EyeOutlined />,
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