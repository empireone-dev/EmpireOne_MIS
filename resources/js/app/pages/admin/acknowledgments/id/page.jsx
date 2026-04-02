import React from 'react'
import EmployeeAcknowledgementSection from './sections/employee-acknowledgement-section'
import AdminLayout from '../../admin-layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_employee_acknowledgment_by_emp_id_thunk, get_employee_by_id_thunk } from '../../employee_relation/employee_section/redux/employee-section-thunk';

export default function Page() {
    const emp_id = window.location.pathname.split('/')[3]

    useEffect(() => {
        store.dispatch(get_employee_acknowledgment_by_emp_id_thunk(emp_id))
    }, []);
    return (
        <AdminLayout>
            <EmployeeAcknowledgementSection />
        </AdminLayout>
    )
}
