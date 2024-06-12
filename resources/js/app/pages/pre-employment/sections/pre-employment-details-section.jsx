import React, { useState } from 'react';
import { FileJpgOutlined } from '@ant-design/icons';
import PreEmploymentTableSection from './pre-employment-table-section';

export default function PreEmploymentDetailsSection() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleUploadClick = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    
    return (
        <div>
            <div className="h-screen overflow-hidden">
                <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                    
                    <div className="container mx-auto flex justify-center">
                        <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                            <div className="flex items-center justify-center p-3">
                                <img className="w-60" src="images/newlogo.png" alt="logo" />
                            </div>
                            <div className='flex text-2xl items-center justify-center'>
                                <h1><b>APPLICATION DETAILS</b></h1>
                            </div>
                            <form className='border rounded-lg p-3.5'>
                                <div className='flex flex-col w-full mb-4'>
                                    <label htmlFor=""><b>Application No.</b></label>
                                    <div className='flex flex-1 gap-3'>
                                        <input type="text" placeholder="Application No" className="border p-2 rounded w-full" />
                                    </div>
                                </div>
                                <div className='flex flex-1 gap-4'>
                                    <div className='flex flex-col w-full mb-4'>
                                        <label htmlFor=""><b>Full Name</b></label>
                                        <div className='flex flex-1 gap-3'>
                                            <input type="text" placeholder="First name" className="border p-2 rounded w-full" />
                                            <input type="text" placeholder="Middle name" className="border p-2 rounded w-full" />
                                            <input type="text" placeholder="Last name" className="border p-2 rounded w-full" />
                                            <select className="border p-2 rounded  w-1/5">
                                                <option disabled selected>Suffix</option>
                                                <option> Sr.</option>
                                                <option> Jr.</option>
                                                <option> II</option>
                                                <option> III</option>
                                                <option> IV</option>
                                                <option> V</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 gap-4 mb-4 w-full">
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Email</b></label>
                                        <input type="email" placeholder="Email" className="border p-2 rounded w-full" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Job Position</b></label>
                                        <input type="text" placeholder="Job Position" className="border p-2 rounded w-full" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Salary</b></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                ₱
                                            </span>
                                            <input type="number" placeholder="0.00" className="border pl-5 p-2 rounded w-full" readOnly />
                                        </div>
                                    </div>

                                </div>

                                <div className="flex mt-2.5">
                                    <button type="button" id="theme-toggle" onClick={handleUploadClick} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                                        <FileJpgOutlined /> UPLOAD REQUIREMENTS
                                    </button>
                                </div>
                            </form>
                            <PreEmploymentTableSection />
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            {modalVisible && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white sm:p-4 sm:pb-4">
                                <div className="sm:items-start w-full">
                                    <h1 className="text-lg font-medium leading-6 ">UPLOAD REQUIREMENTS</h1>
                                    <hr className="border-gray-300 mb-3" />
                                    <button type="button" onClick={closeModal} className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <div className="mt-3 text-center sm:mt-0  sm:text-left">
                                        <div className="mt-2">
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
                                            <button type="button" className="inline-flex justify-center py-2 mt-2 w-full text-sm font-medium text-white bg-blue-500  rounded-md hover:bg-blue-600 ">
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
