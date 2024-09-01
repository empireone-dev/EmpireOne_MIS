import store from '@/app/store/store'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Menu, message, Modal } from 'antd';
import { delete_medicine_record_thunk } from '../redux/medicine-record-thunk';

export default function DeleteMedicineSection({ data, label, icon }) {
    const [dataValue, setDataValue] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setDataValue(data)
    }, []);
    function submit_edit(e) {
        e.preventDefault()
        try {
            store.dispatch(delete_medicine_record_thunk(dataValue.id))
            messageApi.success('Deleted Successfully');
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
                    visible={showModal}
                    onOk={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                    footer={null}
                >
                    <form onSubmit={submit_edit}>
                        <div>
                            <p>Are you sure you want to delete <b>{data.medicine}</b> ?</p>
                            <div className='flex flex-1 gap-1.5 justify-end mt-1'>
                                <button
                                    className='flex justify-end px-2 py-1.5 rounded-md hover:bg-gray-300'
                                    onClick={() => setShowModal(false)}
                                    type='button'>
                                    Cancel
                                </button>
                                <button
                                    className='flex justify-end bg-blue-600 px-2 py-1.5 rounded-md text-white hover:bg-blue-500'
                                    type='submit'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </Menu.Item>

        </div>
    )
}
