import React from 'react'
import ExitInterviewFormSection from './sections/exit-interview-form-section'
import store from '@/app/store/store';
import { useEffect } from 'react';
import { get_employee_by_id_thunk } from '../employee_relation/employee_section/redux/employee-section-thunk';

export default function ExitInterviewPage() {
  const app_id = window.location.pathname.split("/")[3];
  useEffect(() => {
    store.dispatch(get_employee_by_id_thunk(app_id))
  }, []);
  return (
    <div>
      <ExitInterviewFormSection />
    </div>
  )
}
