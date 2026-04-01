import { create_job_offer_thunk } from "@/app/pages/admin/hiring/hiring_section/redux/hiring-thunk";
import store from "@/app/store/store";
import { LoadingOutlined } from "@ant-design/icons";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { Menu, message, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { get_applicant_thunk } from "../applicant_records/redux/applicant-thunk";
import { useEffect } from "react";
import { get_department_thunk } from "../../../sourcing/department/redux/department-thunk";
import { get_account_thunk } from "../../../employee_relation/employee_section/redux/account-thunk";

export default function ApplicantJobOfferComponent({ data, item }) {
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const [form, setForm] = useState({
        allowance: "",
        salary: "",
        startDate: "",
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    function openHandler(params) {
        setOpen(true);
    }

useEffect(() => {
    store.dispatch(get_department_thunk());
    store.dispatch(get_account_thunk());
}, []);
    async function send_job_offer(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                create_job_offer_thunk({
                    ...form,
                    ...data,
                    status: "Pending",
                }),
            );
            await store.dispatch(get_applicant_thunk());
            message.success("Job Offer already sent!");
            setOpen(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    console.log("job_positions", job_positions);
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Job Offer"
                centered
                visible={open}
                width={900}
                onOk={() => {
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <li className="bg-gray-300 h-0.5"></li>
                <form
                    onSubmit={send_job_offer}
                    className="w-full h-full mt-3.5"
                >
                    <div className="flex flex-col -mx-3 mb-3">
                        <div className="w-full px-2.5">
                            <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1"
                                for="grid-text"
                            >
                                Application No.
                            </label>
                            <input
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="number"
                                placeholder=""
                                value={data.app_id}
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Full Name
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    // value={`${data.lname}, ${data.fname} ${data.mname}`
                                    // ${
                                    //     data.mname
                                    //         ? data.mname.charAt(0) + "."
                                    //         : ""
                                    // }`

                                    value={`${data.fname} ${data.mname} ${data.lname}`}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 gap-5 px-2.5">
                            <div className="w-full">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    htmlFor="grid-text"
                                >
                                    Job Position
                                </label>
                                <select
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name=""
                                    id=""
                                    onChange={(e) => {
                                        const selectedJob = job_positions.find(
                                            (job) =>
                                                job.jPosition ===
                                                e.target.value,
                                        );

                                        setForm({
                                            ...form,
                                            outsourcing_erf: {
                                                ...form.outsourcing_erf,
                                                department:
                                                    selectedJob?.outsourcing_erf
                                                        ?.department || "",
                                                account:
                                                    selectedJob?.outsourcing_erf
                                                        ?.account || "",
                                            },
                                            jobPos:
                                                selectedJob?.jPosition ||
                                                e.target.value,
                                        });
                                    }}
                                >
                                    <option selected disabled></option>
                                    {job_positions
                                        .filter(
                                            (job, index, self) =>
                                                index ===
                                                self.findIndex(
                                                    (j) =>
                                                        j.jPosition ===
                                                        job.jPosition,
                                                ),
                                        )
                                        .map((res, i) => {
                                            return (
                                                <option
                                                    id={res.salary}
                                                    value={res.jPosition}
                                                    key={i}
                                                >
                                                    {res.jPosition}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="w-full">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    htmlFor="grid-department"
                                >
                                    Department
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-department"
                                    value={form.outsourcing_erf?.department || ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            outsourcing_erf: {
                                                ...form.outsourcing_erf,
                                                department: e.target.value,
                                            },
                                        })
                                    }
                                >
                                    <option value="">Select Department</option>
                                    {departments
                                        .filter(
                                            (res, index, self) =>
                                                index ===
                                                self.findIndex(
                                                    (d) => d.dept === res.dept,
                                                ),
                                        )
                                        .map((res, i) => (
                                            <option value={res.dept} key={i}>
                                                {res.dept}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    htmlFor="grid-account"
                                >
                                    Account
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-account"
                                    value={form.outsourcing_erf?.account || ""}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            outsourcing_erf: {
                                                ...form.outsourcing_erf,
                                                account: e.target.value,
                                            },
                                        })
                                    }
                                >
                                    <option value="">Select Account</option>
                                    {accounts.map((res, i) => (
                                        <option value={res.acc} key={i}>
                                            {res.acc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-1">
                            <div className="w-3/5 px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Salary Offer
                                </label>
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={form?.salary ?? ""}
                                    name="salary"
                                />
                            </div>
                            <div className="w-3/5 px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Allowance
                                </label>
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    name="allowance"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Type of Allowance
                                </label>
                                <select
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="typea"
                                    id=""
                                >
                                    <option></option>
                                    <option value="Program Allowance">
                                        Program Allowance
                                    </option>
                                    <option value="Rice and Meal Allowance">
                                        Rice and Meal Allowance
                                    </option>
                                    <option value="Communication Allowance">
                                        Communication Allowance
                                    </option>
                                    <option value="Skill Allowance">
                                        Skill Allowance
                                    </option>
                                    <option value="Interim Allowance">
                                        Interim Allowance
                                    </option>
                                    <option value="Transportation Allowance">
                                        Transportation Allowance
                                    </option>
                                    <option value="Travel Allowance">
                                        Travel Allowance
                                    </option>
                                    <option value="Clothing Allowance">
                                        Clothing Allowance
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    htmlFor="grid-text"
                                >
                                    Start Date
                                </label>
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="date"
                                    placeholder=""
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    value={form?.startDate ?? ""}
                                    name="startDate"
                                />
                            </div>
                        </div>
                        <div className="w-full px-2.5">
                            {/* <label
                                className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                Role Type
                            </label> */}
                            {/* <select
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="typea"
                                id=""
                            >
                                <option></option>
                                <option value="Agent">Agent</option>
                                <option value="Support">Support</option>
                                <option value="Manager">Manager</option>
                            </select> */}
                        </div>
                    </div>
                    <button
                        onClick={send_job_offer}
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                        <div className="flex flex-1 items-center justify-center">
                            {loading ? (
                                <LoadingOutlined spin />
                            ) : (
                                <BriefcaseIcon className="h-6 mr-1" />
                            )}
                            &nbsp; {loading ? " SENDING..." : " SEND JOB OFFER"}
                        </div>
                    </button>
                </form>
            </Modal>
        </>
    );
}
