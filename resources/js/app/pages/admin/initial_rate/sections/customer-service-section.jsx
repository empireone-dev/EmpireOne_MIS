import { UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import InitialRateMarkComponent from '../components/initial-rate-mark-component'

export default function CustomerServiceSection() {
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
                    <InitialRateMarkComponent rate="1 - Very Poor" name="cs" />
                    <InitialRateMarkComponent rate="2 - Poor" name="cs" />
                    <InitialRateMarkComponent rate="3 - Average" name="cs" />
                    <InitialRateMarkComponent rate="4 - Good" name="cs" />
                    <InitialRateMarkComponent rate="5 - Excellent" name="cs" />
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>CUSTOMER SERVICE NOTES</b></label>
                <textarea type="text" name='int_cust_serv_note' placeholder="" className="border p-2 rounded w-full mt-1 h-40" />
            </div>
        </div>
    )
}
