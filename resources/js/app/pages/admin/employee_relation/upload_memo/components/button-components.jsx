import React from 'react';
import { DownOutlined, EditOutlined, EyeOutlined, FolderViewOutlined, } from '@ant-design/icons';
import { Button, Dropdown, message, Space, } from 'antd';
import { TrashIcon } from '@heroicons/react/24/outline';
const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};
const items = [
  {
    label: 'View Memo',
    key: '1',
    icon: <FolderViewOutlined />,
  },
  {
    label: 'Update Memo',
    key: '2',
    icon: <EditOutlined />,
  },
  {
    label: 'List of Viewers',
    key: '3',
    icon: <EyeOutlined />,
  },
  {
    label: 'Delete Memo',
    key: '4',
    icon: <TrashIcon className='h-3' />,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const ButtonComponents = () => (
  <Space wrap>
    <Dropdown menu={menuProps}>
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