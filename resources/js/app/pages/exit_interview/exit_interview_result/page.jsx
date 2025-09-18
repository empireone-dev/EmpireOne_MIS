import React from 'react'
import ExitInterviewResultSection from './sections/exit-interview-result-section'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_employee_by_id_thunk } from '../../admin/employee_relation/employee_section/redux/employee-section-thunk';
import { get_user_thunk } from '../../redux/app-thunk';

export default function page() {
    const app_id = window.location.pathname.split("/")[4];

    useEffect(() => {
        store.dispatch(get_employee_by_id_thunk(app_id))
        store.dispatch(get_user_thunk())
    }, []);
    return (
        <div>
            <ExitInterviewResultSection />
        </div>
    )
}
