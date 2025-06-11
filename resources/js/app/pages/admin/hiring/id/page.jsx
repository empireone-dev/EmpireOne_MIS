import React from 'react'
import JobOfferDocumentSection from './sections/job-offer-document-section'
import AdminLayout from '../../admin-layout'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_applicant_thunk } from '../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import { get_applicant_by_app_id_thunk } from '../../final_rate/redux/final-rate-thunk';

export default function page() {
    const app_id = window.location.pathname.split('/')[3]

    useEffect(() => {
        store.dispatch(get_applicant_thunk())
        store.dispatch(get_applicant_by_app_id_thunk(app_id))
    }, []);
    return (
        <AdminLayout>
            <JobOfferDocumentSection />
        </AdminLayout>
    )
}
