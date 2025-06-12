import React, { useEffect } from 'react'
import AdminLayout from '../../admin-layout'
import DepartmentCreateSection from './sections/department-create-section'
import DepartmentTableSection from './sections/department-table-section'
import store from '@/app/store/store'
import { get_department_service } from '@/app/pages/services/department-service'
import { get_department_thunk } from './redux/department-thunk'

export default function DepartmentPage() {
  useEffect(() => {
    store.dispatch(get_department_thunk())
  }, [])
  return (
    <AdminLayout>
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 mb-3">
          <b>Departments</b>
        </h2>
      </div>
      <DepartmentCreateSection />
      <DepartmentTableSection />
    </AdminLayout>
  )
}
