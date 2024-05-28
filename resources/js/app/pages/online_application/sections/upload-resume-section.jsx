import { FilePdfOutlined } from '@ant-design/icons'
import React from 'react'

export default function UploadResumeSection() {
    return (
        <div>
            <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
                <div className="grid gap-1">
                    <FilePdfOutlined className='flex items-center justify-center text-4xl' />
                    <h2 className="text-center text-gray-400   text-xs leading-4">PDF File</h2>
                </div>
                <div className="grid gap-2">
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
                    <div className="flex items-center justify-center">
                        <label>
                            <input type="file" accept="application/pdf" hidden />
                            <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File</div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
