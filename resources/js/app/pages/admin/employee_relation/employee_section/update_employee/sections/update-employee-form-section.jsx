import Input from '@/app/pages/_components/input';
import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import UpdateEmployeeAddressSection from './update-employee-address-section';

export default function UpdateEmployeeFormSection() {
    const { applicant } = useSelector((state) => state.final_rate);
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const { users } = useSelector((state) => state.app);
    // const { employees } = useSelector((state) => state.employees);

    console.log('applicant', applicant)
    return (
        <div>
            <div className='flex text-2xl items-center justify-center'>
                <h1><b>Personal Information</b></h1>
            </div>
            <form className='border rounded-lg p-3.5'>
                <h1 className="text-xl font-semibold mb-3 text-gray-900  text-center"></h1>
                <div className='mb-4'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Employee No.</b></label>
                        <input type="text" value={applicant?.app_id} className="border p-2 rounded w-full" readOnly />
                    </div>
                </div>
                <div className='flex flex-1 gap-4'>
                    <div className='flex flex-col w-full mb-4'>
                        <label htmlFor=""><b>Full Name</b></label>
                        <div className='flex flex-1 gap-3'>
                            <input type="text" value={applicant?.fname} className="border p-2 rounded w-full" />
                            <input type="text" value={applicant?.mname} className="border p-2 rounded w-full" />
                            <input type="text" value={applicant?.lname} className="border p-2 rounded w-full" />
                            <select className="border p-2 rounded  w-1/5">
                                <option disabled selected>{applicant?.suffix}</option>
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
                                    <option disabled selected>{applicant?.gender}</option>
                                    <option> Male</option>
                                    <option> Female</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Date of Birth</b></label>
                                <input type="date" value={applicant?.dob} className="border p-2 rounded w-full" />
                            </div>
                            <div className=" w-full">
                                <label htmlFor=""><b>Email</b></label>
                                <input type="email" value={applicant?.email} className="border p-2 rounded w-full " />
                            </div>
                            <div className="w-full">
                                <label htmlFor=""><b>Phone Number</b></label>
                                <input type="number" value={applicant?.phone} className="border p-2 rounded w-full " />
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <div className="flex flex-col gap-4 mb-4 w-full">
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Marital Status</b></label>
                                <select className="border p-2 rounded w-full">
                                    <option disabled selected>{applicant?.marital}</option>
                                    <option> Single</option>
                                    <option> Married</option>
                                    <option> Widowed</option>
                                    <option> Divorced</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Religion</b></label>
                                <input type="text" value={applicant?.religion} className="border p-2 rounded w-full" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Nationality</b></label>
                                <input type="text" value={applicant?.nationality} className="border p-2 rounded w-full" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mb-4">
                    <label htmlFor=""><b>Mother's Maiden Name</b></label>
                    <input type="text" value={applicant?.mmname} className="border p-2 rounded w-full " />
                </div>
                <div className="mb-4">
                    <label htmlFor=""><b>Father's Full Name</b></label>
                    <input type="text" value={applicant?.ffname} className="border p-2 rounded w-full " />
                </div>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>Highest Educational Attainment</b></label>
                        <select className="border p-2 rounded w-full">
                            <option disabled selected>{applicant?.educ}</option>
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
                        <input type="text" value={applicant?.courset} className="border p-2 rounded w-full " />
                    </div>
                </div>

                <div className='flex flex-1 gap-4'>
                    <div className='flex flex-col w-full mb-4'>
                        <div className='flex flex-1 gap-3'>
                            <select
                                onChange={(event) => data_handler(event)}
                                name='position'
                                className="border p-2 rounded  w-full">
                                <option disabled selected>Job Position</option>
                                {
                                    job_positions
                                        .filter(res => res.site === "San Carlos")
                                        .map((res, i) => (
                                            <option value={res.jPosition} key={i}>
                                                {res.jPosition}
                                            </option>
                                        ))
                                }
                            </select>
                            <select
                                onChange={(event) => data_handler(event)}
                                name='dept'
                                className="border p-2 rounded  w-full">
                                <option disabled selected>Department</option>
                                {
                                    departments
                                        .filter(res => res.site === "San Carlos")
                                        .map((res, i) => (
                                            <option value={res.dept} key={i}>
                                                {res.dept}
                                            </option>
                                        ))
                                }
                            </select>
                            <select
                                onChange={(event) => data_handler(event)}
                                name='account'
                                className="border p-2 rounded  w-full">
                                <option disabled selected>Account (If Applicable)</option>
                                {
                                    accounts
                                        // .filter(res => res.site === "San Carlos")
                                        .map((res, i) => (
                                            <option value={res.acc} key={i}>
                                                {res.acc}
                                            </option>
                                        ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex flex-1 gap-4'>
                    <div className='flex flex-col w-full mb-4'>
                        <div className='flex flex-1 gap-3'>
                            <select
                                onChange={(event) => data_handler(event)}
                                name='sup_id'
                                value={applicant.sup_id}
                                className="border p-2 rounded  w-full">
                                <option disabled selected>Supervisor</option>
                                {
                                    users
                                        .filter(
                                            (res) =>
                                                res.site === "San Carlos" &&
                                                ["Manager", "Account Manager", "Supervisor", "Team Leader", "Director", "CEO"].includes(res.position)
                                        )
                                        .map((res) => (
                                            <option value={res.id} key={res.id}>
                                                {res.employee_fname} {res.employee_lname}
                                            </option>
                                        ))
                                }
                            </select>
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicant.hired ?? ""}
                                name="hired"
                                label="Hired Date"
                                type="date"
                            />
                            <select
                                onChange={(event) => data_handler(event)}
                                name='status'
                                className="border p-2 rounded  w-full">
                                <option disabled selected>Status</option>
                                <option> Probationary</option>
                                <option> Regular</option>
                            </select>
                        </div>
                    </div>
                </div>


                <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Address Information</h1>
                <div className="flex flex-1 gap-1 mb-4 w-full">
                    <div className='flex flex-col w-full'>
                        <div className='flex'>
                            <input type="text" value={applicant?.caddress} className="border p-2 rounded w-full" readOnly />
                            <UpdateEmployeeAddressSection />
                        </div>
                    </div>
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-6">Government ID Information</h1>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>SSS No.</b></label>
                        <input type="text" value={applicant?.sss} className="border p-2 rounded w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Pag-IBIG No.</b></label>
                        <input type="text" value={applicant?.pagibig} className="border p-2 rounded w-full " />
                    </div>
                </div>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>Tin No.</b></label>
                        <input type="text" value={applicant?.tin} className="border p-2 rounded w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Philhealth No.</b></label>
                        <input type="text" value={applicant?.philh} className="border p-2 rounded w-full " />
                    </div>
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Emergency Contact Information</h1>
                <div className="mb-4 w-full">
                    <label htmlFor=""><b>Emergency Contact Fullname</b></label>
                    <input type="text" value={applicant?.ename} className="border p-2 rounded w-full " />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor=""><b>Address</b></label>
                    <input type="text" value={applicant?.eaddress} className="border p-2 rounded w-full " />
                </div>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>Relationship</b></label>
                        <input type="text" value={applicant?.relationship} className="border p-2 rounded w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Contact No.</b></label>
                        <input type="number" value={applicant?.ephone} className="border p-2 rounded w-full " />
                    </div>
                </div>
                <div className='flex gap-2 justify-end items-center mt-6'>
                    <button className='hover:bg-slate-300 p-2 rounded-md'>
                        Cancel
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md'>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
