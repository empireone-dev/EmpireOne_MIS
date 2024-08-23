import Wysiwyg from '@/app/pages/_components/wysiwyg'
import { router } from '@inertiajs/react'
import React from 'react'

export default function ErfJobAnalysisFormSection() {
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
        </div>
    )
}
