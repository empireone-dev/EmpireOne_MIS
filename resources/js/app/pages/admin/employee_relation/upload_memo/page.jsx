import React from 'react'
import AdminLayout from '../../admin-layout'
import CreatedMemoSection from './sections/create-memo-section'
import MemoTableSection from './sections/memo-table-section'
import store from '@/app/store/store';
import { get_emp_memo_thunk } from './redux/emp-memo-thunk';
import { useEffect } from 'react';

export default function UploadMemoPage() {
  useEffect(() => {
    store.dispatch(get_emp_memo_thunk())
  }, []);
  return (
    <AdminLayout>
      <CreatedMemoSection />
      <div className='mt-7'>
        <MemoTableSection />
      </div>
    </AdminLayout>
  )
}
