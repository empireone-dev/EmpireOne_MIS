import store from "@/app/store/store";
import React from "react";
import { get_applicant_by_app_id_thunk } from "../../final_rate/redux/final-rate-thunk";
import { update_pre_employment_file_service } from "@/app/pages/services/pre-employment-file-service";
import { useState } from "react";

export default function File201DeclinedSection({ data, setOpen }) {
    const [reason, setReason] = useState('')
    const app_id = window.location.pathname.split('/')[3]
    const job_offer_id = window.location.pathname.split('/')[4]

    async function on_handler(params) {
        await update_pre_employment_file_service({
            ...data,
            ...reason,
            status: 'Declined',
            reqs: data.reqs,
            job_offer_id: job_offer_id,
        })
        await store.dispatch(get_applicant_by_app_id_thunk(app_id))
        setOpen(false)
    }

    console.log(data, 'data in file 201 declined section');
    return (
        <div className="w-full">
            <div className='mb-2'>
                <label htmlFor=""><b>Reason of Declination</b></label>
                <input name='reas'
                    onChange={(e) => setReason({
                        [e.target.name]: e.target.value
                    })}
                    type="text" className='border p-2 rounded  w-full' />
            </div>
            <button
                onClick={on_handler}
                className="bg-red-500 text-white w-full rounded hover:bg-red-600 p-0.5">
                Declined
            </button>
        </div>

    );
}
