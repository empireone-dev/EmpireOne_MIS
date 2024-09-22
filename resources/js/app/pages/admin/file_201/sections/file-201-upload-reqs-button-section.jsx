import WorkingExperienceSection from '@/app/pages/online_application/sections/working-experience-section';
import { store_pre_employment_file_service } from '@/app/pages/services/pre-employment-file-service';
import { PlusSquareTwoTone, UploadOutlined } from '@ant-design/icons'
import { Button, Modal, Upload } from 'antd';
import moment from 'moment';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function File201UploadReqsButtonSection() {
    const [open, setOpen] = useState(false);
    const [showWorkingExperience, setShowWorkingExperience] = useState(false);
    const [showFirstTimeJobseeker, setShowFirstTimeJobseeker] = useState(false);
    const { applicant } = useSelector((state) => state.final_rate);
    const { checklists } = useSelector((state) => state.checklists);
    const [fileList, setFileList] = useState([])
    const [reqs,setReqs] =useState('')

    const handleOk = async () => {
        setOpen(false);
        const fd = new FormData()
        console.log('fileList',fileList)
        fd.append('file', fileList.originFileObj)
        fd.append('status', 'Uploaded')
        fd.append('reqs', reqs)
        fd.append('created', moment().format('YYYY-MM-DD HH:mm:ss'))
        fd.append('app_id', window.location.pathname.split('/')[3])
        if (fileList.status == 'done') {
            const result = await store_pre_employment_file_service(fd)
            console.log('result', result)
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleWorkingExperienceChange = (e) => {
        setShowWorkingExperience(e.target.checked);
        setShowFirstTimeJobseeker(false);
    };

    const handleFirstTimeJobseekerChange = (e) => {
        setShowFirstTimeJobseeker(e.target.checked);
        setShowWorkingExperience(false);
    };

    async function upload_file({ file }) {
        setFileList(file)
    }

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
                                <input name='' type="text" value={applicant?.app_id ?? ''} className='border p-2 rounded  w-full' readOnly />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor=""><b>Requirement's Name</b></label>
                                <select className="border p-2 rounded  w-full" onChange={(e)=>setReqs(e.target.value)}>
                                    <option> </option>
                                    {
                                        checklists
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
                                defaultFileList={fileList}
                            >
                                <Button type="primary" icon={<UploadOutlined />}>
                                    Upload Scanned Image
                                </Button>
                            </Upload>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
