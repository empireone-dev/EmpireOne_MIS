import React from 'react'
import EmployeeTableSection from './sections/employee-table-section'
import AdminLayout from '../../admin-layout'
import store from '@/app/store/store';
import { get_employee_thunk, get_hired_applicant_thunk } from './redux/employee-section-thunk';
import { useEffect } from 'react';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';

export default function EmployeeRelationPage() {
  useEffect(() => {
    store.dispatch(get_employee_thunk())
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_hired_applicant_thunk())
  }, []);
  return (
    <AdminLayout>
        <EmployeeTableSection/>
    </AdminLayout>
  )
}