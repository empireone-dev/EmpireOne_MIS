import React, { useEffect } from 'react'
import AdminLayout from '../../../admin-layout'
import UpdateEmployeeFormSection from './sections/update-employee-form-section'
import store from '@/app/store/store';
import { get_applicant_thunk } from '../../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_applicant_by_app_id_thunk } from '../../../final_rate/redux/final-rate-thunk';
import { get_employee_thunk, get_hired_applicant_thunk } from '../redux/employee-section-thunk';

export default function UpdateEmployeePage() {
    const app_id = window.location.pathname.split('/')[5]
    useEffect(() => {
        store.dispatch(get_applicant_thunk())
        store.dispatch(get_applicant_by_app_id_thunk(app_id))
        store.dispatch(get_employee_thunk())
        store.dispatch(get_hired_applicant_thunk())
    }, []);
    return (
        <AdminLayout>
            <UpdateEmployeeFormSection />
        </AdminLayout>

    )
}
