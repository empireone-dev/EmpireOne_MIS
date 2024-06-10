import React from 'react'
import AdminLayout from '../../admin-layout'
import AcknowledgementTableSection from './sections/acknowledgement-table-section'
import store from '@/app/pages/store/store';
import { get_job_offer_thunk } from './redux/acknowledgement-thunk';
import { useEffect } from 'react';

export default function AcknowledgementPage() {
  useEffect(() => {
    store.dispatch(get_job_offer_thunk())
  }, []);
  return (
    <AdminLayout>
        <AcknowledgementTableSection/>
    </AdminLayout>
  )
}
