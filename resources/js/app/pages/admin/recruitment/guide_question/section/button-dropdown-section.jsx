import React, { useState } from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';
import ButtonModalComponent from '../components/button-modal-components';
import EditGuideQuestionSection from './edit-guide-question-section';
import DeleteGuideQuestionSection from './delete-guide-question-section';

const ButtonDropDownSection = () => {

  const items = [
    {
      label: 'Update Guide Question',
      key: '1',
      icon: <EditOutlined />,
      components: <EditGuideQuestionSection />
    },
    {
      label: 'Remove Guide Question',
      key: '2',
      icon: <DeleteOutlined />,
      components: <DeleteGuideQuestionSection />
    },
  ];

  return (
    <Space wrap>
      <Dropdown
        overlay={
          <Menu
          >
            {items.map(item => (
              <ButtonModalComponent data={item} title="Hello World">
                {item.components}
              </ButtonModalComponent>
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

    </Space>
  );
};

export default ButtonDropDownSection;
