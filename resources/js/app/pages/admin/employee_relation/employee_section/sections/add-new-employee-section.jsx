import store from "@/app/store/store";
import { PlusSquareTwoTone, UsergroupAddOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React, { useState } from "react";
import { get_employee_thunk, store_new_employee_thunk } from "../redux/employee-section-thunk";
import { useSelector } from "react-redux";

export default function AddNewEmployeeSection() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const { accounts } = useSelector((state) => state.accounts);
    const { users } = useSelector((state) => state.app);
    const { user } = useSelector((state) => state.app);
    const { hiredApplicants } = useSelector((store) => store.employees);

    const [form, setForm] = useState({
        site: user?.site || '',
    });
    console.log('hiredApplicants', hiredApplicants)
    // console.log('assasss', value?.applicant?.fname)

    async function submit_handler() {
        try {
            setLoading(true); // Set loading before starting the submission
            await store.dispatch(
                store_new_employee_thunk({
                    ...form,
                })
            );
            await store.dispatch(get_employee_thunk());
            message.success("Successfully Added!");
            setOpen(false); // Close modal on success
        } catch (error) {
            message.error("Failed to save Employee. Please try again.");
        } finally {
            setLoading(false); // Reset loading after submission
        }
    }

    function select_employees(e) {
        if (e.target.value) {
            const value = JSON.parse(e.target.value);
            setForm({
                ...form,
                ...value,
                fname: value.applicant.fname || '',
                mname: value.applicant.mname || '',
                lname: value.applicant.lname || '',
                suffix: value.applicant.suffix || '',
                gender: value.applicant.gender || '',
                site: user?.site || '',
            });
            // console.log("Selected applicant's first name:", value.applicant.fname);
        } else {
            setForm({});
        }
    }

    return (
        <div className="my-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1"
                >
                    <UsergroupAddOutlined className="text-xl" />
                    Add New Employee
                </button>
            </div>
            <Modal
                title="New Employee"
                centered
                open={open}
                onOk={submit_handler}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Save"
                cancelText="Cancel"
                confirmLoading={loading}
            >
                <div className="w-full h-full">
                    <div className="flex flex-col -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Employee's Name
                            </label>
                            <select
                                onChange={select_employees}
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                                <option value="">Select Employee</option>
                                {hiredApplicants?.map((res, i) => (
                                    <option key={i} value={JSON.stringify(res)}>
                                        {res.applicant.fname} {res.applicant.mname} {res.applicant.lname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Application No.
                            </label>
                            <input
                                value={form?.app_id || ""}
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                placeholder=""
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Job Position
                                </label>
                                <input
                                    value={form?.jobPos || ""}
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Department
                                </label>
                                <input
                                    value={form?.department || ""}
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    readOnly
                                />
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
                                    value={form?.eogs || ""}
                                    type="email"
                                    placeholder="Input email"
                                    onChange={(e) => setForm({ ...form, eogs: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Hired Date
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.hired || ""}
                                    type="date"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            hired: e.target.value,
                                        })
                                    }
                                    placeholder=""
                                />
                            </div>

                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Status
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form?.emp_status || ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            emp_status: e.target.value
                                        })}
                                >
                                    <option selected>Select Employee Status</option>
                                    <option value="Probationary">Probationary</option>
                                    <option value="Regular">Regular</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
