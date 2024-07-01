import React, { useState } from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';

const ButtonComponents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 

  const handleButtonClick = () => {
    message.info('Click on left button.');
    console.log('click left button');
  };

  const handleMenuClick = (item) => {
    if (item.onClick) item.onClick();
    if (item.key === '1') setModalOpen(true); 
    if (item.key === '2') setDeleteModalOpen(true);
  };

  const items = [
    {
      label: 'Update Guide Question',
      key: '1',
      icon: <EditOutlined />,
    },
    {
      label: 'Remove Guide Question',
      key: '2',
      icon: <DeleteOutlined />,
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
        trigger={['click']}
      >
        <Button type="primary">
          <Space>
            Menu
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Modal
        title="Update Guide Question"
        centered
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={520} // Adjusted width for better UI
        okText="Save Changes"
        cancelText="Cancel"
      >
        <form className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-text">
                Guide Question
              </label>
              <input className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" />
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title="Confirm Delete"
        centered
        visible={deleteModalOpen}
        onOk={() => {
          setDeleteModalOpen(false);
        }}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this question?</p>
      </Modal>
    </Space>
  );
};

export default ButtonComponents;
