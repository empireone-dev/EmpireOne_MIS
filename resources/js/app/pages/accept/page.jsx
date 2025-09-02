import React from 'react'
import { useEffect } from 'react';
import store from '@/app/store/store';
import { get_interview_confirmation_thunk } from '../admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import AcceptSection from './sections/accept-section';

export default function ConfirmationPage() {
    useEffect(() => {
        store.dispatch(get_interview_confirmation_thunk())
    }, []);
    return (
        <div>
            <AcceptSection />
        </div>
    )
}
