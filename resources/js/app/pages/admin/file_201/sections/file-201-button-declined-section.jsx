import { Modal } from 'antd';
import React from 'react'
import File201DeclinedSection from './file-201-declined-section';
import { useState } from 'react';
import { dialogBody } from '@material-tailwind/react';

export default function File201ButtonDeclinedSection({data,setOpen}) {
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
                <File201DeclinedSection
                setOpen={setOpen}
                data={data}/>
            </Modal>
        </div>

    )
}
