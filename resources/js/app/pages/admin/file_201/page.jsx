import React from 'react'
import AdminLayout from '../admin-layout'
import File201TableSection from './sections/file-201-table-section'
import store from '@/app/store/store';
import { get_applicant_by_app_id_thunk } from '../final_rate/redux/final-rate-thunk';
import { useEffect } from 'react';
import { get_checklist_thunk } from '../hiring/pre_employment/redux/pre-employment-thunk';

export default function file_201_page() {
  const app_id = window.location.pathname.split('/')[3]
  useEffect(() => {
    store.dispatch(get_applicant_by_app_id_thunk(app_id))
    store.dispatch(get_checklist_thunk())
  }, []);
  return (
    <AdminLayout>
      <File201TableSection/>
    </AdminLayout>
  )
}
