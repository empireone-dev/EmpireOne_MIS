import React, { useEffect } from 'react'
import ExistingPositionFormSection from './sections/existing-position-form-section'
import moment from 'moment'
import store from '@/app/store/store'
import { get_job_position_thunk } from '../../job_title_section/redux/job-title-thunk'
import { get_department_thunk, get_outsourcing_erf_thunk } from '../../department/redux/department-thunk'
import AdminLayout from '@/app/pages/admin/admin-layout'
import { get_account_thunk } from '@/app/pages/admin/employee_relation/employee_section/redux/account-thunk'

export default function ExistingPositionPage() {
  useEffect(()=>{
    store.dispatch(get_job_position_thunk())
    store.dispatch(get_department_thunk())
    store.dispatch(get_account_thunk())
    store.dispatch(get_outsourcing_erf_thunk(moment().format('YYYY-MM-DD')))
  },[])
  return (
    <AdminLayout>
        <ExistingPositionFormSection/>
    </AdminLayout>
  )
}
