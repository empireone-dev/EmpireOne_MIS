import { UploadOutlined } from '@ant-design/icons'
import { Button, Modal, Upload } from 'antd'
import moment from 'moment';
import React from 'react'
import { useState } from 'react';

export default function ReUploadRequirementsSection(data) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reqs, setReqs] = useState('')
    const [fileList, setFileList] = useState([])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        const fd = new FormData()
        console.log('fileList', fileList)
        fd.append('file', fileList.originFileObj)
        fd.append('status', 'Uploaded')
        fd.append('reqs', reqs)
        fd.append('created', moment().format('YYYY-MM-DD HH:mm:ss'))
        fd.append('app_id', window.location.pathname.split('/')[2])
        if (fileList.status == 'done') {
            const result = await store_pre_employment_file_service(fd)
            console.log('result', result)
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    async function upload_file({ file }) {
        setFileList(file)
    }

    return (
        <div>
            <button
                type="button"
                onClick={showModal}
                className="text-2xl ml-2.5 text-red-500"
            >
                <UploadOutlined />
            </button>
            <Modal title="REUPLOAD REQUIREMENTS" open={isModalVisible} onOk={handleOk} okText="Submit" onCancel={handleCancel}>
                <div className='w-full'>
                    <label
                        className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                        for="grid-text"
                    >
                        Name of Requirement
                    </label>
                    <input
                        onChange={(e) => setReqs(e.target.value)}
                        value={data?.data?.reqs}
                        type="text" className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readOnly />
                </div>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    method='GET'
                    maxCount={1}
                    multiple={false}
                    defaultFileList={fileList}
                >
                    <Button type="primary" icon={<UploadOutlined />}>
                        Upload Scanned Image
                    </Button>
                </Upload>
            </Modal>
        </div>
    )
}
