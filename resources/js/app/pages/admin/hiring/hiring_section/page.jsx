import React from 'react'
import AdminLayout from '../../admin-layout'
import HiringTableSection from './sections/hiring-table-section'
import store from '@/app/store/store';
import { get_job_offer_thunk } from './redux/hiring-thunk';
import { useEffect } from 'react';
import { get_applicant_by_app_id_thunk } from '../../final_rate/redux/final-rate-thunk';

export default function HiringSectionPage() {
  const app_id = window.location.pathname.split('/')[3]
  useEffect(() => {
    store.dispatch(get_applicant_by_app_id_thunk)
    store.dispatch(get_job_offer_thunk())
  }, []);
  return (
    <AdminLayout>
        <HiringTableSection/>
    </AdminLayout>
  )
}
