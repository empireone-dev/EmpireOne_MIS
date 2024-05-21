import { PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import React from 'react'

export default function AddEmployeeHealthDataSection() {
  return (
    <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <PlusSquareTwoTone className='text-xl'/>
                    Employee Health Data Form
                </button>
            </div>
        </div>
  )
}
