import React from 'react'
import AdminLayout from '../../admin-layout'
import HiringTableSection from './sections/hiring-table-section'
import store from '@/app/pages/store/store';
import { get_job_offer_thunk } from './redux/hiring-thunk';
import { useEffect } from 'react';

export default function HiringSectionPage() {
  useEffect(() => {
    store.dispatch(get_job_offer_thunk())
  }, []);
  return (
    <AdminLayout>
        <HiringTableSection/>
    </AdminLayout>
  )
}
