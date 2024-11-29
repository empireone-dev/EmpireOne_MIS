import WorkingExperienceSection from '@/app/pages/online_application/sections/working-experience-section';
import { store_pre_employment_file_service } from '@/app/pages/services/pre-employment-file-service';
import store from '@/app/store/store';
import { PlusSquareTwoTone, UploadOutlined } from '@ant-design/icons'
import { Button, message, Modal, Upload } from 'antd';
import moment from 'moment';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { get_applicant_by_app_id_thunk } from '../../final_rate/redux/final-rate-thunk';

export default function File201UploadReqsButtonSection() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const { applicant } = useSelector((state) => state.final_rate);
    const { checklists } = useSelector((state) => state.checklists);
    const [fileList, setFileList] = useState([])
    const [reqs, setReqs] = useState('')
    const app_id = window.location.pathname.split('/')[3]

    const handleOk = async () => {
        setLoading(true)
        const fd = new FormData()
        fd.append('file', fileList[0].originFileObj)
        fd.append('status', 'Uploaded')
        fd.append('reqs', reqs)
        fd.append('created', moment().format('YYYY-MM-DD HH:mm:ss'))
        fd.append('app_id', window.location.pathname.split('/')[3])
        try {
            if (fileList[0].status == 'done') {
                await store_pre_employment_file_service(fd)
                await store.dispatch(get_applicant_by_app_id_thunk(app_id))
                message.success('Uploaded Successfully!')
                setOpen(false)
                setReqs('')
                setFileList([])
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)

        }
    };

    const handleCancel = () => {
        setOpen(false);
    };



    async function upload_file({ file }) {
        setFileList([
            file
        ])
    }
    const toRemove = applicant?.requirements?.map(res => res.reqs) ?? [];
    const filteredEntries = checklists.filter(entry => !toRemove.includes(entry.reqs));
    const isContract = applicant?.requirements?.find(res => res.reqs == 'Contract')
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-e-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UploadOutlined className='text-xl' />
                    Upload New Requirements
                </button>
            </div>
            <Modal
                confirmLoading={loading}
                title="Add Requirements"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                okText="Upload"
                cancelText="Cancel"
            >
                <form className='rounded-lg p-2'>
                    <h1 className="text-lg font-medium leading-6 mb-3 ">UPLOAD REQUIREMENTS</h1>
                    <div className="mt-3 text-center sm:mt-0  sm:text-left">
                        <div className="mt-2">
                            <div className='mb-4'>
                                <label htmlFor=""><b>Application ID</b></label>
                                <input name='' type="text" value={app_id ?? ''} className='border p-2 rounded  w-full' readOnly />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor=""><b>Requirement's Name</b></label>
                                <select className="border p-2 rounded  w-full" onChange={(e) => setReqs(e.target.value)}>
                                    {
                                        !reqs && <option selected disabled> </option>
                                    }
                                    {
                                        !isContract && <option value="Contract">Contract Document</option>
                                    }
                                    {
                                        filteredEntries
                                            .filter(res => res.site === "San Carlos")
                                            .map((res, i) => {
                                                return <option value={res.reqs} key={i}>{res.reqs}</option>;
                                            })
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
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
