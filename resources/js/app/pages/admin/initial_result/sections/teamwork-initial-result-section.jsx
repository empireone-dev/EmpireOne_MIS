import { UserGroupIcon } from '@heroicons/react/24/outline'
import React from 'react'
import InitialRateMarkComponent from '../components/initial-rate-mark-component'

export default function TeamworkInitialResultSection() {
    return (
        <div>
            <div className="flex items-center mt-6 mb-2">
                <UserGroupIcon className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">TEAMWORK/ INTERPERSONAL SKILLS</h1>
            </div>
            <hr className='mb-1.5'></hr>
            <div>
                <label htmlFor=""><b>TEAMWORK/ INTERPERSONAL SKILLS SCORE</b></label>
                <div className='flex flex-1 w-full gap-8 mt-1'>
                    <InitialRateMarkComponent rate="1 - Very Poor" onClick={() => handleTeamworkRatingChange(1)} />
                    <InitialRateMarkComponent rate="2 - Poor" onClick={() => handleTeamworkRatingChange(2)} />
                    <InitialRateMarkComponent rate="3 - Average" onClick={() => handleTeamworkRatingChange(3)} />
                    <InitialRateMarkComponent rate="4 - Good" onClick={() => handleTeamworkRatingChange(4)} />
                    <InitialRateMarkComponent rate="5 - Excellent" onClick={() => handleTeamworkRatingChange(5)} />
                </div>
            </div>
            <div className='mt-6'>
                <label htmlFor=""><b>TEAMWORK/ INTERPERSONAL SKILLS NOTES</b></label>
                <textarea type="text" placeholder="" className="border p-2 rounded w-full mt-1 h-40" readOnly />
            </div>
        </div>
    )
}
