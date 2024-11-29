import React from 'react'
import AdminLayout from '../../admin-layout'
import AttritionTableSection from './sections/attrition-table-setion'
import store from '@/app/store/store';
import { get_employee_attrition_thunk } from './redux/employee-attrition-thunk';
import { useEffect } from 'react';
import Skeleton from '@/app/pages/_components/skeleton';
import { useState } from 'react';

export default function AttritionSectionPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      await store.dispatch(get_employee_attrition_thunk())
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
          <AttritionTableSection />
        )
      )}
    </AdminLayout>
  )
}
