import Wysiwyg from '@/app/pages/_components/wysiwyg'
import { router } from '@inertiajs/react'
import React from 'react'

export default function JobAnalysisFormSection() {
    return (
        <div>
            <div className="mb-12">
                <label htmlFor="content" className="block text-xl font-medium text-gray-800 text-center">Job Analysis</label>
                <Wysiwyg
                    label=""
                    name="wysiwyg"
                    value=""
                // onChange={formHandler}
                />
            </div>
            <div className='flex flex-1 gap-2 justify-end items-center'>
                <button className="rounded-md hover:bg-blue-100  w-32 h-10 mt-2"
                    type="button"
                    onClick={() => router.visit('/admin/sourcing/job_title_section')}>
                    Cancel
                </button>
                <button className="bg-blue-600 rounded-md hover:bg-blue-700 text-white w-32 h-10 mt-2">
                    Save Changes
                </button>
            </div>
        </div>
    )
}
