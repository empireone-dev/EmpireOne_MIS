import React from 'react'
import TableRowComponent from '../../exit_interview/components/table-row-component'

export default function ExitClearanceForm() {
    return (
        <div className="h-screen overflow-hidden ">
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto flex justify-center">
                    <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                        <div className="flex items-center justify-center p-3">
                            <img className="w-60" src="images/newlogo.png" alt="logo" />
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
                                            <input type="text" placeholder="Full name" className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Account / Department:</b></label>
                                            <input type="text" placeholder="Account / Department:" className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Date Hired:</b></label>
                                            <input type="date" placeholder="Date Hired:" className="border p-2 rounded w-full" />
                                        </div>
                                        <div className=" w-full">
                                            <label htmlFor=""><b>Immediate Supervisor:</b></label>
                                            <input type="text" placeholder="Immediate Supervisor:" className="border p-2 rounded w-full " />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor=""><b>Employment Status:</b></label>
                                            <input type="text" placeholder="Employment Status:" className="border p-2 rounded w-full " />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>ID Number:</b></label>
                                            <input type="text" placeholder="Full name" className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Position Title:</b></label>
                                            <input type="text" placeholder="Position Title:" className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Date Separated:</b></label>
                                            <input type="date" placeholder="Date Separated:" className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Department Manager:</b></label>
                                            <input type="text" placeholder="" className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Reason for Separation::</b></label>
                                            <input type="text" placeholder="" className="border p-2 rounded w-full" />
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
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                        </tr>
                                        <tr class="border border-gray-300 py-2">
                                            <td className="border border-gray-300 py-2">
                                                Employee Dept. Head
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                        </tr>
                                        <tr class="border border-gray-300 py-2">
                                            <td className="border border-gray-300 py-2">
                                                HR/Admin
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                        </tr>
                                        <tr class="border border-gray-300 py-2">
                                            <td className="border border-gray-300 py-2">
                                                IT (Biometrics, Laptop)
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
                                            </td>
                                            <td className="border border-gray-300 py-2 p-4">
                                                <input type="text" className="border p-2 rounded w-full" />
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
                                            <input type="text" value={"System Administrator"} className="border p-2 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Conforme:</b></label>
                                            <input type="text" value={"HR"} className="border p-2 rounded w-full" />
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
