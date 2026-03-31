import React from 'react'
import EmployeeLayout from '../employee-layout'
import CocdDocumentsSection from './sections/cocd-documents-section'

export default function page() {
  return (
    <EmployeeLayout>
        <CocdDocumentsSection />
    </EmployeeLayout>
  )
}
