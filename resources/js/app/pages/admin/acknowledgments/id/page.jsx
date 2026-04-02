import React, { useEffect, useState } from 'react'
import EmployeeAcknowledgementSection from './sections/employee-acknowledgement-section'
import AdminLayout from '../../admin-layout'
import store from '@/app/store/store';
import { get_employee_acknowledgment_by_emp_id_thunk, get_employee_by_id_thunk } from '../../employee_relation/employee_section/redux/employee-section-thunk';


export default function Page() {
    const emp_id = window.location.pathname.split('/')[3]
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            await store.dispatch(get_employee_acknowledgment_by_emp_id_thunk(emp_id))
            setLoading(false)
        }
        loadData()
    }, []);

    return (
        <AdminLayout>
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <EmployeeAcknowledgementSection />
            )}
        </AdminLayout>
    )
}
