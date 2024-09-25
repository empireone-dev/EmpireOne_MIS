import { search_applicant_service } from "@/app/pages/services/user-service";
import {
    PlusSquareFilled,
    PlusSquareTwoTone,
    UserAddOutlined,
} from "@ant-design/icons";
import { Modal, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export default function AddAttritionSection() {
    const [open, setOpen] = useState(false);
    const { Option } = Select;
    const [search, setSearch] = useState("");
    const { employees } = useSelector((state) => state.employees);
    const [applicants, setApplicants] = useState([]);
    const [applicant, setApplicant] = useState({});

    async function search_applicant(e) {
        e.preventDefault();
        const result = await search_applicant_service({
            search: search,
        });
        setApplicants(result.data);
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md bg-white shadow-2xl" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <PlusSquareTwoTone className="text-xl" />
                    Select Employee
                </button>
            </div>
            <Modal
                title="Select Employee Attrition"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Submit"
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
                            placeholder="Search branch name..."
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
                    {applicants.map((res) => (
                        <li
                            key={res.id}
                            className="flex items-center justify-between gap-x-6 bg-blue-200 rounded-lg px-3"
                        >
                            <div className="min-w-0 my-3">
                                <div className="flex items-start gap-x-3 font-bold">
                                    {res.employee_fname} {res.employee_lname}
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
                        <div className="w-full px-3">
                            {/* <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" htmlFor="employee-select">
                                Employee's Name
                            </label> */}
                            {/* <Select
                                // showSearch
                                placeholder="Search for an employee"
                                optionFilterProp="children"
                                className="w-full"
                                onChange={(value) => console.log(`Selected: ${value}`)}
                                filterOption={(input, option) =>
                                    typeof option?.children === 'string' && option.children.toLowerCase().includes(input.toLowerCase())
                                }
                                // Additional props for better accessibility
                                dropdownRender={(menu) => (
                                    <>
                                        <div style={{ padding: '8px' }}>
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                style={{
                                                    width: '100%',
                                                    border: '1px solid #d9d9d9',
                                                    borderRadius: '4px',
                                                    padding: '4px'
                                                }}
                                                onChange={(e) => {
                                                    const value = e.target.value.toLowerCase();
                                                    const filteredOptions = employees
                                                        .slice()
                                                        .sort((a, b) => {
                                                            const nameA = `${a.applicant?.fname} ${a.applicant?.lname}`.toLowerCase();
                                                            const nameB = `${b.applicant?.fname} ${b.applicant?.lname}`.toLowerCase();
                                                            return nameA.localeCompare(nameB);
                                                        })
                                                        .filter(employee => {
                                                            const fullName = `${employee.applicant?.fname} ${employee.applicant?.lname}`.toLowerCase();
                                                            return fullName.includes(value);
                                                        });

                                                    // Update state or trigger any action with filteredOptions
                                                    console.log('Filtered Options:', filteredOptions);
                                                }}
                                            />
                                        </div>
                                        {menu}
                                    </>
                                )}
                            >
                                {employees
                                    .slice()
                                    .sort((a, b) => {
                                        const nameA = `${a.applicant?.fname} ${a.applicant?.lname}`.toLowerCase();
                                        const nameB = `${b.applicant?.fname} ${b.applicant?.lname}`.toLowerCase();
                                        return nameA.localeCompare(nameB);
                                    })
                                    .map((employee, index) => (
                                        <Option key={index} value={employee.id}>
                                            {employee.applicant?.fname} {employee.applicant?.lname}
                                        </Option>
                                    ))}
                            </Select> */}
                        </div>
                        <div class="w-full px-3">
                            <label
                                class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                Employee No.
                            </label>
                            <input
                                class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-text"
                                type="text"
                                value={applicant.employee_id}
                                placeholder=""
                                readOnly
                            />
                        </div>

                        <div className="flex flex-1 ">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    job Position
                                </label>
                                <input
                                    value={applicant.position}
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
                                    for="grid-text"
                                >
                                    Department
                                </label>
                                <input
                                    value={applicant?.department}
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
                                    for="grid-text"
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
                                    for="grid-text"
                                >
                                    Supervisor
                                </label>
                                <input
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
                                    for="grid-text"
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
                                    for="grid-text"
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
                                    for="grid-text"
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
                                    for="grid-text"
                                >
                                    Separation Date
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="date"
                                    placeholder=""
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Reason for Separation
                                </label>
                                <select
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name=""
                                    id=""
                                >
                                    <option value=""></option>
                                    <option value="">Resignation</option>
                                    <option value="">Dismissal</option>
                                    <option value="">End of Contract</option>
                                    <option value="">AWOL</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
