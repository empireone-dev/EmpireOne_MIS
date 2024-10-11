import App from "@/app/pages/_components/summernote-editor";
import Wysiwyg from "@/app/pages/_components/wysiwyg";
import store from "@/app/store/store";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { update_erf_ja_thunk } from "../../../department/redux/department-thunk";

export default function JobAnalysisFormSection() {
    const { job_positions } = useSelector((state) => state.job_positions);
    const { erf } = useSelector((state) => state.departments);
    const [form, setForm] = useState({});
        function update_ja() {
            store.dispatch(update_erf_ja_thunk({
                form,
                ...erf
            }))
        }
    return (
        <div>
            <div className="mb-12">
                <label
                    htmlFor="content"
                    className="block text-xl font-medium text-gray-800 text-center"
                >
                    Job Analysis
                </label>
                {/* <Wysiwyg
                    label=""
                    name="wysiwyg"
                    value=""
                // onChange={formHandler}
                /> */}
                <App
                    data={erf?.ja?.content ?? ""}
                    form={form}
                    setForm={setForm}
                />
            </div>
            <div className="flex flex-1 gap-2 justify-end items-center">
                <button
                    className="rounded-md hover:bg-blue-100  w-32 h-10 mt-2"
                    type="button"
                    onClick={() =>
                        router.visit("/admin/sourcing/job_title_section")
                    }
                >
                    Cancel
                </button>
                <button
                
                onClick={update_ja}
                className="bg-blue-600 rounded-md hover:bg-blue-700 text-white w-32 h-10 mt-2">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
