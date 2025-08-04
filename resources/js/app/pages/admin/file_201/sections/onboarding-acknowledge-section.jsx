import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import React from 'react'
import { useState } from 'react';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { create_onboarding_ack_thunk } from '../redux/file-201-thunk';
import store from '@/app/store/store';

export default function OnboardingAcknowledgeSection({ data, setOpen }) {
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [form, setForm] = useState({
        allowance: 0
    });
    const [loading, setLoading] = useState(false);
    const rawJobPos = window.location.pathname.split('/')[4];
    const salary = window.location.pathname.split('/')[5];
    const allowance = window.location.pathname.split('/')[6];
    const job_pos = rawJobPos.replace(/_/g, '/').replace(/%20/g, ' ');

    console.log('data', data)

    async function send_onboarding_ack(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                create_onboarding_ack_thunk({
                    ...form,
                    ...data,
                    job_pos: job_pos ?? "",
                    salary: salary ?? "",
                    allowance: allowance ?? "",
                })
            );
            await store.dispatch(get_applicant_thunk());
            message.success("Onboarding Acknowledgment already sent!");
            setOpenConfirmationModal(false);
            setLoading(false);

        } catch (error) {
            message.success("Failed to sent Onboarding Acknowledgment!");
            setLoading(false);
        }

    }

    async function open_onboarding_ack() {
        setOpenConfirmationModal(true);
        setOpen(false);

    }
    return (
        <div>
            <button
                onClick={open_onboarding_ack}
                className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 w-full p-3 text-white rounded-md"
            >
                <SendOutlined />
                <div>Send Onboarding Acknowledgement</div>
            </button>
            <Modal
                title="Are you sure you want to send Onboarding Acknowledgment email?"
                centered
                open={openConfirmationModal}
                width={800}
                onCancel={() => setOpenConfirmationModal(false)}
                okText="Ok, Send"
                footer={null}
            >
                <form
                    onSubmit={send_onboarding_ack}
                    className="w-full h-full"
                >
                    <div className="flex flex-col -mx-3">
                        <div className="w-full px-2.5">
                            <input
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="hidden"
                                placeholder=""
                                value={data.app_id}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <input
                                    value={data?.fname ?? ''}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="hidden"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="hidden"
                                    value={data?.mname ?? ''}
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    value={data?.lname ?? ''}
                                    type="hidden"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-1.5 items-center justify-end'>
                        <button className='hover:text-black py-1.5 px-2 rounded-lg'>
                            Cancel
                        </button>
                        <button
                            onClick={send_onboarding_ack}
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-2 rounded-lg"
                        >
                            <div className="flex flex-1 px-2 items-center justify-center">
                                {loading ? (
                                    <LoadingOutlined className='mr-1' spin />
                                ) : (
                                    <></>
                                )}
                                {loading ? " Sending..." : " Send"}
                            </div>
                        </button>
                    </div>
                </form>

                {/* <div className='flex gap-3 items-center justify-end'>
                    <button>
                        Cancel
                    </button>
                    <button className=''>
                        Send
                    </button>
                </div> */}
            </Modal>
        </div>
    )
}
