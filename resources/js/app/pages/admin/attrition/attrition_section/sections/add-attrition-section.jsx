import { search_applicant_service } from "@/app/pages/services/user-service";
import {
    PlusSquareFilled,
    PlusSquareTwoTone,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
import { Modal, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import store from "@/app/store/store";
import { get_employee_attrition_thunk, store_attrition_thunk } from "../redux/employee-attrition-thunk";

export default function AddAttritionSection() {
    const [open, setOpen] = useState(false);
    const { Option } = Select;
    const [search, setSearch] = useState("");
    const { employees } = useSelector((state) => state.employees);
    const [applicants, setApplicants] = useState([]);
    const [applicant, setApplicant] = useState({});
    const { users } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({ reason: '', resignationReasonSelect: '', dismissalReasonSelect: '', });

    const handleReasonChange = (e) => {
        const { value } = e.target;
        setForm({ ...form, reason: value, resignationReasonSelect: '', dismissalReasonSelect: '' });
    };

    async function search_applicant(e) {
        e.preventDefault();
        const result = await search_applicant_service({
            search: search,
        });
        setApplicants(result.data);
    }

    async function submit_attrition(params) {
        setLoading(true)
        try {
            await store.dispatch(store_attrition_thunk({
                ...applicant,
                ...form
            }));
            await store.dispatch(get_employee_attrition_thunk())
            setLoading(false)
            setOpen(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const new_applicants = applicants.filter(applicant => applicant.employee !== null && applicant.employee !== 0)
    console.log('employeesasda', applicant)

    return (
        <div className="my-2">
            <div
                class="inline-flex rounded-md bg-white shadow-2xl"
                role="group"
            >
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UserDeleteOutlined className="text-xl" />
                    Select Employee Attirition
                </button>
            </div>
            <Modal
                title="Select Employee Attrition"
                centered
                open={open}
                onOk={() => submit_attrition()}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Submit"
                confirmLoading={loading}
                cancelText="Cancel"
            >
                <form
                    onSubmit={search_applicant}
                    class="flex items-center w-full mx-auto"
                >
                    <label for="simple-search" class="sr-only">
                        Search
                    </label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <UserAddOutlined />
                        </div>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            id="simple-search"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            placeholder="Search employee..."
                        />
                    </div>
                    <button
                        type="submit"
                        class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    >
                        <svg
                            class="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </form>
                <ul role="list" className="divide-y divide-gray-100 my-3">
                    {new_applicants.map((res) => (
                        <li
                            key={res.id}
                            className="flex items-center justify-between gap-x-6 bg-blue-200 rounded-lg px-3"
                        >
                            <div className="min-w-0 my-3">
                                <div className="flex items-start gap-x-3 font-bold">
                                    {res.fname} {res.lname}
                                </div>
                            </div>
                            <div className="flex flex-none items-center gap-x-4">
                                <a
                                    onClick={() => setApplicant(res)}
                                    href={res.href}
                                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                >
                                    Choose
                                    <span className="sr-only">
                                        , {res.name}
                                    </span>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
                <form class="w-full h-full">
                    <div class="flex flex-col -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label
                                class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                            >
                                Employee No.
                            </label>
                            <input
                                class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="text"
                                value={applicant.app_id}
                                placeholder=""
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1 ">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    job Position
                                </label>
                                <input
                                    value={applicant?.employee?.position}
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    Department
                                </label>
                                <input
                                    value={applicant?.employee?.dept}
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    Account <i>(If Applicable)</i>
                                </label>
                                <input
                                    value={applicant?.employee?.account ?? ""}
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    Supervisor
                                </label>
                                <input
                                    value={(applicant?.employee?.user?.employee_fname ?? "") + " " + (applicant?.employee?.user?.employee_lname ?? "")}
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    EOGS Email
                                </label>
                                <input
                                    value={applicant?.employee?.eogs ?? ""}
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="email"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    Hired Date
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    value={applicant?.employee?.hired ?? ""}
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    Status
                                </label>
                                <input
                                    value={applicant?.employee?.status ?? ""}
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex flex-1">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    Separation Date
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    name="separation"
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="date"
                                    placeholder=""
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"

                                >
                                    Reason for Separation
                                </label>
                                <select
                                    // onChange={(e) =>
                                    //     setForm({
                                    //         ...form,
                                    //         [e.target.name]: e.target.value,
                                    //     })
                                    // }
                                    onChange={handleReasonChange}
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="reason"
                                    id=""
                                >
                                    <option value=""></option>
                                    <option>Resignation</option>
                                    <option>Dismissal</option>
                                    <option>Terminated</option>
                                    <option>End of Contract</option>
                                    <option>End of Probationary Employment</option>
                                    <option>AWOL</option>
                                </select>
                            </div>
                        </div>
                        {form.reason === 'Resignation' && (
                            <div className="w-full px-3" id="resignationReason">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" htmlFor="resignationReasonSelect">
                                    Reason for Resignation:
                                </label>
                                <select
                                    name="resignationReasonSelect"
                                    id="resignationReasonSelect"
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => setForm({ ...form, resignationReasonSelect: e.target.value })}
                                >
                                    <option value=""></option>
                                    <option>Shift Career Path</option>
                                    <option>Health Reason</option>
                                    <option>Pursue Education</option>
                                    <option>Family Care</option>
                                    <option>Higher Salary</option>
                                    <option>Higher Position</option>
                                    <option>Better Job Scope</option>
                                    <option>Better Environment</option>
                                </select>
                            </div>
                        )}

                        {form.reason === 'Dismissal' && (
                            <>
                                <div className="w-full px-3" id="dismissalReason">
                                    <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" htmlFor="dismissalReasonSelect">
                                        Reason for Dismissal:
                                    </label>
                                    <select
                                        name="dismissalReasonSelect"
                                        id="dismissalReasonSelect"
                                        className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        onChange={(e) => setForm({ ...form, dismissalReasonSelect: e.target.value })}
                                    >
                                        <option value=""></option>
                                        <option>Policy Violations</option>
                                        <option>Performance</option>
                                        <option>Others</option>
                                    </select>
                                </div>

                                <div className="w-full px-3" id="TerminationReport">
                                    <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" htmlFor="TerminationReportSelect">
                                        Upload Termination Report:
                                    </label>
                                    <input
                                        type="file"
                                        name="TerminationReportSelect[]"
                                        id="TerminationReportSelect"
                                        className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        accept=".jpg, .jpeg, .png, .pdf"
                                        multiple
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </form>
            </Modal>
        </div>
    );
}
