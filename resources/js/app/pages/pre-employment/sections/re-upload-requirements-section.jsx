import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Modal, Tooltip, Upload } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { update_pre_employment_file_service } from '../../services/pre-employment-file-service';
import store from '@/app/store/store';
import { get_applicant_by_app_id_thunk } from '../../admin/final_rate/redux/final-rate-thunk';

export default function ReUploadRequirementsSection({ data }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reqs, setReqs] = useState('')
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data?.reqs) {
            setReqs(data?.reqs);
        }
    }, [data]);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = async () => {
        const fd = new FormData()
        setLoading(true)
        fd.append('file', fileList.originFileObj)
        fd.append('status', 'Uploaded')
        fd.append('reqs', reqs)
        fd.append('id', data?.id)
        // fd.append('created', moment().format('YYYY-MM-DD HH:mm:ss'))
        fd.append('app_id', window.location.pathname.split('/')[2])
        try {
            if (fileList.status == 'done') {
                const result = await update_pre_employment_file_service(fd)
                await store.dispatch(get_applicant_by_app_id_thunk(window.location.pathname.split('/')[2]))
                await message.success('Reuploaded successfully!')
                setIsModalVisible(false);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)

        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    async function upload_file({ file }) {
        setFileList(file)
    }

    console.log('data', data)

    return (
        <div>
            <Tooltip title="Re-upload Requirement">
                <button
                    type="button"
                    onClick={showModal}
                    className="text-2xl text-red-500"
                >
                    <UploadOutlined />
                </button>
            </Tooltip>
            <Modal
                confirmLoading={loading}
                title="REUPLOAD REQUIREMENTS" open={isModalVisible} onOk={handleOk} okText="Submit" onCancel={handleCancel}>
                <div className='w-full'>
                    <label
                        className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                        for="grid-text"
                    >
                        Name of Requirement
                    </label>
                    <input
                        onChange={(e) => setReqs(e.target.value)}
                        value={reqs}
                        type="text"
                        name="reqs"
                        className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readOnly />
                </div>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    method='GET'
                    maxCount={1}
                    onChange={upload_file}
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
