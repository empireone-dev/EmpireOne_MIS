import React from 'react'
import JobOfferSection from './sections/job-offer-section'
import { useEffect } from 'react'
import store from '@/app/store/store';
import { get_applicant_thunk } from '../admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_applicant_by_app_id_thunk } from '../admin/final_rate/redux/final-rate-thunk';

export default function JobOfferPage() {
  const app_id = window.location.pathname.split('/')[2]
  console.log('werwe0',window.location.pathname.split('/'))
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_applicant_by_app_id_thunk(app_id))
  }, []);
  return (
    <div>
      <JobOfferSection/>
    </div>
  )
}
