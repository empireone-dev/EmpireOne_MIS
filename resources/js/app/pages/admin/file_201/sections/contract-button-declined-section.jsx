import { Modal } from 'antd';
import React from 'react'
import { useState } from 'react';
import ContractDeclineSection from './contract-decline-section';

export default function ContractButtonDeclinedSection({ data, setOpen }) {
    const [openDecline, setDeclineOpen] = useState(false);
    return (
        <div className="flex w-full items-center justify-center">
            <button
                onClick={() => setDeclineOpen(true)}
                className="bg-red-500 w-full rounded hover:bg-red-600 p-1.5">
                Declined
            </button>
            <Modal
                onClick={setDeclineOpen}
                onCancel={() => setDeclineOpen(false)}
                visible={openDecline}
                footer={null}
            >
                <ContractDeclineSection
                    setOpen={setOpen}
                    data={data} />
            </Modal>
        </div>

    )
}
