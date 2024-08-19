import React, { useState } from 'react';
import {  Modal, Menu } from 'antd';

export default function ButtonModalComponent({ children, title,data }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Menu.Item key={data.key} icon={data.icon}>
      <button onClick={()=>setShowModal(true)}>{data.label}</button>
        <Modal
          title={data.label}
          centered
          visible={showModal}
          footer={null}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          width={520} // Adjusted width for better UI
          okText="Save Changes"
          cancelText="Cancel"
        >
          <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                {children}
                {/* <input className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" /> */}
              </div>
            </div>
          </form>
        </Modal>
    </Menu.Item>

  );
}

