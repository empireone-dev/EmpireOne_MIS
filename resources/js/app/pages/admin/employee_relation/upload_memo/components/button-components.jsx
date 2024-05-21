import React from 'react';
import { DownOutlined, EditOutlined, FolderOpenOutlined, UsergroupAddOutlined, PrinterOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
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
    label: 'Update Employee',
    key: '1',
    icon: <EditOutlined />,
  },
  {
    label: '201 File',
    key: '2',
    icon: <FolderOpenOutlined />,
  },
  {
    label: 'Employment Status',
    key: '3',
    icon: <UsergroupAddOutlined />,
  },
  {
    label: 'Print COE',
    key: '4',
    icon: <PrinterOutlined />,
  },
  {
    label: 'Generate QR Code',
    key: '5',
    icon: <QrcodeOutlined />,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const ButtonComponents = () => (
  <Space wrap>
    <Dropdown menu={menuProps}>
      <Button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 items-center text-center me-2 mb-2'>
        <Space>
          Menu
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </Space>
);
export default ButtonComponents;