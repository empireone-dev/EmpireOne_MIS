import React from 'react'
import TeamworkInitialResultSection from '../../initial_result/sections/teamwork-initial-result-section'
import ProblemSolvingInitialResultSection from '../../initial_result/sections/problem-solving-initial-result-section'
import CustomerServiceInitialResultSection from '../../initial_result/sections/customer-service-initial-result-section'
import GuideQuestionInitialSection from '../../initial_result/sections/guide-question-initial-section'

export default function InitialPhaseResultSection() {
    return (
        <div>
            <form className='border rounded-lg p-3.5'>
                <div className='flex flex-1 gap-3.5'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Application No.</b></label>
                        <input type="number" placeholder="" value="24022201" className="border p-2 rounded w-full" readOnly />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Applicant's Name</b></label>
                        <input type="text" placeholder="" value="Sample Samplesss" className="border p-2 rounded w-full" readOnly />
                    </div>
                </div>
                <TeamworkInitialResultSection />
                <ProblemSolvingInitialResultSection />
                <CustomerServiceInitialResultSection />
                <div className='flex flex-col w-full mt-3'>
                    <label htmlFor=""><b>OVERALL RESULT</b></label>
                    <input type="number" placeholder="" className="border p-2 rounded w-full mt-1" readOnly />
                </div>
                <div className='flex flex-col w-full mt-5'>
                    <label htmlFor=""><b>INITIAL PHASE INTERVIEWER</b></label>
                    <input type="number" placeholder="" className="border p-2 rounded w-full mt-1" readOnly />
                </div>
                <div className='mt-5'>
                    <label><b>OVERALL COMMENT</b></label>
                    <textarea placeholder="" className="border p-2 rounded w-full mt-1 h-40" readOnly />
                </div>
            </form>
        </div>
    )
}
