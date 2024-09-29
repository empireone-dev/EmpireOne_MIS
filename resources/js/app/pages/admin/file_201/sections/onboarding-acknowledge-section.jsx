import { SendOutlined } from '@ant-design/icons';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Modal } from 'antd';
import React from 'react'
import { useState } from 'react';

export default function OnboardingAcknowledgeSection() {
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    async function send_onboarding_ack() {
        setOpenConfirmationModal(true);
        setOpenChecklistModal(false);
    }
    return (
        <div>
            <button
                onClick={send_onboarding_ack}
                className="flex items-center justify-center gap-1 bg-blue-500 w-full p-2 text-white rounded-md"
            >
                <SendOutlined/>
                <div>Send Onboarding Acknowledgement</div>
            </button>
            <Modal
                title="Send Onboarding Acknowledgment email"
                centered
                open={openConfirmationModal}
                width={650}
                onCancel={() => setOpenConfirmationModal(false)}
                okText="Ok, Send"
                // footer={null}
            >
                <div>
                    <h1>Are you sure you want to send Onboarding Acknowledgment email?</h1>
                </div>
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
