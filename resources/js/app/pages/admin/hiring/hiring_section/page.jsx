import React from 'react'
import AdminLayout from '../../admin-layout'
import HiringTableSection from './sections/hiring-table-section'
import store from '@/app/store/store';
import { get_job_offer_thunk } from './redux/hiring-thunk';
import { useEffect } from 'react';
import { get_job_position_thunk } from '../../sourcing/job_title_section/redux/job-title-thunk';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';

export default function HiringSectionPage() {
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_job_offer_thunk())
    store.dispatch(get_job_position_thunk())
  }, []);
  return (
    <AdminLayout>
      <HiringTableSection />
    </AdminLayout>
  )
}
