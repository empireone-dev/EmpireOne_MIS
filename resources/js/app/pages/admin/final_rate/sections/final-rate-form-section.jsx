import { CheckCircleFilled } from '@ant-design/icons'
import React from 'react'
import CustomerServiceFinalSection from './customer-service-final-rate-section'
import WorkEffectivenessFinalRateSection from './work-effectiveness-final-rate-section'

export default function FinalRateFormSection() {
    return (
        <div>
            <div className='flex text-xl items-center justify-center mb-1'>
                <h1><b>Final Rating Scale</b></h1>
            </div>
            <div className='flex flex-1 justify-end pr-4'>
                <h1 className='text-lg mb-2 bg-ge'><b>Status:</b></h1> <h1 className='bg-green-500 text-lg rounded-md p-1 text-white ml-1'>Passed</h1>
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
                <CustomerServiceFinalSection />
                <WorkEffectivenessFinalRateSection />
                <div className='flex items-center mb-5 mt-3 gap-1'>
                    <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-black rounded focus:ring-blue-500 focus:ring-2" />
                    <h1><b>Mark as Tier Shark</b></h1>
                </div>
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
                    <textarea placeholder="" className="border p-2 rounded w-full mt-1 h-40" />
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
