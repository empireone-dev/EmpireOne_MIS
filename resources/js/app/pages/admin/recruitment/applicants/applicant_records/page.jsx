import React from 'react'
import AdminLayout from '../../../admin-layout'
import ApplicantsTableSection from './sections/applicants-table-section'
import store from '@/app/store/store';
import { useEffect } from 'react';
import { get_applicant_thunk } from './redux/applicant-thunk';
import { get_job_position_thunk } from '../../../sourcing/job_title_section/redux/job-title-thunk';
import { useState } from 'react';
import Skeleton from '@/app/pages/_components/skeleton';
import { useDispatch } from 'react-redux';

export default function ApplicantRecords() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadData() {
      await store.dispatch((get_applicant_thunk()))
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
          <ApplicantsTableSection />
        )
      )}
    </AdminLayout>
  )
}
