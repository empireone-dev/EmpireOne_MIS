import React from 'react'
import CustomerServiceFinalResultSection from './customer-service-final-result-section'
import WorkEffectivenessFinalResultSection from './work-effectiveness-final-result-section'

export default function FinalPhaseResultSection() {
  return (
    <div>
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
                <CustomerServiceFinalResultSection/>
                <WorkEffectivenessFinalResultSection/>
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
