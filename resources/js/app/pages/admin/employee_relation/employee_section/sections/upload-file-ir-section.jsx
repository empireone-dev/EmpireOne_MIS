import { FileJpgOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import { Modal, Button, Upload } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { store_pre_employment_file_service } from '@/app/pages/services/pre-employment-file-service';

export default function UploadFileIRSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reqs, setReqs] = useState('')
    const { checklists } = useSelector((state) => state.checklists);
    const [fileList, setFileList] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
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
        setIsModalOpen(false);
    };

    async function upload_file({ file }) {
        setFileList(file)
    }
    return (
        <div>

            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                method='GET'
                onChange={upload_file}
                multiple={true}
                defaultFileList={fileList}
            >
                <Button type="primary" className='px-44 py-2' icon={<UploadOutlined />}>
                    Choose File
                </Button>
            </Upload>
        </div>
    )
}
