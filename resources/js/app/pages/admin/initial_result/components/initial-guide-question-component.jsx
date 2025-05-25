import React from 'react'

export default function InitialGuideQuestionComponent({ question, answer }) {
    return (
        <div className='flex flex-col gap-1'>
            <div>
                <h1><b>• {question}</b></h1>
            </div>
            <div>
                <h1>&emsp;- {answer}</h1>
            </div>
        </div>
    )
}
