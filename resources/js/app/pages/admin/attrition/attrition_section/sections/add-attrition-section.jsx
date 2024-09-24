import { PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import { Modal, Select } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddAttritionSection() {
    const [open, setOpen] = useState(false);
    const { Option } = Select;
    const { employees } = useSelector((state) => state.employees);
    console.log('employees', employees)
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <PlusSquareTwoTone className='text-xl' />
                    Select Employee
                </button>
            </div>
            <Modal
                title="Select Employee Attrition"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Submit"
                cancelText="Cancel"
            >
                <form class="w-full h-full">
                    <div class="flex flex-col -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" htmlFor="employee-select">
                                Employee's Name
                            </label>
                            <Select
                                // showSearch
                                placeholder="Search for an employee"
                                optionFilterProp="children"
                                className="w-full"
                                onChange={(value) => console.log(`Selected: ${value}`)}
                                filterOption={(input, option) =>
                                    typeof option?.children === 'string' && option.children.toLowerCase().includes(input.toLowerCase())
                                }
                                // Additional props for better accessibility
                                dropdownRender={(menu) => (
                                    <>
                                        <div style={{ padding: '8px' }}>
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid #d9d9d9',
                                                    borderRadius: '4px',
                                                    padding: '4px'
                                                }}
                                                onChange={(e) => {
                                                    const value = e.target.value.toLowerCase();
                                                    const filteredOptions = employees
                                                        .slice()
                                                        .sort((a, b) => {
                                                            const nameA = `${a.applicant.fname} ${a.applicant.lname}`.toLowerCase();
                                                            const nameB = `${b.applicant.fname} ${b.applicant.lname}`.toLowerCase();
                                                            return nameA.localeCompare(nameB);
                                                        })
                                                        .filter(employee => {
                                                            const fullName = `${employee.applicant.fname} ${employee.applicant.lname}`.toLowerCase();
                                                            return fullName.includes(value);
                                                        });

                                                    // Update state or trigger any action with filteredOptions
                                                    console.log('Filtered Options:', filteredOptions);
                                                }}
                                            />
                                        </div>
                                        {menu}
                                    </>
                                )}
                            >
                                {employees
                                    .slice()
                                    .sort((a, b) => {
                                        const nameA = `${a.applicant.fname} ${a.applicant.lname}`.toLowerCase();
                                        const nameB = `${b.applicant.fname} ${b.applicant.lname}`.toLowerCase();
                                        return nameA.localeCompare(nameB);
                                    })
                                    .map((employee, index) => (
                                        <Option key={index} value={employee.id}>
                                            {employee.applicant.fname} {employee.applicant.lname}
                                        </Option>
                                    ))}
                            </Select>



                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                Employee No.
                            </label>
                            <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
                        </div>

                        <div className='flex flex-1 '>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    job Position
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Department
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly/>
                            </div>
                        </div>

                        <div className='flex flex-1'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Supervisor
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly/>
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    EOGS Email
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="email" placeholder="" readOnly />
                            </div>
                        </div>

                        <div className='flex flex-1'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Hired Date
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" readOnly/>
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Status
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
                            </div>
                        </div>

                        <div className='flex flex-1'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Separation Date
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Reason for Separation
                                </label>
                                <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                                    <option value=""></option>
                                    <option value="">Resignation</option>
                                    <option value="">Dismissal</option>
                                    <option value="">End of Contract</option>
                                    <option value="">AWOL</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
