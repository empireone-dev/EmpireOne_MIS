import { PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import { Modal } from 'antd';
import React, { useState } from 'react'

export default function AddExistingPositionSection() {
    const [open, setOpen] = useState(false);
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-e-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <PlusSquareTwoTone className='text-xl' />
                    Request Existing Position
                </button>
            </div>
            <Modal
                title="Existing Position"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1200}
                okText="Save"
                cancelText="Cancel"
            >
                <form class="w-full mt-5">
                    <div class="flex flex-col -mx-3 mb-6 px-3">
                        <h1 className="text-lg font-semibold mb-1.5 text-gray-900 dark:text-gray-100 text-center">Personal Information</h1>
                        <div className='flex flex-1 gap-4 '>
                            <div className='flex flex-col w-full mb-4'>
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1" for="grid-password">
                                    Full Name
                                </label>
                                <div className='flex flex-1 gap-2.5'>
                                    <input type="text" placeholder="First name" className="border p-2 rounded w-full" />
                                    <input type="text" placeholder="Middle name" className="border p-2 rounded w-full" />
                                    <input type="text" placeholder="Last name" className="border p-2 rounded w-full" />
                                    <select className="border p-2 rounded  w-1/4">
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
                                        <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Gender</label>
                                        <select className="border p-2 rounded w-full">
                                            <option disabled selected>Sex</option>
                                            <option> Male</option>
                                            <option> Female</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Date of Birth</label>
                                        <input type="date" placeholder="Date of birth" className="border p-2 rounded w-full" />
                                    </div>
                                    <div className=" w-full">
                                        <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Email</label>
                                        <input type="email" placeholder="Email address" className="border p-2 rounded w-full " />
                                    </div>
                                    <div className="w-full">
                                        <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Phone Number</label>
                                        <input type="number" placeholder="Phone Number" className="border p-2 rounded w-full " />
                                    </div>
                                </div>
                            </div>

                            <div className='flex w-full'>
                                <div className="flex flex-col gap-4 mb-4 w-full">
                                    <div className='flex flex-col w-full'>
                                        <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Marital Status</label>
                                        <select className="border p-2 rounded w-full">
                                            <option disabled selected>Select Status</option>
                                            <option> Single</option>
                                            <option> Married</option>
                                            <option> Widowed</option>
                                            <option> Divorced</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Religion</label>
                                        <input type="text" placeholder="Religion" className="border p-2 rounded w-full" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Nationality</label>
                                        <input type="text" placeholder="Nationality" className="border p-2 rounded w-full" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mb-4">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Mother's Maiden Name</label>
                            <input type="text" placeholder="Mothers maiden name" className="border p-2 rounded w-full " />
                        </div>
                        <div className="mb-4">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Father's Full Name</label>
                            <input type="text" placeholder="Fathers full name" className="border p-2 rounded w-full " />
                        </div>
                        <div className='flex flex-1 gap-4 mb-4'>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Highest Educational Attainment</label>
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
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Course Taken (Only if Applicable)</label>
                                <input type="text" placeholder="Course taken" className="border p-2 rounded w-full " />
                            </div>
                        </div>

                        <div className='flex flex-1 gap-4 '>
                            <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    job Position
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
                            </div>
                            <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Department
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
                            </div>
                            <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-1 gap-4'>
                            <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Supervisor
                                </label>
                                <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-1 gap-4'>
                            <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Hired Date
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" />
                            </div>
                            <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Status
                                </label>
                                <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                                    <option value="">Probationary</option>
                                    <option value="">Regular</option>
                                </select>
                            </div>
                        </div>

                        <h1 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-4">Address Information</h1>
                        <div className="flex flex-1 gap-4 mb-4 w-full">
                            <div className='flex flex-col w-full'>
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Region</label>
                                <input type="text" placeholder="Region" className="border p-2 rounded w-full" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Province</label>
                                <input type="text" placeholder="Province" className="border p-2 rounded w-full" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">City/Municipality</label>
                                <input type="text" placeholder="City/Municipality" className="border p-2 rounded w-full" />
                            </div>
                        </div>
                        <div className="flex flex-1 gap-4 mb-3">
                            <div className='flex flex-col  w-1/2'>
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Barangay</label>
                                <input type="text" placeholder="Barangay" className="border p-2 rounded w-full" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">House/Lot No., Street, Purok/Sitio</label>
                                <input type="text" placeholder="House/Lot No., Street, Purok/Sitio" className="border p-2 rounded w-full " />
                            </div>
                        </div>
                        <h1 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-4">Government ID Information</h1>
                        <div className='flex flex-1 gap-4 mb-4'>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">SSS No.</label>
                                <input type="text" placeholder="SSS No." className="border p-2 rounded w-full " />
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Pag-IBIG No.</label>
                                <input type="text" placeholder="Pag-IBIG No." className="border p-2 rounded w-full " />
                            </div>
                        </div>
                        <div className='flex flex-1 gap-4 mb-3'>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Tin No.</label>
                                <input type="text" placeholder="Tin No." className="border p-2 rounded w-full " />
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Philhealth No.</label>
                                <input type="text" placeholder="Philhealth No." className="border p-2 rounded w-full " />
                            </div>
                        </div>

                        <h1 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-4">Emergency Contact Information</h1>
                        <div className="mb-4 w-full">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Emergency Contact Fullname</label>
                            <input type="text" placeholder="Emergency Contact Fullname" className="border p-2 rounded w-full " />
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Address</label>
                            <input type="text" placeholder="Address" className="border p-2 rounded w-full " />
                        </div>
                        <div className='flex flex-1 gap-4 mb-4'>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Relationship</label>
                                <input type="text" placeholder="Relationship" className="border p-2 rounded w-full " />
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide  text-xs font-bold mb-1 ml-1">Contact No.</label>
                                <input type="number" placeholder="Contact No." className="border p-2 rounded w-full " />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
