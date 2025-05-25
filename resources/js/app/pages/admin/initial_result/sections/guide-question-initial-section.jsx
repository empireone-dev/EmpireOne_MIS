import React from 'react'
import InitialGuideQuestionComponent from '../components/initial-guide-question-component'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function GuideQuestionInitialSection({ data }) {
    console.log('Guide Questions:', data)

    return (
        <div className='mt-6 '>
            <div className="flex items-center mt-6 mb-2">
                <QuestionCircleOutlined className="h-6" />
                <h1 className="text-2xl ml-1 font-bold">Guide questions asked during the interview:</h1>
            </div>
            <div className='flex flex-col gap-4 mt-2'>
                {data.guideqs && data.guideqs.map((item, index) => (
                    <InitialGuideQuestionComponent key={item.id || index} question={item.guideqs} answer={item.answer} />
                ))}
            </div>
        </div>
    )
}
