import { EditFilled, EditOutlined } from '@ant-design/icons';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Input, Menu, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'

export default function UpdateEmployeeComponent({ data, item }) {

    const [modalOpen, setModalOpen] = useState(false);
    function openHandler(params) {
        setModalOpen(true);
    }

    console.log('data', data)
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Update Employee"
                visible={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                width={1200}
                okText="Save Changes"
                cancelText="Cancel"
            >
                <div className='flex text-2xl items-center justify-center'>
                    <h1><b>Personal Information</b></h1>
                </div>
                <form className='border rounded-lg p-3.5'>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  text-center"></h1>
                    <div className='mb-4'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor=""><b>Employee No.</b></label>
                            <input type="text" value={data?.emp_id} className="border p-2 rounded w-full" readOnly />
                        </div>
                    </div>
                    <div className='flex flex-1 gap-4'>
                        <div className='flex flex-col w-full mb-4'>
                            <label htmlFor=""><b>Full Name</b></label>
                            <div className='flex flex-1 gap-3'>
                                <input type="text" value={data?.applicant?.fname} className="border p-2 rounded w-full" />
                                <input type="text" value={data?.applicant?.mname} className="border p-2 rounded w-full" />
                                <input type="text" value={data?.applicant?.lname} className="border p-2 rounded w-full" />
                                <select className="border p-2 rounded  w-1/5">
                                    <option disabled selected>{data?.applicant?.suffix}</option>
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
                    <div className='flex flex-1 gap-4'>
                        <div className='flex w-full'>
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Gender</b></label>
                                    <select className="border p-2 rounded w-full">
                                        <option disabled selected>{data?.applicant?.gender}</option>
                                        <option> Male</option>
                                        <option> Female</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Date of Birth</b></label>
                                    <input type="date" value={data?.applicant?.dob} className="border p-2 rounded w-full" />
                                </div>
                                <div className=" w-full">
                                    <label htmlFor=""><b>Email</b></label>
                                    <input type="email" value={data?.applicant?.email} className="border p-2 rounded w-full " />
                                </div>
                                <div className="w-full">
                                    <label htmlFor=""><b>Phone Number</b></label>
                                    <input type="number" value={data?.applicant?.phone} className="border p-2 rounded w-full " />
                                </div>
                            </div>
                        </div>

                        <div className='flex w-full'>
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Marital Status</b></label>
                                    <select className="border p-2 rounded w-full">
                                        <option disabled selected>{data?.applicant?.marital}</option>
                                        <option> Single</option>
                                        <option> Married</option>
                                        <option> Widowed</option>
                                        <option> Divorced</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Religion</b></label>
                                    <input type="text" value={data?.applicant?.religion} className="border p-2 rounded w-full" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Nationality</b></label>
                                    <input type="text" value={data?.applicant?.nationality} className="border p-2 rounded w-full" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mb-4">
                        <label htmlFor=""><b>Mother's Maiden Name</b></label>
                        <input type="text" value={data?.applicant?.mmname} className="border p-2 rounded w-full " />
                    </div>
                    <div className="mb-4">
                        <label htmlFor=""><b>Father's Full Name</b></label>
                        <input type="text" value={data?.applicant?.ffname} className="border p-2 rounded w-full " />
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>Highest Educational Attainment</b></label>
                            <select className="border p-2 rounded w-full">
                                <option disabled selected>{data?.applicant?.educ}</option>
                                <option> Elementary Undergraduate</option>
                                <option> Elementary Graduate</option>
                                <option> Highschool/K-12 Undergraduate</option>
                                <option> Highschool/K-12 Graduate</option>
                                <option> College Level</option>
                                <option> College Graduate</option>
                                <option> Vocational Graduate</option>
                                <option> Masteral Degree</option>
                                <option> Doctoral Degree</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Course Taken (Only if Applicable)</b></label>
                            <input type="text" value={data?.applicant?.courset} className="border p-2 rounded w-full " />
                        </div>
                    </div>

                    <div className='flex flex-1 gap-4'>
                        <div className='flex flex-col w-full mb-4'>
                            <div className='flex flex-1 gap-3'>
                                <select
                                    // onChange={(event) => data_handler(event)}
                                    name='suffix'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>{data?.position}</option>
                                    <option> Sr.</option>
                                    <option> Jr.</option>
                                    <option> II</option>
                                    <option> III</option>
                                    <option> IV</option>
                                    <option> V</option>
                                </select>
                                <select
                                    // onChange={(event) => data_handler(event)}
                                    name='suffix'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>{data?.dept}</option>
                                    <option> Sr.</option>
                                    <option> Jr.</option>
                                    <option> II</option>
                                    <option> III</option>
                                    <option> IV</option>
                                    <option> V</option>
                                </select>
                                <select
                                    // onChange={(event) => data_handler(event)}
                                    name='suffix'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>{data?.account}</option>
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
                    <div className='flex flex-1 gap-4'>
                        <div className='flex flex-col w-full mb-4'>
                            <div className='flex flex-1 gap-3'>
                                <select
                                    // onChange={(event) => data_handler(event)}
                                    name='suffix'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>{data?.sup_id}</option>
                                    <option> Sr.</option>
                                    <option> Jr.</option>
                                    <option> II</option>
                                    <option> III</option>
                                    <option> IV</option>
                                    <option> V</option>
                                </select>
                                <Input
                                    // onChange={(event) => data_handler(event)}
                                    // value={applicantForm.hired ?? ""}
                                    value={data?.hired}
                                    name="hired"
                                    label="Hired Date"
                                    type="date"
                                />
                                <select
                                    // onChange={(event) => data_handler(event)}
                                    name='suffix'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>{data?.status}</option>
                                    <option> Probationary</option>
                                    <option> Regular</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Address Information</h1>
                    <div className="flex flex-1 gap-1 mb-4 w-full">
                        <div className='flex flex-col w-full'>
                            <label htmlFor=""><b>Address</b></label>
                            <input type="text" value={data?.applicant?.caddress} className="border p-2 rounded w-full" readOnly />
                        </div>
                        <Tooltip title="Update New Address">
                                <button className='text-xl'><EditOutlined /></button>
                        </Tooltip>

                    </div>
                    <div className="flex flex-1 gap-4 mb-4 w-full">
                        <div className='flex flex-col w-full'>
                            <label htmlFor=""><b>Region</b></label>
                            <input type="text" placeholder="Region" className="border p-2 rounded w-full" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor=""><b>Province</b></label>
                            <input type="text" placeholder="Province" className="border p-2 rounded w-full" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor=""><b>City/Municipality</b></label>
                            <input type="text" placeholder="City/Municipality" className="border p-2 rounded w-full" />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className='flex flex-col  w-1/2'>
                            <label htmlFor=""><b>Barangay</b></label>
                            <input type="text" placeholder="Barangay" className="border p-2 rounded w-full" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor=""><b>House/Lot No., Street, Purok/Sitio</b></label>
                            <input type="text" placeholder="House/Lot No., Street, Purok/Sitio" className="border p-2 rounded w-full " />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Government ID Information</h1>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>SSS No.</b></label>
                            <input type="text" value={data?.applicant?.sss} className="border p-2 rounded w-full " />
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Pag-IBIG No.</b></label>
                            <input type="text" value={data?.applicant?.pagibig} className="border p-2 rounded w-full " />
                        </div>
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>Tin No.</b></label>
                            <input type="text" value={data?.applicant?.tin} className="border p-2 rounded w-full " />
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Philhealth No.</b></label>
                            <input type="text" value={data?.applicant?.philh} className="border p-2 rounded w-full " />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Emergency Contact Information</h1>
                    <div className="mb-4 w-full">
                        <label htmlFor=""><b>Emergency Contact Fullname</b></label>
                        <input type="text" value={data?.applicant?.ename} className="border p-2 rounded w-full " />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor=""><b>Address</b></label>
                        <input type="text" value={data?.applicant?.eaddress} className="border p-2 rounded w-full " />
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>Relationship</b></label>
                            <input type="text"value={data?.applicant?.relationship} className="border p-2 rounded w-full " />
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Contact No.</b></label>
                            <input type="number" value={data?.applicant?.ephone} className="border p-2 rounded w-full " />
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
