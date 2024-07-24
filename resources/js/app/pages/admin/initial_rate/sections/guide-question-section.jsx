import React from 'react'
import InitialGuideQuestionComponent from '../components/initial-guide-question-component'

export default function GuideQuestionSection() {
    return (
        <div className='mt-3'>
            <h1><b>Guide questions asked during the interview:</b></h1>
            <div className='flex flex-1 gap-24 mt-2'>
                <div>
                    <InitialGuideQuestionComponent question="Tell me something about yourself?" />
                    <InitialGuideQuestionComponent question="How do you see your skills aligning with the requirements of this position?" />
                    <InitialGuideQuestionComponent question="Can you give an example of a successful collaboration with a team in your previous role?" />
                    <InitialGuideQuestionComponent question="What motivates your dedication to achieving excellence, especially during demanding times?" />
                    <InitialGuideQuestionComponent question="Share a time you quickly learned a new skill for a job." />
                    <InitialGuideQuestionComponent question="Share a teamwork conflict you resolved." />
                    <InitialGuideQuestionComponent question="How do you ensure clear communication, especially in complex situations?" />
                </div>
                <div>
                    <InitialGuideQuestionComponent question="How would you describe your key strengths and skills relevant to this role?" />
                    <InitialGuideQuestionComponent question="Can you share a situation where you had to overcome a significant challenge at work?" />
                    <InitialGuideQuestionComponent question="Share a significant challenge you faced and how you managed it effectively." />
                    <InitialGuideQuestionComponent question="How do you manage workplace stress? Give examples of staying productive under pressure." />
                    <InitialGuideQuestionComponent question="How do you handle feedback on your work to improve yourself professionally?" />
                    <InitialGuideQuestionComponent question="Discuss how you learn from failures and disappointments." />
                    <InitialGuideQuestionComponent question="Explain how your experience and skills align with the job and contribute to the company." />
                </div>
            </div>
        </div>
    )
}
