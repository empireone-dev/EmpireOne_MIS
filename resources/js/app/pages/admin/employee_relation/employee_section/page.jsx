import React from 'react'
import EmployeeTableSection from './sections/employee-table-section'
import AdminLayout from '../../admin-layout'
import store from '@/app/store/store';
import { get_employee_thunk, get_hired_applicant_thunk } from './redux/employee-section-thunk';
import { useEffect } from 'react';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import Skeleton from '@/app/pages/_components/skeleton';
import { useState } from 'react';
import { get_account_thunk } from './redux/account-thunk';

export default function EmployeeRelationPage() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      await store.dispatch((get_employee_thunk()))
      // await store.dispatch(get_applicant_thunk())
      await store.dispatch(get_hired_applicant_thunk())
      await store.dispatch(get_account_thunk())
      setLoading(false)
    }
    loadData()
  }, []);
  
  return (
    <AdminLayout>
      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        !loading && (
          <EmployeeTableSection />
        )
      )}
    </AdminLayout>
  )
}