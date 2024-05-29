import React from 'react';
import { DownOutlined, EditOutlined, FolderOpenOutlined, UsergroupAddOutlined, PrinterOutlined, QrcodeOutlined, FileOutlined, FileTextOutlined } from '@ant-design/icons';
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
    label: 'Update Status',
    key: '1',
    icon: <EditOutlined />,
  },
  {
    label: ' Job Analysis',
    key: '2',
    icon: <FileOutlined/>
  },
  {
    label: 'Job Description',
    key: '3',
    icon: <FileTextOutlined/>
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const ButtonComponents = () => (
  <Space wrap>
    <Dropdown menu={menuProps}>
      <Button type="primary" >
        <Space>
          Menu
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </Space>
);
export default ButtonComponents;