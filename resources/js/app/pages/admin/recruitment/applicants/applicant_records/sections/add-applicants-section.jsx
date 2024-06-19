import Wysiwyg from '@/app/pages/components/wysiwyg';
import UploadResumeSection from '@/app/pages/online_application/sections/upload-resume-section';
import WorkingExperienceSection from '@/app/pages/online_application/sections/working-experience-section';
import { PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { Modal } from 'antd';
import React, { useState } from 'react'

export default function AddApplicantsSection() {
    const [open, setOpen] = useState(false);
    const [showWorkingExperience, setShowWorkingExperience] = useState(false);
    const [showFirstTimeJobseeker, setShowFirstTimeJobseeker] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
  
    const handleWorkingExperienceChange = (e) => {
      setShowWorkingExperience(e.target.checked);
      setShowFirstTimeJobseeker(false);
    };
  
    const handleFirstTimeJobseekerChange = (e) => {
      setShowFirstTimeJobseeker(e.target.checked);
      setShowWorkingExperience(false);
    };
  
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UserPlusIcon className='h-5' />
                    Add New Applicant
                </button>
            </div>
            <Modal
                title=" "
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1500}
                okText="Submit"
                cancelText="Cancel"
            >
                <div className='flex text-2xl items-center justify-center'>
                    <h1><b>APPLICATION FORM</b></h1>
                </div>
                <form className='border rounded-lg p-3.5'>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Site Information</h1>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <select className="border p-2 rounded w-full">
                                <option disabled selected>Select Site</option>
                                <option>San Carlos </option>
                                <option>Carcar </option>
                            </select>
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-6 text-center">Personal Information</h1>
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
                    <div className='flex flex-1 gap-4'>
                        <div className='flex w-full'>
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Gender</b></label>
                                    <select className="border p-2 rounded w-full">
                                        <option disabled selected>Sex</option>
                                        <option> Male</option>
                                        <option> Female</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Date of Birth</b></label>
                                    <input type="date" placeholder="Date of birth" className="border p-2 rounded w-full" />
                                </div>
                                <div className=" w-full">
                                    <label htmlFor=""><b>Email</b></label>
                                    <input type="email" placeholder="Email address" className="border p-2 rounded w-full " />
                                </div>
                                <div className="w-full">
                                    <label htmlFor=""><b>Phone Number</b></label>
                                    <input type="number" placeholder="Phone Number" className="border p-2 rounded w-full " />
                                </div>
                            </div>
                        </div>

                        <div className='flex w-full'>
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Marital Status</b></label>
                                    <select className="border p-2 rounded w-full">
                                        <option disabled selected>Select Status</option>
                                        <option> Single</option>
                                        <option> Married</option>
                                        <option> Widowed</option>
                                        <option> Divorced</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Religion</b></label>
                                    <input type="text" placeholder="Religion" className="border p-2 rounded w-full" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor=""><b>Nationality</b></label>
                                    <input type="text" placeholder="Nationality" className="border p-2 rounded w-full" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mb-4">
                        <label htmlFor=""><b>Mother's Maiden Name</b></label>
                        <input type="text" placeholder="Mothers maiden name" className="border p-2 rounded w-full " />
                    </div>
                    <div className="mb-4">
                        <label htmlFor=""><b>Father's Full Name</b></label>
                        <input type="text" placeholder="Fathers full name" className="border p-2 rounded w-full " />
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>Highest Educational Attainment</b></label>
                            <select className="border p-2 rounded w-full">
                                <option disabled selected>Select Educational Attainment</option>
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
                            <input type="text" placeholder="Course taken" className="border p-2 rounded w-full " />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9">Address Information</h1>
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
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9">Government ID Information</h1>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>SSS No.</b></label>
                            <input type="text" placeholder="SSS No." className="border p-2 rounded w-full " />
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Pag-IBIG No.</b></label>
                            <input type="text" placeholder="Pag-IBIG No." className="border p-2 rounded w-full " />
                        </div>
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>Tin No.</b></label>
                            <input type="text" placeholder="Tin No." className="border p-2 rounded w-full " />
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Philhealth No.</b></label>
                            <input type="text" placeholder="Philhealth No." className="border p-2 rounded w-full " />
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="with-working-experience-checkbox"
                            type="checkbox"
                            value=""
                            checked={showWorkingExperience}
                            onChange={handleWorkingExperienceChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="with-working-experience-checkbox" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"><b>with Working Experience</b></label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="first-time-jobseeker-checkbox"
                            type="checkbox"
                            value=""
                            checked={showFirstTimeJobseeker}
                            onChange={handleFirstTimeJobseekerChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            disabled={showWorkingExperience}
                        />
                        <label htmlFor="first-time-jobseeker-checkbox" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"><b>First Time Jobseeker</b></label>
                    </div>
                    {showWorkingExperience && <WorkingExperienceSection />}
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9">Emergency Contact Information</h1>
                    <div className="mb-4 w-full">
                        <label htmlFor=""><b>Emergency Contact Fullname</b></label>
                        <input type="text" placeholder="Emergency Contact Fullname" className="border p-2 rounded w-full " />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor=""><b>Address</b></label>
                        <input type="text" placeholder="Address" className="border p-2 rounded w-full " />
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <label htmlFor=""><b>Relationship</b></label>
                            <input type="text" placeholder="Relationship" className="border p-2 rounded w-full " />
                        </div>
                        <div className="w-full">
                            <label htmlFor=""><b>Contact No.</b></label>
                            <input type="number" placeholder="Contact No." className="border p-2 rounded w-full " />
                        </div>
                    </div>
                    <UploadResumeSection />
                </form>
            </Modal>
        </div>
    )
}
