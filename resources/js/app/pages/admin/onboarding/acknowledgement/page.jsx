import React from 'react'
import AdminLayout from '../../admin-layout'
import AcknowledgementTableSection from './sections/acknowledgement-table-section'
import store from '@/app/store/store';
import { get_job_offer_thunk } from './redux/acknowledgement-thunk';
import { useEffect } from 'react';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_job_position_thunk } from '../../sourcing/job_title_section/redux/job-title-thunk';
import { useState } from 'react';
import Skeleton from '@/app/pages/_components/skeleton';

export default function AcknowledgementPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      await store.dispatch(get_applicant_thunk())
      await store.dispatch(get_job_offer_thunk())
      await store.dispatch(get_job_position_thunk())
      setLoading(false)
    }
    loadData()
  }, []);
  return (
    <AdminLayout>
      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        !loading && (
          <AcknowledgementTableSection />
        )
      )}
    </AdminLayout>
  )
}
