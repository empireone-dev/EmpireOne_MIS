import React from 'react'
import AcknowledgmentsTableSection from './sections/acknowledgments-table-section'
import AdminLayout from '../admin-layout'

export default function page() {
  return (
    <AdminLayout>
        <AcknowledgmentsTableSection/>
    </AdminLayout>
  )
}
