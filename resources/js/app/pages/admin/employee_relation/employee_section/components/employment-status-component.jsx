import { Menu, message, Modal } from 'antd';
import React, { useState } from 'react'
import { get_employee_thunk, update_employee_thunk } from '../redux/employee-section-thunk';
import store from '@/app/store/store';
import { useSelector } from 'react-redux';

export default function EmploymentStatusComponent({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [form, setForm] = useState({
        id: data?.id,
        position: data?.job_offer?.[0]?.jobPos || '',
        dept: data?.dept || '',
        account: data?.account || '',
        sup_id: data?.user?.id || '',
        eogs: data?.eogs || '',
        status: data?.status || '',
        hired: data?.hired || '',
        app_id: data?.app_id || '',
    });
    const [loading, setLoading] = useState(false);


    // Get data from Redux store
    const { accounts } = useSelector((state) => state.accounts);
    const { departments } = useSelector((state) => state.departments);
    const { users } = useSelector((state) => state.app);
    const { user } = useSelector((state) => state.app);

    console.log('departmeqweqeqwnt', data);

    function openHandler(params) {
        setStatusModalOpen(true);
        // Reset form with current data when opening modal
        setForm({
            id: data?.id,
            position: data?.job_offer?.[0]?.jobPos || '',
            dept: data?.dept || '',
            account: data?.account || '',
            sup_id: data?.user?.id || '',
            eogs: data?.eogs || '',
            status: data?.status || '',
            hired: data?.hired || '',
            app_id: data?.app_id || '',
        });
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
    //         id: data?.id,
    //         position: data?.position || '',
    //         dept: data?.dept || '',
    //         account: data?.account || '',
    //         sup_id: data?.user?.id || '',
    //         eogs: data?.eogs || '',
    //         status: data?.status || '',
    //         hired: data?.hired || '',
    //     }); 
    // };

    console.log('data', data)
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Update Employee Information"
                centered
                open={statusModalOpen}
                onOk={edit_status}
                onCancel={() => setStatusModalOpen(false)}
                confirmLoading={loading}
                width={1000}
                okText="Update"
                cancelText="Cancel"
            >
                <div className="w-full h-full">
                    <div className="flex flex-col -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Employee's Name
                            </label>
                            <input
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                value={`${data?.applicant?.fname || ''} ${data?.applicant?.mname || ''} ${data?.applicant?.lname || ''}`}
                                readOnly
                            />
                        </div>

                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Employee No.
                            </label>
                            <input
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                value={data?.emp_id || ''}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Job Position
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                                    value={form?.position || ""}
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Department
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.dept || ""}
                                    onChange={(e) => setForm({ ...form, dept: e.target.value })}
                                >
                                    <option value="">Select Department</option>
                                    {departments
                                        ?.filter((res) =>
                                            !user?.site ||
                                            res.site === user.site ||
                                            !res.site
                                        )
                                        .map((res, i) => (
                                            <option key={i} value={res.dept}>
                                                {res.dept}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.account || ""}
                                    onChange={(e) => setForm({ ...form, account: e.target.value })}
                                >
                                    <option value="">Select an Account</option>
                                    {accounts?.map((res, i) => (
                                        <option key={i} value={res.acc}>
                                            {res.acc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Supervisor
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.sup_id || ""}
                                    onChange={(e) => setForm({ ...form, sup_id: e.target.value })}
                                >
                                    <option value="">Select Supervisor</option>
                                    {users
                                        .filter((res) =>
                                            (
                                                !user?.site ||
                                                res.site === user.site ||
                                                !res.site
                                            ) &&
                                            ["Manager", "Account Manager", "Supervisor", "Team Leader", "Director", "CEO", "HR Lead", "Compliance Officer", "Site Admin"].includes(res.position)
                                        )
                                        .map((res) => (
                                            <option key={res.id} value={res.id}>
                                                {res.employee_fname} {res.employee_lname}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    EOGS Email
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="email"
                                    value={form?.eogs || ''}
                                    placeholder="Input email"
                                    onChange={(e) => setForm({ ...form, eogs: e.target.value })}
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Status
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.status || ''}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
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

                        <div className="flex flex-1">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Hired Date
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="date"
                                    value={form?.hired || ''}
                                    onChange={(e) => setForm({ ...form, hired: e.target.value })}
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Date of Regularization
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={data?.due ?? ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
