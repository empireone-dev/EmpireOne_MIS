import { FileJpgOutlined, LoadingOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import store from '@/app/store/store';
import { sendiv_contract_email_thunk } from '../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import { message } from 'antd';
import UploadQuitClaimSection from './upload-quit-claim-section';

export default function QuitClaimUploadSection() {
    const { applicant } = useSelector((state) => state.final_rate);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);
    const jo = applicant?.joboffer?.find((res) => res.status == "Contract Signing");
    const job_offer_id = window.location.pathname.split('/')[3];
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
        fd.append('job_offer_id', job_offer_id);

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
                                <h1><b>UPLOAD SIGNED QUIT CLAIM</b></h1>
                            </div>
                            <form className='border rounded-lg p-3.5' onSubmit={upload_contract}>
                                <div className='flex flex-col w-full mb-4'>
                                    <label htmlFor=""><b>Employee No.</b></label>
                                    <div className='flex flex-1 gap-3'>
                                        <input
                                            value={applicant?.app_id}
                                            type="text" placeholder="Employee No" className="border p-2 rounded w-full" />
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
                                <div className='flex flex-1 gap-4 mb-1 w-full'>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Job Position</b>
                                        </label>
                                        <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Department</b>
                                        </label>
                                        <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly />
                                    </div>
                                    {/* <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.account} readOnly />
                            </div> */}
                                </div>

                                <div className='flex flex-1 gap-4 mb-1 w-full'>
                                    {/* <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Supervisor
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.sup_id} readOnly />
                            </div> */}
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>EOGS Email</b>
                                        </label>
                                        <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" readOnly />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Employment Status</b>
                                        </label>
                                        <input className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" readOnly />
                                    </div>
                                </div>

                                <div className='flex flex-1 gap-4 mb-1 w-full'>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Hired Date</b>
                                        </label>
                                        <input className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Separation Date</b>
                                        </label>
                                        <input className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly />
                                    </div>
                                </div>

                                <div className='flex flex-1 gap-4 w-full'>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Reason for Separation</b>
                                        </label>
                                        <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly />
                                    </div>
                                    <div class="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Reason for End of Contract</b>
                                        </label>
                                        <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Exit Interview & Clearance Status</b>
                                        </label>
                                        <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" readOnly />
                                    </div>
                                </div>
                                <UploadQuitClaimSection
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
                                        {loading ? " SENDING..." : " UPLOAD"}
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
