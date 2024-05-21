import AdminLayout from '@/app/pages/admin/admin-layout'
import React from 'react'
import ErfRecordsTableSection from './sections/erf-records-table-section'

export default function ErfRecordsPage() {
  return (
    <AdminLayout>
        <ErfRecordsTableSection/>
    </AdminLayout>
  )
}
