import { FormOutlined } from '@ant-design/icons'
import { Modal } from 'antd';
import React from 'react'
import { useState } from 'react';
import File201ApprovedSection from './file-201-approved-section';
import File201DeclinedSection from './file-201-declined-section';
import File201ButtonDeclinedSection from './file-201-button-declined-section';
import ContractDeclineSection from './contract-decline-section';
import ContractButtonDeclinedSection from './contract-button-declined-section';

export default function ContractApprovalButtonSection({ data }) {
    const [open, setOpen] = useState(false);

    async function approval() {
        setOpen(true);
    }
    return (
        <div>
            <button
                onClick={approval}
                type="button"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
            >
                <FormOutlined />
            </button>
            <Modal
                title="Approval of Uploaded Contract"
                centered
                open={open}
                width={650}
                onCancel={() => setOpen(false)}
                okText="Ok, Send"
                footer={null}
            >
                <div className='flex gap-3 text-center text-white items-center justify-center mt-2'>
                    <File201ApprovedSection data={data} setOpen={setOpen} />
                    <ContractButtonDeclinedSection data={data} setOpen={setOpen} />
                </div>
            </Modal>
        </div>
    )
}
