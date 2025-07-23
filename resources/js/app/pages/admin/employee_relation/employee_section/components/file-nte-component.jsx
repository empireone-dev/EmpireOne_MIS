import { Menu, Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function FileNteComponent({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const { user } = useSelector((state) => state.app);

    // Get today's date in YYYY-MM-DD format
    const today = (() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    })();

    function openHandler() {
        setStatusModalOpen(true);
    }

    return (
        <>
            <Menu.Item onClick={openHandler} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Notice to Explain"
                visible={statusModalOpen}
                onOk={() => setStatusModalOpen(false)}
                onCancel={() => setStatusModalOpen(false)}
                width={1000}
                okText="Update"
                cancelText="Cancel"
                footer={null}
            >
                <form className="w-full h-full">
                    <div className="flex flex-col -mx-3">
                        <div className='flex flex-1'>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Employee
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="employee-name"
                                    type="text"
                                    value={`${data?.applicant?.fname} ${data?.applicant?.mname} ${data?.applicant?.lname}`}
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Date
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="date-input"
                                    type="text"
                                    value={today}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Department
                            </label>
                            <input
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="department-input"
                                type="text"
                                value={data?.dept}
                                readOnly
                            />
                        </div>
                        <hr className="border-t border-black px-4 mt-2" />
                        <div className='mt-2 px-3'>
                            <h1><b>Type of Violation</b></h1>
                            <div className='flex flex-1 gap-3 w-full mt-2'>
                                <div class="flex items-center mb-1 w-full">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Attendance</label>
                                </div>
                                <div class="flex items-center mb-1 w-full">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Conduct and Etiquette</label>
                                </div>
                                <div class="flex items-center mb-1 w-full">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Company’s Productivity</label>
                                </div>
                            </div>
                            <div className='flex flex-1 gap-3 w-full mt-2 mb-3'>
                                <div class="flex items-center mb-1 w-full">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Health and Security</label>
                                </div>
                                <div class="flex items-center mb-1 w-full">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Company’s Facilities and Properties</label>
                                </div>
                                <div class="flex items-center mb-1 w-full">
                                    {/* <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 " />
                                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Default checkbox</label> */}
                                </div>
                            </div>
                        </div>
                        <hr className="border-t border-black mb-2" />
                        <div className='flex flex-1'>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Date of Violation
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="violation-date-input"
                                    type="date"
                                    placeholder=""
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Place of Violation
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => handleStatusChange(e.target.value)} // Add your change handler here
                                >
                                    <option value="" disabled>Select Site</option>
                                    <option value="San Carlos Site">San Carlos Site</option>
                                    <option value="Carcar Site">Carcar Site</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Employer Statement
                            </label>
                            <textarea
                                className="appearance-none block w-full h-60 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="employer-statement-input"
                                placeholder=""
                            />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Filed By
                            </label>
                            <input
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="filed-by-input"
                                type="text"
                                value={`${user.employee_fname} ${user.employee_lname}`}
                                readOnly
                            />
                        </div>
                        <div className='flex items-center justify-center p-1.5 px-2 mt-1'>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white w-full p-1.5 rounded-md'>
                                GENERATE NTE
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
