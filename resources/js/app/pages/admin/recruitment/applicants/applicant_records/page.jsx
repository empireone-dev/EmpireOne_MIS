import React from 'react'
import AdminLayout from '../../../admin-layout'
import ApplicantsTableSection from './sections/applicants-table-section'
import store from '@/app/store/store';
import { useEffect } from 'react';
import { get_applicant_thunk } from './redux/applicant-thunk';
import { get_job_position_thunk } from '../../../sourcing/job_title_section/redux/job-title-thunk';

export default function ApplicantRecords() {
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_job_position_thunk())
  }, []);
  return (
    <AdminLayout>
      <ApplicantsTableSection />
    </AdminLayout>
  )
}
