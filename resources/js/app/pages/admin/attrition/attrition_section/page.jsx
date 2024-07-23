import React from 'react'
import AdminLayout from '../../admin-layout'
import AttritionTableSection from './sections/attrition-table-setion'
import store from '@/app/store/store';
import { get_employee_attrition_thunk } from './redux/employee-attrition-thunk';
import { useEffect } from 'react';

export default function AttritionSectionPage() {
  useEffect(() => {
    store.dispatch(get_employee_attrition_thunk())
  }, []);
  return (
    <AdminLayout>
      <AttritionTableSection/>
    </AdminLayout>
  )
}
