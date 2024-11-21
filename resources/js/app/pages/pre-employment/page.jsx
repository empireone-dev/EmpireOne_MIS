import React from 'react'
import PreEmploymentDetailsSection from './sections/pre-employment-details-section'
import store from '@/app/store/store';
import { get_applicant_by_app_id_thunk } from '../admin/final_rate/redux/final-rate-thunk';
import { useEffect } from 'react';
import { get_pre_employment_file_thunk } from './redux/pre-employment-files-thunk';
import { get_checklist_thunk } from '../admin/hiring/pre_employment/redux/pre-employment-thunk';

export default function PreEmploymentPage() {
  const app_id = window.location.pathname.split('/')[2]
  useEffect(() => {
    store.dispatch(get_checklist_thunk())
    store.dispatch(get_pre_employment_file_thunk(app_id))
    store.dispatch(get_applicant_by_app_id_thunk(app_id))
  }, []);
  return (
    <div>
        {/* <img src="/images/scemployee.jpg" className="absolute inset-0 w-full h-full object-cover"/> */}
        <PreEmploymentDetailsSection/>
    </div>
  )
}
