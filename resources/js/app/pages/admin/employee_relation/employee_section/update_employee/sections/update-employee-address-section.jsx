import { EditOutlined } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd'
import React, { useState } from 'react'

export default function UpdateEmployeeAddressSection() {
    const [isModalOpen, setIsModalOpen] = useState(null)

    function openHandler() {
        setIsModalOpen(true);
    }

    return (
        <>
            <Tooltip title="Update New Address">
                <div>
                    <button className='text-2xl ml-2'
                        onClick={openHandler}
                    ><EditOutlined />
                    </button>
                </div>
            </Tooltip>

            <Modal
                title="Update Address"
                visible={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
                okText="Update"
                cancelText="Cancel"
                footer={null}
            >
                <form className="w-full h-full">
                    <div>
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
                    </div>
                    <div className="flex flex-col -mx-3">
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
