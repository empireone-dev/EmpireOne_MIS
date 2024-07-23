import React from 'react'
import AdminLayout from '../../admin-layout'
import EmployeeHealthDataSection from './sections/employee-health-data-table-section'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_employee_thunk } from './redux/employee-health-data-thunk';

export default function EmployeeHealthDataPage() {
  useEffect(() => {

    store.dispatch(get_employee_thunk())
  }, []);
  return (
    <AdminLayout>
      <EmployeeHealthDataSection/>
    </AdminLayout>
  )
}
