import React, { useState } from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';
import EditGuideQuestionSection from './edit-guide-question-section';
import DeleteGuideQuestionSection from './delete-guide-question-section';

const GuideQuestionButtonDropDownSection = ({ data }) => {

  const items = [
    {
      key: '1',
      components: <EditGuideQuestionSection
        data={data}
        label='Update Guide Question'
        icon={<EditOutlined />}
      />
    },
    {
      key: '2',
      components: <DeleteGuideQuestionSection
        data={data}
        label='Remove Guide Question'
        icon={<DeleteOutlined />}
      />
    },
  ];

  return (
    <Space wrap>
      {Dropdown}
      <Dropdown
        overlay={
          <Menu
          >
            {items.map(item => (
              <>
                {item.components}
              </>
              // <ButtonModalComponent data={item} title="Hello World">
              //   {item.components}
              // </ButtonModalComponent>
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

export default GuideQuestionButtonDropDownSection;
