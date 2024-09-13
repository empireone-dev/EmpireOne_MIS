import { BriefcaseIcon } from '@heroicons/react/24/outline'
import React from 'react'
import FinalRateMarkComponent from '../../final_rate/components/final-rate-mark-component'

export default function WorkEffectivenessFinalResultSection({data}) {

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
                    <FinalRateMarkComponent  name="wscore" value="1" score={data?.final?.wscore} rate="1 - Very Poor"/>
                    <FinalRateMarkComponent  name="wscore" value="2" score={data?.final?.wscore} rate="2 - Poor"/>
                    <FinalRateMarkComponent  name="wscore" value="3" score={data?.final?.wscore} rate="3 - Average"/>
                    <FinalRateMarkComponent  name="wscore" value="4" score={data?.final?.wscore} rate="4 - Good"/>
                    <FinalRateMarkComponent  name="wscore" value="5" score={data?.final?.cscore} rate="5 - Excellent"/>
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>WORK EFFECTIVENESS NOTES</b></label>
                <textarea type="text" placeholder="" value={data?.final?.wnotes} className="border p-2 rounded w-full mt-1 h-40" readOnly />
            </div>
        </div>
    )
}
