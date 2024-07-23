import React from 'react'
import AdminLayout from '../../admin-layout'
import MedicineTableSection from './sections/medicine-table-section'
import store from '@/app/store/store';
import { get_medicine_record_thunk } from './redux/medicine-record-thunk';
import { useEffect } from 'react';

export default function MedicineRecordsPage() {
  useEffect(() => {
    store.dispatch(get_medicine_record_thunk())
  }, []);
  return (
    <AdminLayout>
      <MedicineTableSection/>
    </AdminLayout>
  )
}
