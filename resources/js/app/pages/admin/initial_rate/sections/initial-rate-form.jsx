import { UserGroupIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function InitialRateForm() {
    return (
        <div>
            <div className='flex text-xl items-center justify-center mb-1'>
                <h1><b>Initial Rating Scale</b></h1>
            </div>
            <form className='border rounded-lg p-3.5'>
                <div className='flex flex-1 gap-3.5'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Application No.</b></label>
                        <input type="number" placeholder="" className="border p-2 rounded w-full" readOnly />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Applicant's Name</b></label>
                        <input type="text" placeholder="" className="border p-2 rounded w-full" readOnly />
                    </div>
                </div>

                <div className="flex items-center mt-3 mb-2">
                    <UserGroupIcon className="h-6" />
                    <h1 className="text-xl ml-1 font-bold">TEAMWORK/ INTERPERSONAL SKILLS</h1>
                </div>
                <hr className='bg-gray-400 mb-3'>
                </hr>
                <div>
                    <label htmlFor=""><b>TEAMWORK/ INTERPERSONAL SKILLS SCORE</b></label>
                    <div className='flex flex-1 w-full gap-8 mt-1'>
                        <h1 className='w-full'><input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" /> 1 - Very Satisfied,</h1>
                        <h1 className='w-full'><input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" /> 1 - Very Satisfied,</h1>
                        <h1 className='w-full'><input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" /> 1 - Very Satisfied,</h1>
                        <h1 className='w-full'><input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" /> 1 - Very Satisfied,</h1>
                        <h1 className='w-full'><input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" /> 1 - Very Satisfied,</h1>
                    </div>
                </div>
                {/* <div className='flex flex-1 gap-4'>
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
                <div className="flex justify-end mt-2.5">
                    <button type="button" id="theme-toggle" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                        SUBMIT
                    </button>
                </div> */}
            </form>
        </div>
    )
}
