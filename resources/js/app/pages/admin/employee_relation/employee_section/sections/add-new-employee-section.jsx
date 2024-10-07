import store from "@/app/store/store";
import { PlusSquareFilled, PlusSquareTwoTone } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { create_employee_thunk } from "../redux/employee-section-thunk";
import moment from "moment";

export default function AddNewEmployeeSection() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const { hiredApplicants } = useSelector((store) => store.employees);
    console.log("hiredApplicants", hiredApplicants);
    function selectHandler(e) {
        if (e.target.value) {
            const value = JSON.parse(e.target.value);
            setForm({
                ...form,
                ...value,
            });
        } else {
            setForm();
        }
    }

    async function submit_form(e) {
        await store.dispatch(
            create_employee_thunk({
                ...form,
                hired_date: moment().format("YYYY-MM-DD"),
            })
        );
        await store.dispatch(get_employee_thunk());
    }
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <PlusSquareTwoTone className="text-xl" />
                    Add New Employee
                </button>
            </div>
            <Modal
                title="New Employee"
                centered
                open={open}
                onOk={() => submit_form(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Save"
                cancelText="Cancel"
            >
                <form class="w-full h-full">
                    <div class="flex flex-col -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label
                                class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                Employee's Name
                            </label>
                            <select
                                onChange={selectHandler}
                                class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name=""
                                id=""
                            >
                                <option
                                // selected disabled
                                ></option>
                                {hiredApplicants.map((res, i) => {
                                    return (
                                        <option
                                            key={i}
                                            value={JSON.stringify(res)}
                                        >
                                            {res.applicant.fname}{" "}
                                            {res.applicant.lname}
                                        </option>
                                    );
                                })}
                            </select>
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
                                placeholder=""
                                readOnly
                                value={form?.app_id ?? ""}
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
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                    value={form?.jobPos ?? ""}
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
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="text"
                                    placeholder=""
                                    readOnly
                                    value={form?.department ?? ""}
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Account <i>(If Applicable)</i>
                                </label>
                                <select
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name=""
                                    id=""
                                >
                                    <option value=""></option>
                                </select>
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
                                <select
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name=""
                                    id=""
                                >
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    EOGS Email
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            eogs: e.target.value,
                                        })
                                    }
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="email"
                                    placeholder=""
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
                                    type="date"
                                    placeholder=""
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Status
                                </label>
                                <select
                                    class="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name=""
                                    id=""
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option></option>
                                    <option value="Probationary">
                                        Probationary
                                    </option>
                                    <option value="Regular">Regular</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
