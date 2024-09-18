import { FileJpgOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import { Modal, Button, Upload } from 'antd';
import { useSelector } from 'react-redux';

export default function UploadRequirementsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { checklists } = useSelector((state) => state.checklists);
    const [fileList, setFileList] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log("checklists", checklists)
    return (
        <div>

            <div className="flex mt-2.5">
                <button type="button" id="theme-toggle" onClick={showModal} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                    <FileJpgOutlined /> UPLOAD REQUIREMENTS
                </button>
            </div>
            <Modal title="UPLOAD REQUIREMENTS" open={isModalOpen} onOk={handleOk} okText="Submit" onCancel={handleCancel}>
                <div className='w-full'>
                    <label
                        className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                        for="grid-text"
                    >
                        Name of Requirements
                    </label>
                    <select
                        className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name=""
                        id=""
                    >
                        <option></option>
                        {
                            checklists
                                .filter(res => res.site === "San Carlos")
                                .map((res, i) => {
                                    return <option key={i}>{res.reqs}</option>;
                                })
                        }
                    </select>

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
