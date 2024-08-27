import React, { useState } from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';
import EditMedicineSection from './edit-medicine-section';
import DeleteMedicineSection from './delete-medicine-section';

const MedicineButtonDropDownSection = ({ data }) => {

  const items = [
    {
      key: '1',
      components: <EditMedicineSection
        data={data}
        label='Update Medicine'
        icon={<EditOutlined />}
      />
    },
    {
      key: '2',
      components: <DeleteMedicineSection
        data={data}
        label='Remove Medicine'
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

export default MedicineButtonDropDownSection;
