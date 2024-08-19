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
            messageApi.success('success');
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
                                <form
                                    onSubmit={submit_edit}
                                    className="w-full">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-text">
                                                Guide Question
                                            </label>
                                            <input
                                                value={dataValue?.guideqs}
                                                onChange={(e) => setDataValue({
                                                    ...dataValue,
                                                    guideqs: e.target.value
                                                })}
                                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={submit_edit}
                                        type='submit'>
                                        Edit
                                    </button>
                                </form>
                                {/* <input className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" /> */}
                            </div>
                        </div>
                    </form>
                </Modal>
            </Menu.Item>

        </div>
    )
}
