import React from 'react'
import ApplicationFormSection from './sections/application-form-section'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_applicant_thunk } from '../admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_job_position_thunk } from '../admin/sourcing/job_title_section/redux/job-title-thunk';

export default function OnlineApplicationPage() {
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_job_position_thunk())
  }, []);
  return (
    <div>
      <ApplicationFormSection/>
    </div>
  )
}
