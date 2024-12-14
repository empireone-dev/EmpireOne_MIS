import { SignatureOutlined } from '@ant-design/icons'
import { Modal, Tooltip } from 'antd'
import React from 'react'
import { useState } from 'react';

export default function UploadSignatureSection() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)


    return (
        <div className='items-center justify-center flex'>
            <Tooltip title="Upload Signature">
                <button
                    type="button"
                    onClick={() => setOpen(true)}>
                    <SignatureOutlined className='text-2xl' />
                </button>
                <Modal
                    title="Upload Signature"
                    centered
                    open={open}
                    // onOk={() => submit_attrition()}
                    onCancel={() => setOpen(false)}
                    width={1000}
                    okText="Submit"
                    confirmLoading={loading}
                    cancelText="Cancel"
                >
                    <form action="">
                        <div className='flex items-center justify-center'>
                            <i className='text-xl'>signature</i>
                        </div>
                    </form>
                </Modal>
            </Tooltip>
        </div>
    )
}
