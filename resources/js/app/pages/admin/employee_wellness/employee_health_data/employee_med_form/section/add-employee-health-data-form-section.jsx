import { MedicineBoxOutlined, PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import { Modal } from 'antd';
import React, { useState } from 'react'

export default function AddEmployeeHealthDataFormSection() {
    const [open, setOpen] = useState(false);
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <PlusSquareTwoTone className='text-xl' />
                    Employee Health Data Form
                </button>
            </div>
            <Modal
                title={<><MedicineBoxOutlined /> New Employee Health Data</>}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Save Data"
                cancelText="Cancel"
            >
                <form class="w-full">
                    <div class="flex flex-1 -mx-3">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Date
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Employee ID
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="number" placeholder="" readOnly />
                        </div>
                    </div>
                    <div class="px-3 -mx-3">
                        <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                            Complaint
                        </label>
                        <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" />
                    </div>
                    <div class="flex flex-1 -mx-3">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Temperature
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="°C" />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Blood Pressure
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="mmHg" />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Sugar Level
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="mg/dL" />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Oxygen Level
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="mm Hg" />
                        </div>
                    </div>
                    <div class="px-3 -mx-3">
                        <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                            Injuries
                        </label>
                        <select className='appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="px-3 -mx-3">
                        <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                            Recommendation
                        </label>
                        <select className='appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' name="" id="">
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="px-3 -mx-3">
                        <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                            Medication Given
                        </label>
                        <textarea class="appearance-none block w-full h-20 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" />
                    </div>
                </form>
            </Modal>
        </div>
    )
}
