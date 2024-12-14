import { SignatureOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'

export default function UploadSignatureSection() {
    return (
        <Tooltip title="Upload Signature">
            <button>
                <SignatureOutlined className='text-2xl' />
            </button>
        </Tooltip>
    )
}
