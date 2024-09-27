import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { message, Modal } from 'antd';
import React from 'react'
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import store from '@/app/store/store';
import { get_applicant_thunk } from '../../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { create_job_offer_thunk } from '../../../hiring/hiring_section/redux/hiring-thunk';

export default function NewJobOfferSection({ data, setIsModalVisible }) {
    const [openNewOffer, setNewOfferOpen] = useState(false);
    const { job_positions } = useSelector((state) => state.job_positions);
    const [form, setForm] = useState({
        allowance: 0
    });
    const [loading, setLoading] = useState(false);

    console.log('data', data)

    async function send_job_offer(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                create_job_offer_thunk({
                    ...form,
                    ...data.applicant,
                    status: 'Pending'
                })
            );
            await store.dispatch(get_applicant_thunk());
            message.success("Job Offer already sent!");
            setNewOfferOpen(false);
            setLoading(false);
            setIsModalVisible(false)
        } catch (error) {
            message.success("Failed to sent Job Offer!");
            setLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-end'>
            <button
                className='bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded-md flex'
                onClick={() => {
                    setNewOfferOpen(true);
                    setIsModalVisible(false);
                }}
            >
                <BriefcaseIcon className='h-5 mr-0.5' />Make a new Job Offer
            </button>
            <Modal
                title="Job Offer"
                centered
                visible={openNewOffer}
                width={900}
                onOk={() => {
                    setNewOfferOpen(false);
                }}
                onCancel={() => setNewOfferOpen(false)}
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
                                    value={data?.applicant?.fname ?? ''}
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
                                    value={data?.applicant?.mname ?? ''}
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
                                    value={data?.applicant?.lname ?? ''}
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            salary: e.target.selectedOptions[0]
                                                .id,
                                            jobPos: e.target.value,
                                        })
                                    }
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
        </div>
    )
}
