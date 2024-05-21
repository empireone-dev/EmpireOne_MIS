import React from 'react'
import EmployeeTableSection from './sections/employee-table-section'
import AdminLayout from '../../admin-layout'
import AddEmployeeButtonSection from './sections/add-employee-button-section'

export default function EmployeeRelationPage() {
  return (
    <AdminLayout>
        <AddEmployeeButtonSection/>
        <EmployeeTableSection/>
    </AdminLayout>
  )
}