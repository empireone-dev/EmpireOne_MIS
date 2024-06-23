import React, { useState } from 'react';
import { DownOutlined, EditOutlined, FileOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';
import { router } from '@inertiajs/react';

const ButtonComponents = () => {
  const [modalOpen, setModalOpen] = useState(false); // State for modal

  const handleButtonClick = () => {
    message.info('Click on left button.');
    console.log('click left button');
  };

  const handleMenuClick = (item) => {
    if (item.onClick) item.onClick();
    if (item.key === '1') setModalOpen(true);
    if (item.key === '2') router.visit('/admin/sourcing/resource_requests/erf_record/erf_job_analysis');
    if (item.key === '3') router.visit('/admin/sourcing/resource_requests/erf_record/erf_job_description');
  };

  const items = [
    {
      label: 'Update Status',
      key: '1',
      icon: <EditOutlined />,
    },
    {
      label: 'Job Analysis',
      key: '2',
      icon: <FileOutlined />,
      onClick: () => router.visit('/admin/sourcing/resource_requests/erf_record/erf_job_analysis')
    },
    {
      label: 'Job Description',
      key: '3',
      icon: <FileTextOutlined />,
      onClick: () => router.visit('/admin/sourcing/resource_requests/erf_record/erf_job_description')
    },
  ];

  return (
    <Space wrap>
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            {items.map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <Button type="primary">
          <Space>
            Menu
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Modal
        title="Update Request"
        centered
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={1200}
        okText="Save Changes"
        cancelText="Cancel"
      >
        <form className="w-full pb-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className='flex flex-1 '>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Reference No.
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Job Title
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Job Type
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
            </div>
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                Request Status
              </label>
              <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                <option value=""></option>
                <option value="">In Review</option>
                <option value="">Approved</option>
                <option value="">Declined</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </Space>
  );
};

export default ButtonComponents;
