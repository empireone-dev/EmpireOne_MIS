import { UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import InitialRateMarkComponent from '../components/initial-rate-mark-component'

export default function CustomerServiceInitialResultSection({data}) {
    return (
        <div>
            <div className="flex items-center mt-6 mb-2">
                <UserCircleIcon className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">CUSTOMER SERVICE</h1>
            </div>
            <hr className='mb-1.5'>
            </hr>
            <div>
                <label htmlFor=""><b>CUSTOMER SERVICE SCORE</b></label>
                <div className='flex flex-1 w-full gap-8 mt-1'>
                    <InitialRateMarkComponent name="cscore" score={data?.initial?.cscore} value="1" rate="1 - Very Poor" />
                    <InitialRateMarkComponent name="cscore" score={data?.initial?.cscore} value="2" rate="2 - Poor" />
                    <InitialRateMarkComponent name="cscore" score={data?.initial?.cscore} value="3" rate="3 - Average" />
                    <InitialRateMarkComponent name="cscore" score={data?.initial?.cscore} value="4" rate="4 - Good" />
                    <InitialRateMarkComponent name="cscore" score={data?.initial?.cscore} value="5" rate="5 - Excellent" />
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>CUSTOMER SERVICE NOTES</b></label>
                <textarea type="text" placeholder="" value={data?.initial?.cnotes}  className="border p-2 rounded w-full mt-1 h-40" readOnly/>
            </div>
        </div>
    )
}
