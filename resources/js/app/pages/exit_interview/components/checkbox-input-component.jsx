import React from 'react'

export default function CheckboxInputComponent({ label }) {
    return (
        <div>
            <div class="flex items-center mt-2">
                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 " />
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">{label}</label>
            </div>
        </div>
    )
}
