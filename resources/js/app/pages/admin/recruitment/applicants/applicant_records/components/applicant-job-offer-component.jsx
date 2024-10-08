import { create_job_offer_thunk } from "@/app/pages/admin/hiring/hiring_section/redux/hiring-thunk";
import store from "@/app/store/store";
import { LoadingOutlined } from "@ant-design/icons";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { Menu, message, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { get_applicant_thunk } from "../redux/applicant-thunk";

export default function ApplicantJobOfferComponent({ data, item }) {
    const { job_positions } = useSelector((state) => state.job_positions);
    const [form, setForm] = useState({
        allowance: 0
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    function openHandler(params) {
        setOpen(true);
    }

    async function send_job_offer(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                create_job_offer_thunk({
                    ...form,
                    ...data,
                    status: 'Pending',
                })
            );
            await store.dispatch(get_applicant_thunk());
            message.success("Job Offer already sent!");
            setOpen(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    console.log('job_positions', job_positions)
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
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Firstname
                                </label>
                                <input
                                    value={data.fname}
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Middlename
                                </label>
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    value={data.mname}
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Lastname
                                </label>
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    value={data.lname}
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label
                                    className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Job Position
                                </label>
                                <select
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name=""
                                    id=""
                                    onChange={(e) => {
                                        const selectedJob = job_positions.find(
                                            (job) => job.jPosition === e.target.value
                                        );

                                        setForm({
                                            ...form,
                                            outsourcing_erf: {
                                                ...form.outsourcing_erf, 
                                                department: selectedJob?.outsourcing_erf?.department || "", 
                                            },
                                            salary: selectedJob?.salary || "", 
                                            jobPos: selectedJob?.jPosition || e.target.value, 
                                        });
                                    }}

                                >
                                    <option selected disabled></option>
                                    {job_positions.map((res, i) => {
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
                                <input
                                    className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                    value={form?.outsourcing_erf?.department ?? ""}
                                />
                            </div>
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
                                    readOnly
                                    value={form?.salary ?? ""}
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
