import React from 'react'
import AdminLayout from '../admin-layout'
import ComplianceTableSection from './sections/compliance-table-section'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_video_quiz_thunk } from '../../video_quiz/redux/video-quiz-thunk';

export default function Page() {
    useEffect(() => {
        store.dispatch(get_video_quiz_thunk())
    }, []);
    return (
        <AdminLayout>
            <ComplianceTableSection />
        </AdminLayout>
    )
}
