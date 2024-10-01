import { FileJpgOutlined } from '@ant-design/icons'
import React from 'react'
import UploadContractSection from './upload-contract-section'
import { useSelector } from 'react-redux';

export default function VirtualContractSection() {
    const { applicant } = useSelector((state) => state.final_rate);
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
                                <h1><b>VIRTUAL CONTRACT SIGNING</b></h1>
                            </div>
                            <form className='border rounded-lg p-3.5'>
                                <div className='flex flex-col w-full mb-4'>
                                    <label htmlFor=""><b>Application No.</b></label>
                                    <div className='flex flex-1 gap-3'>
                                        <input
                                            value={applicant?.app_id}
                                            type="text" placeholder="Application No" className="border p-2 rounded w-full" />
                                    </div>
                                </div>
                                <div className='flex flex-1 gap-4'>
                                    <div className='flex flex-col w-full mb-4'>
                                        <label htmlFor=""><b>Full Name</b></label>
                                        <div className='flex flex-1 gap-3'>
                                            <input type="text" value={applicant?.fname} className="border p-2 rounded w-full" />
                                            <input type="text" value={applicant?.mname} className="border p-2 rounded w-full" />
                                            <input type="text" value={applicant?.lname} className="border p-2 rounded w-full" />
                                            <input type="text" value={applicant?.suffix} className="border p-2 rounded w-1/5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 gap-4 mb-4 w-full">
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Email</b></label>
                                        <input type="email" value={applicant?.email} className="border p-2 rounded w-full" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Job Position</b></label>
                                        <input type="text" value={applicant?.joboffer?.jobPos} className="border p-2 rounded w-full" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Salary</b></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                ₱
                                            </span>
                                            <input type="number" value={applicant?.joboffer?.salary} className="border pl-5 p-2 rounded w-full" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <UploadContractSection />
                                <div className="flex mt-4">
                                    <button type="button" id="theme-toggle" className="px-4 py-2 w-full rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                                        <FileJpgOutlined /> UPLOAD CONTRACT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
