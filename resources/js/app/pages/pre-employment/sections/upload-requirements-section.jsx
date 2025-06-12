import { FileJpgOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import { Modal, Button, Upload, message } from 'antd';
import { useSelector } from 'react-redux';
import { store_pre_employment_file_service } from '../../services/pre-employment-file-service';
import moment from 'moment';
import { get_checklist_thunk } from '../../admin/hiring/pre_employment/redux/pre-employment-thunk';
import store from '@/app/store/store';
import { store_pre_employment_file_thunk } from '../redux/pre-employment-files-thunk';
import { get_applicant_by_app_id_thunk } from '../../admin/final_rate/redux/final-rate-thunk';

export default function UploadRequirementsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reqs, setReqs] = useState('')
    const { user } = useSelector((state) => state.app);
    const { checklists } = useSelector((state) => state.checklists);
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false)
    const app_id = window.location.pathname.split('/')[2]
    const { applicant } = useSelector((state) => state.final_rate);
    const site = decodeURIComponent(window.location.pathname.split('/')[3].replace(/\+/g, ' '))
    
    const showModal = () => {
        setIsModalOpen(true);
    };


    // The dataset containing `reqs` values to remove
    const toRemove = applicant?.requirements?.map(res => res.reqs) ?? [];

    const filteredEntries = checklists.filter(entry => !toRemove.includes(entry.reqs));



    const handleOk = async () => {
        setLoading(true);
        const fd = new FormData()
        fd.append('file', fileList[0].originFileObj)
        fd.append('status', 'Uploaded')
        fd.append('reqs', reqs)
        fd.append('created', moment().format('YYYY-MM-DD HH:mm:ss'))
        fd.append('app_id', app_id)

        try {
            if (fileList[0].status == 'done') {
                await store_pre_employment_file_service(fd)
                await store.dispatch(get_applicant_by_app_id_thunk(app_id))
                message.success('Uploaded successfully!')
                setIsModalOpen(false);
                setFileList([])
                setReqs('')
                setOpen(false)
            }

        } catch (error) {
            // message.error('Failed to submit application');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function upload_file({ file }) {
        setFileList([
            file
        ])
    }

    return (
        <div>

            <div className="flex mt-2.5">
                <button type="button" id="theme-toggle" onClick={showModal} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                    <FileJpgOutlined /> UPLOAD REQUIREMENTS
                </button>
            </div>
            <Modal
                confirmLoading={loading}
                title="UPLOAD REQUIREMENTS" open={isModalOpen} onOk={handleOk} okText="Submit" onCancel={handleCancel}>
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
                        onChange={(e) => setReqs(e.target.value)}
                    >
                        {
                            !reqs && <option value="" selected disabled></option>
                        }
                        {
                            // filteredEntries?.filter(res => res.site === "San Carlos")
                            //     .map((res, i) => (
                            //         <option value={res.reqs} key={i}>
                            //             {res.reqs} {res.remarks === "Yes" ? "*" : ""}
                            //         </option>
                            //     ))
                            filteredEntries
                                .filter(res => !site || res?.site === site)
                                .map((res, i) => (
                                    <option value={res.reqs} key={i}>
                                        {res.reqs} {!site ? ` (${res.site})` : ''} {res.remarks === "Yes" ? "*" : ""}
                                    </option>
                                ))
                        }
                    </select>


                </div>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    method='GET'
                    maxCount={1}
                    onChange={upload_file}
                    multiple={false}
                    fileList={fileList}
                >
                    <Button type="primary" icon={<UploadOutlined />}>
                        Upload Scanned Image
                    </Button>
                </Upload>
                <div className='mt-3 text-zinc-400 text-sm'>
                    <p><i>Note: Requirements marked with an asterisk (*) are mandatory and must be submitted or uploaded to proceed to the next step of the application process.</i></p>
                </div>
            </Modal>
        </div>
    )
}
