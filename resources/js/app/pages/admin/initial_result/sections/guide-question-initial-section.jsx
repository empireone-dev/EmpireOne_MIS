import React from 'react'
import InitialGuideQuestionComponent from '../components/initial-guide-question-component'

export default function GuideQuestionInitialSection() {
    return (
        <div className='mt-3'>
            <h1><b>Guide questions asked during the interview:</b></h1>
            <div className='flex flex-1 gap-24 mt-2'>
                <div>
                    <InitialGuideQuestionComponent question="How do you see your skills aligning with the requirements of this position?" />
                    <InitialGuideQuestionComponent question="Can you give an example of a successful collaboration with a team in your previous role?" />
                </div>
                <div>
                    <InitialGuideQuestionComponent question="How would you describe your key strengths and skills relevant to this role?" />
                </div>
            </div>
        </div>
    )
}
