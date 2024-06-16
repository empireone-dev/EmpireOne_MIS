import { MedicineBoxOutlined, PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import { Modal } from 'antd';
import React, { useState } from 'react'

export default function AddMedicineSection() {
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
                    Add New Medicine
                </button>
            </div>
            <Modal
                title={<><MedicineBoxOutlined /> New Medicine</>}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Save"
                cancelText="Cancel"
            >
                <form class="w-full">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Medicine
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="Name of Medicine" />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Medicine Type
                            </label>
                            <input class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="Type of Medicine" />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="grid-text">
                                Medicine Description
                            </label>
                            <textarea class="appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="Add Description" />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
