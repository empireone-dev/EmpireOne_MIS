import store from '@/app/store/store'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Menu, message, Modal } from 'antd';
import { update_medicine_record_thunk } from '../redux/medicine-record-thunk';

export default function EditMedicineSection({ data, label, icon }) {
    const [dataValue, setDataValue] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setDataValue(data)
    }, []);
    function submit_edit(e) {
        e.preventDefault()
        try {
            store.dispatch(update_medicine_record_thunk(dataValue))
            messageApi.success('Updated Successfully');
            setShowModal(false)
        } catch (error) {
            messageApi.error('error');
        }
    }
    return (
        <div>
            {contextHolder}
            <Menu.Item key={data.key} icon={icon}>
                <button onClick={() => setShowModal(true)}>{label}</button>
                <Modal
                    title={label}
                    centered
                    open={showModal}
                    onOk={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                    width={1000}
                    footer={null}
                >
                    <form class="w-full" onSubmit={submit_edit}>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Medicine
                                </label>
                                <input
                                    defaultValue={dataValue?.medicine}
                                    onChange={(e) => setDataValue({
                                        ...dataValue,
                                        medicine: e.target.value
                                    })}
                                    name='medicine'
                                    class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Medicine Type
                                </label>
                                <input
                                    defaultValue={dataValue?.med_type}
                                    onChange={(e) => setDataValue({
                                        ...dataValue,
                                        med_type: e.target.value
                                    })}
                                    name='med_type'
                                    class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Medicine Description
                                </label>
                                <textarea
                                    defaultValue={dataValue?.med_desc}
                                    onChange={(e) => setDataValue({
                                        ...dataValue,
                                        med_desc: e.target.value
                                    })}
                                    name='med_desc'
                                    class="appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" />
                            </div>
                        </div>
                        <div className='flex flex-1 gap-1.5 justify-end mt-1'>
                            <button
                                className='flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300'
                                onClick={() => setShowModal(false)}
                                type='button'>
                                Cancel
                            </button>
                            <button
                                className='flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500'
                                onClick={submit_edit}
                                type='submit'>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Modal>
            </Menu.Item>

        </div>
    )
}
