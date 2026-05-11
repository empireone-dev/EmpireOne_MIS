import React from 'react'
import EmployeePolicyAcknowledgementSection from './sections/employee-policy-acknowledgement-section'
import AdminLayout from '../../admin-layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_employee_policy_acknowledgment_by_emp_id_thunk } from '../../employee_relation/employee_section/redux/employee-section-thunk';

export default function page() {
    const emp_id = window.location.pathname.split('/')[4]
    useEffect(() => {
        store.dispatch(get_employee_policy_acknowledgment_by_emp_id_thunk(emp_id))
    }, []);
  return (
    <AdminLayout>
        <EmployeePolicyAcknowledgementSection/>
    </AdminLayout>
  )
}
