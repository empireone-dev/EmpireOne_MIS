import { update_pre_employment_file_service } from "@/app/pages/services/pre-employment-file-service";
import store from "@/app/store/store";
import React from "react";
import { get_applicant_by_app_id_thunk } from "../../final_rate/redux/final-rate-thunk";
import { useState } from "react";

export default function File201ApprovedSection({ data, setOpen }) {
    const [isLoading, setIsLoading] = useState(false);

    const app_id = window.location.pathname.split('/')[3]
    const jobPos = window.location.pathname.split('/')[5]
    const job_pos = jobPos.replace(/_/g, '/').replace(/%20/g, ' ');
    console.log('datassssssss', data)
    async function on_handler(params) {
        await update_pre_employment_file_service({
            ...data,
            status: 'Approved',
            isContract: true,
            jobPos: job_pos,
        })
        await store.dispatch(get_applicant_by_app_id_thunk(app_id))
        setOpen(false)
    }
    return (
        <div className="flex w-full items-center justify-center">
            <button
                onClick={on_handler}
                loading={isLoading}
                disabled={isLoading}
                className="bg-green-500 w-full rounded hover:bg-green-600 p-1.5 text-white">
                {isLoading ? 'Loading...' : 'Approved'}
            </button>
        </div>
    );
}
