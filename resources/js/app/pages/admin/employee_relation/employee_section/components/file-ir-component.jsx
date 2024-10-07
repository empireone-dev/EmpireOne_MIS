import { Menu, Modal } from 'antd'
import React, { useState } from 'react'

export default function FileIrComponent({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    function openHandler(params) {
        setStatusModalOpen(true);
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title=""
                // centered
                visible={statusModalOpen}
                onOk={() => setStatusModalOpen(false)}
                onCancel={() => setStatusModalOpen(false)}
                width={1000}
                okText="Update"
                cancelText="Cancel"
                footer={null}
            >
                <form class="w-full h-full">
                    <div class="flex flex-col -mx-3">
                        <div className='flex items-center justify-center'>
                            <h1 className='text-xl'><b>INCIDENT REPORT</b></h1>
                        </div>
                        <hr />
                        <div className='flex flex-1 mt-2'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Date of Incident
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="" />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Time of Incident
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="time" placeholder="" />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Employee Involved
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" readOnly />
                            </div>
                        </div>

                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                Incident Subject
                            </label>
                            <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" readOnly />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                Incident Summary
                            </label>
                            <textarea class="appearance-none block w-full h-60 border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" />
                        </div>

                        <div className='flex flex-1 '>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Attachment
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="file" placeholder="" />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                                    Filed By
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" readOnly/>
                            </div>
                        </div>
                        <div className='flex items-center justify-center p-1.5 px-2 mt-1'>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white w-full p-1.5 rounded-md'>
                                GENERATE INCIDENT REPORT
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
