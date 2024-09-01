import { CheckCircleFilled } from '@ant-design/icons'
import React from 'react'
import TeamworkSection from './teamwork-section'
import ProblemSolvingSection from './problem-solving-section'
import CustomerServiceSection from './customer-service-section'
import GuideQuestionSection from './guide-question-section'

export default function InitialRateForm({ data }) {
    return (
        <div>
            <div className='flex text-xl items-center justify-center mb-1'>
                <h1><b>Initial Rating Scale</b></h1>
            </div>
            <form className='border rounded-lg p-3.5'>
                <div className='flex flex-1 gap-3.5'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Application No.</b></label>
                        <input type="number" placeholder="" className="border p-2 rounded w-full" readOnly />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Applicant's Name</b></label>
                        <input type="text" placeholder="" className="border p-2 rounded w-full" readOnly />
                    </div>
                </div>
                <TeamworkSection />
                <ProblemSolvingSection />
                <CustomerServiceSection />
                <GuideQuestionSection />
                <div className='flex flex-col w-full mt-3'>
                    <label htmlFor=""><b>OVERALL RESULT</b></label>
                    <input type="number" name='ini_overall_r' placeholder="" className="border p-2 rounded w-full mt-1" readOnly />
                </div>
                <div className='flex flex-col w-full mt-5'>
                    <label htmlFor=""><b>INITIAL PHASE INTERVIEWER</b></label>
                    <input type="number" placeholder="" className="border p-2 rounded w-full mt-1" readOnly />
                </div>
                <div className='mt-5'>
                    <label><b>OVERALL COMMENT</b></label>
                    <textarea placeholder="" name='ini_overall_c' className="border p-2 rounded w-full mt-1 h-40" />
                </div>
                <div className="flex justify-end mt-3.5">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                        <CheckCircleFilled /> CONFIRM
                    </button>
                </div>
            </form>
        </div>
    )
}
