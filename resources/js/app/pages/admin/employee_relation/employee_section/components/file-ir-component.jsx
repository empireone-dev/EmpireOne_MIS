import store from "@/app/store/store";
import { Menu, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { create_incident_report_thunk } from "../redux/employee-section-thunk";
import UploadFileIRSection from "../sections/upload-file-ir-section";

export default function FileIrComponent({ data, item }) {
    const { user } = useSelector((state) => state.app);
    const [form, setForm] = useState({});
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    function openHandler(params) {
        setStatusModalOpen(true);
    }
    async function submit_form(e) {
        setLoading(true);
        try {
            await store.dispatch(
                create_incident_report_thunk({
                    ...form,
                    ...data?.applicant,
                    emp_id: data?.applicant.app_id,
                    filedby: user.id,
                })
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title=""
                // centered
                confirmLoading={loading}
                visible={statusModalOpen}
                onOk={() => submit_form()}
                onCancel={() => setStatusModalOpen(false)}
                width={1000}
                okText="GENERATE INCIDENT REPORT"
                cancelText="CANCEL"
            // footer={null}
            >
                <form class="w-full h-full">
                    <div class="flex flex-col -mx-3">
                        <div className="flex items-center justify-center">
                            <h1 className="text-xl">
                                <b>INCIDENT REPORT</b>
                            </h1>
                        </div>
                        <hr />
                        <div className="flex flex-1 mt-2">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Date of Incident
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            doi: e.target.value,
                                        })
                                    }
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="date"
                                    placeholder=""
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Time of Incident
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="time"
                                    placeholder=""
                                />
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Employee Involved
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={`${data?.applicant?.fname} ${data?.applicant?.mname} ${data?.applicant?.lname}`}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div class="w-full px-3">
                            <label
                                class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                for="grid-text"
                            >
                                Incident Subject
                            </label>
                            <input
                                class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                Incident Summary
                            </label>
                            <textarea
                                class="appearance-none block w-full h-60 border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                placeholder=""
                            />
                        </div>

                        <div className="flex flex-1 w-full mb-1 ">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-2 mt-2"
                                    for="grid-text"
                                >
                                    Attachment
                                </label>
                                <UploadFileIRSection />
                                {/* <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="file"
                                    placeholder=""
                                /> */}
                            </div>
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                    for="grid-text"
                                >
                                    Filed By
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-2 px-4 mb-1.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    value={`${user.employee_fname} ${user.employee_lname}`}
                                    readOnly
                                />
                                {/* {user.employee_fname} {user.employee_lname} */}
                            </div>
                        </div>
                        {/* <div className="flex items-center justify-center p-1.5 px-2 mt-1">
                            <button
                                onClick={submit_form}
                                className="bg-blue-500 hover:bg-blue-600 text-white w-full p-1.5 rounded-md"
                            >
                                GENERATE INCIDENT REPORT
                            </button>
                        </div> */}
                    </div>
                </form>
            </Modal>
        </>
    );
}
