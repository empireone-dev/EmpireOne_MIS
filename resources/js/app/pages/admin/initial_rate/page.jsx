import React from 'react'
import InitialRateForm from './sections/initial-rate-form'
import AdminLayout from '../admin-layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_applicant_thunk } from '../recruitment/applicants/applicant_records/redux/applicant-thunk';

export default function InitialRatePage() {
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
  }, []);
  return (
    <AdminLayout>
        <InitialRateForm
        //  data={}
        />
    </AdminLayout>
  )
}
