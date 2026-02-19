import React, { useEffect } from 'react'
import AdminLayout from '../../../admin-layout'
import JobDescriptionFormSection from './sections/job-description-form-section'
import store from '@/app/store/store'
import { get_outsourcing_erf_by_id_thunk } from '../../department/redux/department-thunk'

export default function JobDescriptionPage() {
  const ref_id= window.location.pathname.split('/')[5]
  useEffect(()=>{
    store.dispatch(get_outsourcing_erf_by_id_thunk(ref_id))
  },[])
  return (
    <AdminLayout>
        <JobDescriptionFormSection/>
    </AdminLayout>
  )
}
