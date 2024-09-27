import React from 'react'
import AdminLayout from '../../admin-layout'
import AcknowledgementTableSection from './sections/acknowledgement-table-section'
import store from '@/app/store/store';
import { get_job_offer_thunk } from './redux/acknowledgement-thunk';
import { useEffect } from 'react';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_job_position_thunk } from '../../sourcing/job_title_section/redux/job-title-thunk';

export default function AcknowledgementPage() {
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_job_offer_thunk())
    store.dispatch(get_job_position_thunk())
  }, []);
  return (
    <AdminLayout>
        <AcknowledgementTableSection/>
    </AdminLayout>
  )
}
