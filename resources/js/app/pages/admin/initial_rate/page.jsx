import React from 'react'
import InitialRateForm from './sections/initial-rate-form'
import AdminLayout from '../admin-layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_applicant_thunk } from '../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_applicant_by_app_id_thunk } from './redux/initial-rate-thunk';
import { get_guide_question_thunk } from '../recruitment/guide_question/redux/guide-question-thunk';

export default function InitialRatePage() {
  const app_id = window.location.pathname.split('/')[3]
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
    store.dispatch(get_applicant_by_app_id_thunk(app_id))
    store.dispatch(get_guide_question_thunk())
  }, []);
  
  return (
    <AdminLayout>
        <InitialRateForm
        />
    </AdminLayout>
  )
}
