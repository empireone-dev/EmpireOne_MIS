import React from 'react'
import EmployeeTableSection from './sections/employee-table-section'
import AdminLayout from '../../admin-layout'
import store from '@/app/store/store';
import { get_employee_thunk } from './redux/employee-section-thunk';
import { useEffect } from 'react';

export default function EmployeeRelationPage() {
  useEffect(() => {
    store.dispatch(get_employee_thunk())
  }, []);
  return (
    <AdminLayout>
        <EmployeeTableSection/>
    </AdminLayout>
  )
}