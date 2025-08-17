import React from 'react'

export default function CheckboxInputComponent({ label, onChange }) {
    return (
        <div>
            <div class="flex items-center mt-2">
                <input onChange={(e) => onChange(e)} id="default-checkbox" type="checkbox" value={label} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 " />
                <span for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">{label}</span>
            </div>
        </div>
    )
}
