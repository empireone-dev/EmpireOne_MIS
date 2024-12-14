import React from 'react'
import ExitClearanceForm from './sections/exit-clearance-form'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_employee_by_id_thunk } from '../employee_relation/employee_section/redux/employee-section-thunk';
import { get_user_thunk } from '../../redux/app-thunk';

export default function ExitClearancePage() {
  const app_id = window.location.pathname.split("/")[3];
  useEffect(() => {
    store.dispatch(get_user_thunk)
    store.dispatch(get_employee_by_id_thunk(app_id))
  }, []);
  return (
    <div>
      <ExitClearanceForm />
    </div>
  )
}
