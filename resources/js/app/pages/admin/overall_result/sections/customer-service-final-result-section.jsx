import { UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import FinalRateMarkComponent from '../../final_rate/components/final-rate-mark-component'

export default function CustomerServiceFinalResultSection() {
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
                    <FinalRateMarkComponent rate="1 - Very Poor" name="css" />
                    <FinalRateMarkComponent rate="2 - Poor" name="css" />
                    <FinalRateMarkComponent rate="3 - Average" name="css" />
                    <FinalRateMarkComponent rate="4 - Good" name="css" />
                    <FinalRateMarkComponent rate="5 - Excellent" name="css" />
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>CUSTOMER SERVICE NOTES</b></label>
                <textarea type="text" placeholder="" className="border p-2 rounded w-full mt-1 h-40" readOnly />
            </div>
    </div>
  )
}
