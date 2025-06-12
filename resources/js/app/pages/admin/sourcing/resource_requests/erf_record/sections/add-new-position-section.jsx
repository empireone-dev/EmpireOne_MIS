import { PlusSquareFilled, PlusSquareTwoTone, SnippetsOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react';
import { Modal } from 'antd';
import React, { useState } from 'react'

export default function AddNewPositionSection() {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => router.visit('/admin/sourcing/erf_record/new_position')}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <SnippetsOutlined className='text-xl' />
                    Request New Position
                </button>
            </div>
        </div>
    )
}
