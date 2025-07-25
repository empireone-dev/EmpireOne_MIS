import { update_pre_employment_file_service } from '@/app/pages/services/pre-employment-file-service'
import React, { useState } from 'react'
import { get_applicant_by_app_id_thunk } from '../../final_rate/redux/final-rate-thunk'
import store from '@/app/store/store'
import { useSelector } from 'react-redux'
import { LoadingOutlined, SendOutlined } from '@ant-design/icons'

export default function ContractDeclineSection({ data, setOpen }) {
    const [reason, setReason] = useState('')
    const app_id = window.location.pathname.split('/')[3]
    const { applicant } = useSelector((state) => state.final_rate);
    const [loading, setLoading] = useState(false);

    async function on_handler(params) {
        await update_pre_employment_file_service({
            ...data,
            ...reason,
            email: applicant.email,
            status: 'Declined'
        })
        await store.dispatch(get_applicant_by_app_id_thunk(app_id))
        setOpen(false)
        setLoading(false)
    }
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
                type="submit"
                className={` bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                    }`}

                onClick={on_handler}
                disabled={loading}
            >
                {loading ? (
                    <LoadingOutlined spin />
                ) : (
                    <SendOutlined />
                )}
                {loading ? " Sending..." : " Send Declination"}
            </button>
        </div>
    );
}
