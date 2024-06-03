import React from 'react'
import AdminLayout from '../../../admin-layout'
import ApplicantsTableSection from './sections/applicants-table-section'
import store from '@/app/pages/store/store';
import { useEffect } from 'react';
import { get_applicant_thunk } from './redux/applicant-thunk';

export default function ApplicantRecords() {
  useEffect(() => {
    store.dispatch(get_applicant_thunk())
  }, []);
  return (
    <AdminLayout>
      <ApplicantsTableSection />
    </AdminLayout>
  )
}
