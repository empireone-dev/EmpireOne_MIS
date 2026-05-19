import React from 'react'

export default function InternetUsageSection() {
    return (
        <div className="w-full mb-10 px-4">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <img className="w-28" src="/images/newlogo.png" alt="logo" />
                    <h2 className="text-base font-bold text-gray-800">Internet Usage Policy</h2>
                </div>
                <iframe
                    src="/documents/Internet Usage Policy v1.pdf"
                    title="Internet Usage Policy"
                    className="w-full"
                    style={{ height: '1500px' }}
                />
            </div>
        </div>
    )
}
