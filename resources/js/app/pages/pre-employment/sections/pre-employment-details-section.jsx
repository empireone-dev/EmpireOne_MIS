import React, { useState } from 'react';
import { FileJpgOutlined } from '@ant-design/icons';
import PreEmploymentTableSection from './pre-employment-table-section';
import { useSelector } from 'react-redux';
import UploadRequirementsSection from './upload-requirements-section';
import store from '@/app/store/store';
import { get_checklist_thunk } from '../../admin/hiring/pre_employment/redux/pre-employment-thunk';
import { useEffect } from 'react';
import { get_pre_employment_file_thunk } from '../redux/pre-employment-files-thunk';

export default function PreEmploymentDetailsSection() {
    const [modalVisible, setModalVisible] = useState(false);
    const { applicant } = useSelector((state) => state.final_rate);
    const jo_id = window.location.search.split('=')[1]
    const app_id = window.location.pathname.split('/')[2]
 
    

    const handleUploadClick = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const jo = applicant?.joboffer?.find((res) => res.id == jo_id);

    console.log("jo", jo)


    return (
        <div>
            <div className="h-screen overflow-hidden">
                <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">

                    <div className="container mx-auto flex justify-center">
                        <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                            <div className="flex items-center justify-center p-3">
                                <img className="w-60" src="/images/newlogo.png" alt="logo" />
                            </div>
                            <div className='flex text-2xl items-center justify-center'>
                                <h1><b>APPLICATION DETAILS</b></h1>
                            </div>
                            <form className='border rounded-lg p-3.5'>
                                <div className='flex flex-col w-full mb-4'>
                                    <label htmlFor=""><b>Application No.</b></label>
                                    <div className='flex flex-1 gap-3'>
                                        <input type="text" className="border p-2 rounded w-full" value={applicant?.app_id} readOnly />
                                    </div>
                                </div>
                                <div className='flex flex-1 gap-4'>
                                    <div className='flex flex-col w-full mb-4'>
                                        <label htmlFor=""><b>Full Name</b></label>
                                        <div className='flex flex-1 gap-3'>
                                            <input type="text" className="border p-2 rounded w-full" value={applicant?.fname} readOnly />
                                            <input type="text" className="border p-2 rounded w-full" value={applicant?.mname} readOnly />
                                            <input type="text" className="border p-2 rounded w-full" value={applicant?.lname} readOnly />
                                            <input type="text" className="border p-2 rounded w-1/5" value={applicant?.suffix} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 gap-4 mb-4 w-full">
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Email</b></label>
                                        <input type="email" className="border p-2 rounded w-full" value={applicant?.email} readOnly />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Job Position</b></label>
                                        <input type="text" className="border p-2 rounded w-full" value={jo?.jobPos} readOnly />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Salary</b></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                ₱
                                            </span>
                                            <input type="number" className="border pl-5 p-2 rounded w-full" value={jo?.salary} readOnly />
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Allowance</b></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                ₱
                                            </span>
                                            <input type="number" className="border pl-5 p-2 rounded w-full" value={jo?.allowance} readOnly />
                                        </div>
                                    </div>
                                </div>

                                <UploadRequirementsSection />
                            </form>
                            <PreEmploymentTableSection />
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
        </div>
    );
}
