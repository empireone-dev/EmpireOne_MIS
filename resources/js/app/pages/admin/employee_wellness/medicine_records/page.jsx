import React from 'react'
import AdminLayout from '../../admin-layout'
import MedicineTableSection from './sections/medicine-table-section'

export default function MedicineRecordsPage() {
  return (
    <AdminLayout>
      <MedicineTableSection/>
    </AdminLayout>
  )
}
