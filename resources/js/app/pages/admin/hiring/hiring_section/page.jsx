import React from 'react'
import AdminLayout from '../../admin-layout'
import HiringTableSection from './sections/hiring-table-section'
import store from '@/app/store/store';
import { get_job_offer_thunk } from './redux/hiring-thunk';
import { useEffect } from 'react';
import { get_job_position_thunk } from '../../sourcing/job_title_section/redux/job-title-thunk';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import Skeleton from '@/app/pages/_components/skeleton';
import { useState } from 'react';

export default function HiringSectionPage() {
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
          <HiringTableSection />
        )
      )}
    </AdminLayout>
  )
}
