import React from 'react'
import FinalRateFormSection from './sections/final-rate-form-section'
import AdminLayout from '../admin-layout'
import store from '@/app/store/store';
import { get_applicant_thunk } from '../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_applicant_by_app_id_thunk } from './redux/final-rate-thunk';
import { useEffect } from 'react';

export default function FinalRatePage() {
  const app_id = window.location.pathname.split('/')[3]
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_applicant_by_app_id_thunk(app_id))
  }, []);
  return (
    <AdminLayout>
        <FinalRateFormSection/>
    </AdminLayout>
  )
}
