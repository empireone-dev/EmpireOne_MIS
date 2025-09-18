import React from 'react'
import ExitInterviewFormSection from './sections/exit-interview-form-section'
import store from '@/app/store/store';
import { useEffect } from 'react';
import { get_applicant_by_app_id_thunk } from '../admin/final_rate/redux/final-rate-thunk';
import { get_employee_by_id_thunk } from '../admin/employee_relation/employee_section/redux/employee-section-thunk';
import { get_users_thunk } from '../redux/app-thunk';

export default function ExitInterviewPage() {
  const app_id = window.location.pathname.split("/")[4];
  useEffect(() => {
    store.dispatch(get_employee_by_id_thunk(app_id))
  }, []);
  return (
    <div>
      <ExitInterviewFormSection />
    </div>
  )
}
