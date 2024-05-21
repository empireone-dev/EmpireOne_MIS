import React from 'react'
import AdminLayout from '../../admin-layout'
import CreatedMemoSection from './sections/create-memo-section'
import MemoTableSection from './sections/memo-table-section'

export default function UploadMemoPage() {
  return (
    <AdminLayout>
      <CreatedMemoSection />
      <div className='mt-7'>
        <MemoTableSection />
      </div>
    </AdminLayout>
  )
}
