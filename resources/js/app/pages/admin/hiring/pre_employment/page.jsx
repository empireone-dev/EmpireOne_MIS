import React from 'react'
import AdminLayout from '../../admin-layout'
import PreEmploymentTableSection from './sections/pre-employment-table-section'
import store from '@/app/pages/store/store';
import { get_checklist_thunk } from './redux/pre-employment-thunk';
import { useEffect } from 'react';

export default function PreEmploymentPage() {
  useEffect(() => {
    store.dispatch(get_checklist_thunk())
  }, []);
  return (
    <AdminLayout>
        <PreEmploymentTableSection/>
    </AdminLayout>
  )
}
