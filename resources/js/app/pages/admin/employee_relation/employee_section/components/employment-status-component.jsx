import { Menu, message, Modal } from 'antd';
import React, { useState } from 'react'
import { get_employee_thunk, update_employee_thunk } from '../redux/employee-section-thunk';
import store from '@/app/store/store';

export default function EmploymentStatusComponent({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [form, setForm] = useState({
        id: data?.id,
        status: data?.status,
    });
    const [loading, setLoading] = useState(false);
    function openHandler(params) {
        setStatusModalOpen(true);
    }

    async function edit_status(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(update_employee_thunk(form));
            await store.dispatch(get_employee_thunk());
            message.success('Updated Successfully');
            setStatusModalOpen(false);
        } catch (error) {
            message.error(error.message || 'Error updating changes');
        } finally {
            setLoading(false);
        }
    }

    // const handleCancel = () => {
    //     setStatusModalOpen(false);
    //     setForm({
    //         dept: data?.dept || "",
    //         depthead: data?.user?.id || "",
    //     }); 
    // };
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Employee Status"
                centered
                visible={statusModalOpen}
                onOk={edit_status}
                onCancel={() => setStatusModalOpen(false)}
                confirmLoading={loading}
                width={1000}
                okText="Update"
                cancelText="Cancel"
            >
                <form class="w-full h-full" onSubmit={edit_status}>
                    <div class="flex flex-col -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Employee's Name
                            </label>
                            <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={`${data?.applicant?.fname} ${data?.applicant?.mname} ${data?.applicant?.lname}`} readOnly />

                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Employee No.
                            </label>
                            <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.emp_id} readOnly />
                        </div>

                        <div className='flex flex-1 '>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    job Position
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.position} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Department
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.dept} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.account} readOnly />
                            </div>
                        </div>

                        <div className='flex flex-1'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Supervisor
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.sup_id} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    EOGS Email
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" value={data?.eogs} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Status
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.status}
                                    name="employmentStatus"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                // onChange={(e) => handleStatusChange(e.target.value)} 
                                >
                                    <option value="" disabled>Select status</option>
                                    <option value="Probationary">Probationary</option>
                                    <option value="Extended Probationary">Extended Probationary</option>
                                    <option value="EOPE">End of Probationary Employment</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Terminated">Terminated</option>
                                    <option value="Dismissed">Dismissed</option>
                                    <option value="AWOL">AWOL</option>
                                    <option value="Resigned">Resigned</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-1'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Hired Date
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.hired} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Date of Regularization
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.due ?? ""} readOnly />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
