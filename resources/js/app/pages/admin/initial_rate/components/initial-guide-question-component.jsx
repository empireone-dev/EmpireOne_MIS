import React from 'react'

export default function InitialGuideQuestionComponent({ question }) {
    return (
        <div className='flex items-center mb-3 gap-1'>
            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-black rounded focus:ring-blue-500 focus:ring-2" />
            <h1><b>{question}</b></h1>
        </div>
    )
}
