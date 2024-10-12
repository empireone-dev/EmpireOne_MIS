import { Menu, Modal } from 'antd';
import React, { useState } from 'react'

export default function ErfUpdateStatusComponent({ data, item }) {
    const [modalOpen, setModalOpen] = useState(false);
    function openHandler(params) {
        setModalOpen(true);
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
           
      <Modal
        title="Update Request Status"
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
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.ref_id} readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Job Title
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.jobTitle} readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Job Type
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.jobType} readOnly />
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
        </>
    )
}
