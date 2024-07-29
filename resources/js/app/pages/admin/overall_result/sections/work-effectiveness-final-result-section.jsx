import { BriefcaseIcon } from '@heroicons/react/24/outline'
import React from 'react'
import FinalRateMarkComponent from '../../final_rate/components/final-rate-mark-component'

export default function WorkEffectivenessFinalResultSection() {
    return (
        <div>
            <div className="flex items-center mt-6 mb-2">
                <BriefcaseIcon className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">WORK EFFECTIVENESS</h1>
            </div>
            <hr className='mb-1.5'>
            </hr>
            <div>
                <label htmlFor=""><b>WORK EFFECTIVENESS SCORE</b></label>
                <div className='flex flex-1 w-full gap-8 mt-1'>
                    <FinalRateMarkComponent rate="1 - Very Poor" name="wes" />
                    <FinalRateMarkComponent rate="2 - Poor" name="wes" />
                    <FinalRateMarkComponent rate="3 - Average" name="wes" />
                    <FinalRateMarkComponent rate="4 - Good" name="wes" />
                    <FinalRateMarkComponent rate="5 - Excellent" name="wes" />
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>WORK EFFECTIVENESS NOTES</b></label>
                <textarea type="text" placeholder="" className="border p-2 rounded w-full mt-1 h-40" readOnly />
            </div>
        </div>
    )
}
