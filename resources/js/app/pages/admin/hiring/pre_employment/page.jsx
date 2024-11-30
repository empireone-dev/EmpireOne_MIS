import React from 'react'
import AdminLayout from '../../admin-layout'
import PreEmploymentTableSection from './sections/pre-employment-table-section'
import store from '@/app/store/store';
import { get_checklist_thunk } from './redux/pre-employment-thunk';
import { useEffect } from 'react';
import Skeleton_2 from '@/app/pages/_components/skeleton_2';
import { useState } from 'react';

export default function PreEmploymentPage() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadData() {
      await store.dispatch(get_checklist_thunk())
      setLoading(false)
    }
    loadData()
  }, []);
  return (
    <AdminLayout>
      {loading ? (
        <div>
          <Skeleton_2 />
        </div>
      ) : (
        !loading && (
          <PreEmploymentTableSection />
        )
      )}
    </AdminLayout>
  )
}
