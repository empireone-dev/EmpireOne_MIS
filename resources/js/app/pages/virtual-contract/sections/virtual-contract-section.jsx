import { FileJpgOutlined, LoadingOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import UploadContractSection from './upload-contract-section'
import { useSelector } from 'react-redux';
import store from '@/app/store/store';
import { sendiv_contract_email_thunk } from '../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import { message } from 'antd';

export default function VirtualContractSection() {
    const { applicant } = useSelector((state) => state.final_rate);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);
    const jo = applicant?.joboffer?.find((res) => res.status == "Contract Signing");
    console.log('file', file)
    async function upload_contract(e) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('phase_status', 'upload_contract');
        fd.append('jobPos', jo?.jobPos);
        fd.append('salary', jo?.salary);
        fd.append('app_id', applicant?.app_id);
        fd.append('fname', applicant?.fname);
        fd.append('lname', applicant?.lname);
        fd.append('email', applicant?.email);

        try {

            await store.dispatch(
                sendiv_contract_email_thunk(fd)
            );
            setLoading(false);
            message.success("File Uploaded");
        } catch (error) {
            message.error("There was an error uploading the file!");
            setLoading(false);
        }
    }

    console.log('jo', jo)
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
                            <form className='border rounded-lg p-3.5' onSubmit={upload_contract}>
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
                                        <input type="text" value={jo?.jobPos} className="border p-2 rounded w-full" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor=""><b>Salary</b></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                ₱
                                            </span>
                                            <input type="number" value={jo?.salary} className="border pl-5 p-2 rounded w-full" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <UploadContractSection
                                    uploadedFile={uploadedFile}
                                    setFile={setFile}
                                    setUploadedFile={setUploadedFile}

                                />

                                <div className="flex mt-4">
                                    <button
                                        type="submit"
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                                            }`}
                                        onClick={upload_contract}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <LoadingOutlined spin />
                                        ) : (
                                            <FileJpgOutlined />
                                        )}
                                        {loading ? " SENDING..." : " UPLOAD CONTRACT"}
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
