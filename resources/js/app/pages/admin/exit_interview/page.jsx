import React from 'react'
import ExitInterviewFormSection from './sections/exit-interview-form-section'
import store from '@/app/store/store';
import { useEffect } from 'react';
import { get_employee_by_id_thunk } from '../employee_relation/employee_section/redux/employee-section-thunk';
import { get_user_thunk } from '../../redux/app-thunk';

export default function ExitInterviewPage() {
  const app_id = window.location.pathname.split("/")[4];
  useEffect(() => {
    store.dispatch(get_employee_by_id_thunk(app_id))
    store.dispatch(get_user_thunk())
  }, []);
  return (
    <div>
      <ExitInterviewFormSection />
    </div>
  )
}
