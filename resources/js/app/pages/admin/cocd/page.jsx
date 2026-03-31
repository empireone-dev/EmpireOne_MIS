import React from 'react'
import CocdDocumentsSection from './sections/cocd-documents-section'
import AdminLayout from '../admin-layout'

export default function page() {
  return (
    <AdminLayout>
        <CocdDocumentsSection />
    </AdminLayout>
  )
}
