import { SignatureOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import UploadSignatureSection from './upload-signature-section';
import { useEffect } from 'react';
import { get_user_thunk } from '@/app/redux/app-thunk';
import { get_users_thunk } from '@/app/pages/redux/app-thunk';
import store from '@/app/store/store';

export default function ExitClearanceForm() {
    const { employee } = useSelector((state) => state.employees);
    const { user } = useSelector((state) => state.app);

    useEffect(() => {
        store.dispatch(get_users_thunk());
        console.log('waaaa', user)
        store.dispatch(get_user_thunk());
    }, [user.id]);

    console.log('usersss', user)
    return (
        <div className="h-screen overflow-hidden ">
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto flex justify-center">
                    <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                        <div className="flex items-center justify-center p-3">
                            <img className="w-60" src="/images/newlogo.png" alt="logo" />
                        </div>
                        <div className='flex text-2xl items-center justify-center'>
                            <h1><b>EXIT CLEARANCE</b></h1>
                        </div>
                        <form className='border rounded-lg p-3.5'>
                            <div className='flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Full Name:</b></label>
                                            <input type="text" value={`${employee?.applicant?.fname || ''} ${employee?.applicant?.mname || ''} ${employee?.applicant?.lname || ''}`} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Account / Department:</b></label>
                                            <input type="text" value={employee?.account ? employee?.account : employee?.dept?.dept} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Date Hired:</b></label>
                                            <input type="date" value={employee?.hired || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className=" w-full">
                                            <label htmlFor=""><b>Immediate Supervisor:</b></label>
                                            <input type="text" value={`${employee?.user?.employee_fname || ''} ${employee?.user?.employee_mname || ''} ${employee?.user?.employee_lname || ''}`} className="border p-2 rounded w-full " />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor=""><b>Employment Status:</b></label>
                                            <input type="text" value={employee?.status || ''} className="border p-2 rounded w-full " />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>ID Number:</b></label>
                                            <input type="text" value={employee?.app_id || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Position Title:</b></label>
                                            <input type="text" value={employee?.position || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Date Separated:</b></label>
                                            <input type="date" value={employee?.attrition?.separation || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Department Manager:</b></label>
                                            <input type="text" value={`${employee?.dept?.user?.employee_fname || ''} ${employee?.dept?.user?.employee_lname || ''}`} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Reason for Separation::</b></label>
                                            <input type="text" value={employee?.attrition?.reas || ''} className="border p-2 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className='mt-5 mb-1'>We are here to certify that the above employee is cleared with any accountability or financial obligation to the following:</p>
                            <div className='flex flex-1 gap-4 border-4 border-gray-400 mb-3'>
                                <table class="table table-bordered text-center w-full">
                                    <thead className='border-b-2 border-gray-300 w-full'>
                                        <tr>
                                            <th className="border border-gray-300 py-2">Department</th>
                                            <th className="border border-gray-300 py-2">Signature</th>
                                            <th className="border border-gray-300 py-2">Date Signed</th>
                                            <th className="border border-gray-300 py-2">Payables</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border border-gray-300 py-2">
                                            <td className="border border-gray-300 py-2">
                                                Immediate Supervisor
                                            </td>
                                            <td className="flex gap-2 border border-gray-300 py-2 p-4">
                                                <div className="border p-2 rounded w-full">
                                                    <canvas id="signatureCanvas" className="w-24 h-8"></canvas>
                                                </div>
                                                <UploadSignatureSection />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="date" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                        </tr>
                                        <tr class="border border-gray-300 py-2">
                                            <td className="border border-gray-300 py-2">
                                                Employee Dept. Head
                                            </td>
                                            <td className="flex gap-2 border border-gray-300 py-2 p-4">
                                                <div className="border p-2 rounded w-full">
                                                    <canvas id="signatureCanvas" className="w-24 h-8"></canvas>
                                                </div>
                                                <UploadSignatureSection />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="date" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                        </tr>
                                        <tr class="border border-gray-300 py-2">
                                            <td className="border border-gray-300 py-2">
                                                HR/Admin
                                            </td>
                                            <td className="flex gap-2 border border-gray-300 py-2 p-4">
                                                <div className="border p-2 rounded w-full">
                                                    <canvas id="signatureCanvas" className="w-full h-8"></canvas>
                                                </div>
                                                <UploadSignatureSection />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="date" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                        </tr>
                                        <tr class="border border-gray-300 py-2">
                                            <td className="border border-gray-300 py-2">
                                                IT (Biometrics, Laptop)
                                            </td>
                                            <td className="flex gap-2 border border-gray-300 py-2 p-4">
                                                <div className="border p-2 rounded w-full">
                                                    <canvas id="signatureCanvas" className="w-full h-8"></canvas>
                                                </div>
                                                <UploadSignatureSection />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="date" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='flex flex-1 gap-4 mb-3 mt-8'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Exit Clearance Conducted By:</b></label>
                                            <input type="text" value={`${user?.employee_fname || ''} ${user?.employee_lname || ''}`} className="border p-2 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Conforme:</b></label>
                                            <input type="text" value={user?.department || ''} className="border p-2 rounded w-full" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-end mt-2.5">
                                <button type="button" id="theme-toggle" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                                    SUBMIT EXIT CLEARANCE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
