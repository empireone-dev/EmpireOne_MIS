import React from 'react';
import { DownOutlined, EditOutlined, FolderOpenOutlined, UsergroupAddOutlined, PrinterOutlined, QrcodeOutlined, CalendarOutlined, ExceptionOutlined, InfoCircleOutlined, BarChartOutlined, ScheduleOutlined, DotChartOutlined, RiseOutlined, AuditOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
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
    label: 'Application Details',
    key: '1',
    icon: <AuditOutlined />,
  },
  {
    label: 'Proceed to Initial Phase',
    key: '2',
    icon: <RiseOutlined />,
  },
  {
    label: 'Initial Rating Scale',
    key: '3',
    icon: <DotChartOutlined />,
  },
  {
    label: 'Initial Phase Result',
    key: '4',
    icon: <InfoCircleOutlined />,
  },
  {
    label: 'Final Rating Scale',
    key: '5',
    icon: <DotChartOutlined />,
  },
  {
    label: 'Set Schedule Final Phase',
    key: '6',
    icon: <CalendarOutlined />,
  },
  {
    label: 'Check Schedule of Interviewer',
    key: '7',
    icon: <ScheduleOutlined />,
  },
  {
    label: 'Application Results',
    key: '8',
    icon: <InfoCircleOutlined />,
  },
  {
    label: 'Job Offer',
    key: '9',
    icon: <BriefcaseIcon className='h-4 mr-0.5' />,
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