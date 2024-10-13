import App from "@/app/pages/_components/summernote-editor";
import Wysiwyg from "@/app/pages/_components/wysiwyg";
import store from "@/app/store/store";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { update_erf_ja_thunk } from "../../../department/redux/department-thunk";
import { message } from "antd";

export default function JobAnalysisFormSection() {
    const { job_positions } = useSelector((state) => state.job_positions);
    const { erf } = useSelector((state) => state.departments);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    async function update_ja() {
        setLoading(true);

        try {
            await store.dispatch(update_erf_ja_thunk({
                form,
                ...erf
            }));
            message.success("Updated Successfully!");
            router.visit(`/admin/sourcing/job_title_section/job_analysis/${erf?.ref_id}`);
        } catch (error) {
            message.error("Failed to update. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
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
                    loading={loading}
                    className="bg-blue-600 rounded-md hover:bg-blue-700 text-white w-32 h-10 mt-2">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
