import React from 'react'
import QuitClaimUploadSection from './sections/quit-claim-upload-section'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_employee_attrition_by_emp_id_thunk } from '../admin/attrition/attrition_section/redux/employee-attrition-thunk';

export default function page() {
    const emp_id = window.location.pathname.split("/")[2];
    useEffect(() => {
        store.dispatch(get_employee_attrition_by_emp_id_thunk(emp_id));
    }, []);
    return (
        <div>
            <QuitClaimUploadSection />
        </div>
    )
}
