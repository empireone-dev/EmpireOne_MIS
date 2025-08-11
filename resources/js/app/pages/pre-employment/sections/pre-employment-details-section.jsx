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

                    <div className="container mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
                        <div className="bg-white shadow-2xl shadow-black rounded-lg p-3 sm:p-6 mt-6 sm:mt-12 w-full max-w-6xl">
                            <div className="flex items-center justify-center p-2 sm:p-3">
                                <img className="w-40 sm:w-52 md:w-60" src="/images/newlogo.png" alt="logo" />
                            </div>
                            <div className='flex text-lg sm:text-xl md:text-2xl items-center justify-center'>
                                <h1><b>APPLICATION DETAILS</b></h1>
                            </div>
                            <form className='border rounded-lg p-2 sm:p-3.5'>
                                <div className='flex flex-col w-full mb-4'>
                                    <label htmlFor="" className="text-sm sm:text-base"><b>Application No.</b></label>
                                    <div className='flex flex-1 gap-3'>
                                        <input type="text" className="border p-2 rounded w-full text-sm sm:text-base" value={applicant?.app_id} readOnly />
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row flex-1 gap-4'>
                                    <div className='flex flex-col w-full mb-4'>
                                        <label htmlFor="" className="text-sm sm:text-base"><b>Full Name</b></label>
                                        <div className='flex flex-1'>
                                            <input 
                                                type="text" 
                                                className="border p-2 rounded w-full text-sm sm:text-base" 
                                                value={`${applicant?.fname || ''} ${applicant?.mname || ''} ${applicant?.lname || ''} ${applicant?.suffix || ''}`.replace(/\s+/g, ' ').trim()} 
                                                readOnly 
                                                placeholder="Full Name" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row flex-1 gap-4 mb-4 w-full">
                                    <div className='flex flex-col w-full mb-2 lg:mb-0'>
                                        <label htmlFor="" className="text-sm sm:text-base"><b>Email</b></label>
                                        <input type="email" className="border p-2 rounded w-full text-sm sm:text-base" value={applicant?.email} readOnly />
                                    </div>
                                    <div className='flex flex-col w-full mb-2 lg:mb-0'>
                                        <label htmlFor="" className="text-sm sm:text-base"><b>Job Position</b></label>
                                        <input type="text" className="border p-2 rounded w-full text-sm sm:text-base" value={jo?.jobPos} readOnly />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row flex-1 gap-4 mb-4 w-full">
                                    <div className='flex flex-col w-full mb-2 sm:mb-0'>
                                        <label htmlFor="" className="text-sm sm:text-base"><b>Salary</b></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-sm sm:text-base">
                                                ₱
                                            </span>
                                            <input type="number" className="border pl-5 p-2 rounded w-full text-sm sm:text-base" value={jo?.salary} readOnly />
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="" className="text-sm sm:text-base"><b>Allowance</b></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-sm sm:text-base">
                                                ₱
                                            </span>
                                            <input type="number" className="border pl-5 p-2 rounded w-full text-sm sm:text-base" value={jo?.allowance} readOnly />
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
