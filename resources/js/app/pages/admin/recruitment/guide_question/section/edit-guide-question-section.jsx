import store from '@/app/store/store'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { update_guide_question_thunk } from '../redux/guide-question-thunk';
import { Button, Menu, message, Modal } from 'antd';

export default function EditGuideQuestionSection({ data, label, icon }) {
    const [dataValue, setDataValue] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setDataValue(data)
    }, []);
    function submit_edit(e) {
        e.preventDefault()
        try {
            store.dispatch(update_guide_question_thunk(dataValue))
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
                    footer={null}
                    onOk={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                    width={520}
                >
                    <div className="w-full">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3">
                                <form
                                    onSubmit={submit_edit}
                                    className="w-full">
                                    <div className="flex flex-wrap -mx-3 mt-2">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                                                Guide Question
                                            </label>
                                            <input
                                                defaultValue={dataValue?.guideqs}
                                                onChange={(e) => setDataValue({
                                                    ...dataValue,
                                                    guideqs: e.target.value
                                                })}
                                                name='guideqs'
                                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                 type="text" 
                                                 placeholder="" />
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
                            </div>
                        </div>
                    </div>
                </Modal>
            </Menu.Item>

        </div>
    )
}
