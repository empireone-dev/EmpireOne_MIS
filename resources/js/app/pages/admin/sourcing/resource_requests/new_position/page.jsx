import React, { useEffect } from 'react'
import AdminLayout from '../../../admin-layout'
import NewPositionFormSection from './sections/new-position-form-section'
import store from '@/app/store/store'
import { get_job_position_thunk } from '../../job_title_section/redux/job-title-thunk'
import { get_department_thunk, get_outsourcing_erf_thunk } from '../../department/redux/department-thunk'
import moment from 'moment'

export default function RequestNewPositionPage() {

  useEffect(()=>{
    store.dispatch(get_job_position_thunk())
    store.dispatch(get_department_thunk())
    store.dispatch(get_outsourcing_erf_thunk(moment().format('YYYY-MM-DD')))
  },[])
  return (
    <AdminLayout>
      <NewPositionFormSection/>
    </AdminLayout>
  )
}
