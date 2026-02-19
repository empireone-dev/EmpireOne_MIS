import AdminLayout from '@/app/pages/admin/admin-layout'
import React from 'react'
import ErfRecordsTableSection from './sections/erf-records-table-section'
import { get_erf_record_thunk } from './redux/erf-record-thunk';
import { useEffect } from 'react';
import store from '@/app/store/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Skeleton from '@/app/pages/_components/skeleton';

export default function ErfRecordsPage() {
  useEffect(() => {
    store.dispatch(get_erf_record_thunk())
  }, []);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadData() {
      await store.dispatch((get_erf_record_thunk()))
      setLoading(false)
    }
    loadData()
  }, [loading]);
  return (
    <AdminLayout>
      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        !loading && (
          <ErfRecordsTableSection />
        )
      )}
    </AdminLayout>
  )
}
