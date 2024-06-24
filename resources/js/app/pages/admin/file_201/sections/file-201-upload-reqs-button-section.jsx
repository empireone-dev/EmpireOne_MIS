import WorkingExperienceSection from '@/app/pages/online_application/sections/working-experience-section';
import { PlusSquareTwoTone, UploadOutlined } from '@ant-design/icons'
import { Modal } from 'antd';
import React, { useState } from 'react'

export default function File201UploadReqsButtonSection() {
    const [open, setOpen] = useState(false);
    const [showWorkingExperience, setShowWorkingExperience] = useState(false);
    const [showFirstTimeJobseeker, setShowFirstTimeJobseeker] = useState(false);

    const handleWorkingExperienceChange = (e) => {
        setShowWorkingExperience(e.target.checked);
        setShowFirstTimeJobseeker(false);
    };

    const handleFirstTimeJobseekerChange = (e) => {
        setShowFirstTimeJobseeker(e.target.checked);
        setShowWorkingExperience(false);
    };

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
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={800}
                okText="Upload"
                cancelText="Cancel"
            >
                <form className='rounded-lg p-2'>
                    <h1 className="text-lg font-medium leading-6 mb-3 ">UPLOAD REQUIREMENTS</h1>
                    <div className="mt-3 text-center sm:mt-0  sm:text-left">
                        <div className="mt-2">
                        <div className='mb-4'>
                                <label htmlFor=""><b>App ID</b></label>
                               <input type="text" className='border p-2 rounded  w-full' readOnly />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor=""><b>Requirement's Name</b></label>
                                <select className="border p-2 rounded  w-full">
                                    <option> </option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full mb-4'>
                                <label htmlFor=""><b>Upload Scanned Image</b></label>
                                <div className='flex flex-1 gap-3'>
                                    <input type="file" placeholder="Application No" className="border p-2 rounded w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
