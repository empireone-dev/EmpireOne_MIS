import { LightBulbIcon } from '@heroicons/react/24/outline'
import React from 'react'
import InitialRateMarkComponent from '../components/initial-rate-mark-component'

export default function ProblemSolvingInitialResultSection() {
    return (
        <div>
            <div className="flex items-center mt-6 mb-2">
                <LightBulbIcon className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">PROBLEM-SOLVING/SOUND JUDGEMENT</h1>
            </div>
            <hr className='mb-1.5'>
            </hr>
            <div>
                <label htmlFor=""><b>PROBLEM-SOLVING/SOUND JUDGEMENT SCORE</b></label>
                <div className='flex flex-1 w-full gap-8 mt-1'>
                    <InitialRateMarkComponent rate="1 - Very Poor" />
                    <InitialRateMarkComponent rate="2 - Poor" />
                    <InitialRateMarkComponent rate="3 - Average" />
                    <InitialRateMarkComponent rate="4 - Good" />
                    <InitialRateMarkComponent rate="5 - Excellent" />
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>PROBLEM-SOLVING/SOUND JUDGEMENT NOTES</b></label>
                <textarea type="text" placeholder="" className="border p-2 rounded w-full mt-1 h-40" readOnly/>
            </div>
        </div>
    )
}
