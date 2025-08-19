import store from "@/app/store/store";
import React from "react";
import { get_applicant_by_app_id_thunk } from "../../final_rate/redux/final-rate-thunk";
import { update_pre_employment_file_service } from "@/app/pages/services/pre-employment-file-service";
import { useState } from "react";
import { message } from "antd";

export default function File201DeclinedSection({ data, setOpen }) {
    const [reason, setReason] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const app_id = window.location.pathname.split('/')[3]
    const job_offer_id = window.location.pathname.split('/')[4]

    async function on_handler(params) {
        setIsLoading(true)
        try {
            await update_pre_employment_file_service({
                ...data,
                ...reason,
                status: 'Declined',
                reqs: data.reqs,
                job_offer_id: job_offer_id,
            })
            await store.dispatch(get_applicant_by_app_id_thunk(app_id))
            message.success('Declined email sent!')
            setOpen(false)
        } catch (error) {
            console.error('Error declining application:', error)
        } finally {
            setIsLoading(false)
        }
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
                disabled={isLoading}
                className={`w-full rounded p-1.5 text-white ${
                    isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-500 hover:bg-red-600'
                }`}>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <svg 
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                            ></circle>
                            <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Declining...
                    </div>
                ) : (
                    'Declined'
                )}
            </button>
        </div>

    );
}
