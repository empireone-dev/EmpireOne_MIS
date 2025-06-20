import React from 'react'
import EmployeeTrainingsSection from './sections/employee-trainings-section'
import AdminLayout from '../../admin-layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_video_quiz_by_emp_id_thunk } from '@/app/pages/video_quiz/redux/video-quiz-thunk';

export default function Page() {
    const emp_id = window.location.pathname.split('/')[3]

    useEffect(() => {
        store.dispatch(get_video_quiz_by_emp_id_thunk(emp_id))
    }, []);
    return (
        <AdminLayout>
            <EmployeeTrainingsSection />
        </AdminLayout>
    )
}
