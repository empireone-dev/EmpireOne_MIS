import React from 'react'
import AcknowledgmentsTableSection from './sections/acknowledgments-table-section'
import AdminLayout from '../admin-layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_all_employees_service } from '../../services/employee-service';
import { get_employee_thunk } from '../employee_relation/employee_section/redux/employee-section-thunk';

export default function page() {
    useEffect(() => {
        // store.dispatch(get_all_employees_service())
        store.dispatch(get_employee_thunk())
    }, []);
  return (
    <AdminLayout>
        <AcknowledgmentsTableSection/>
    </AdminLayout>
  )
}
