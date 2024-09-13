import React from 'react'
import AdminLayout from '../admin-layout'
import OverallResultPageSection from './sections/overall-result-page-section'
import { useEffect } from 'react'
import store from '@/app/store/store'
import { get_applicant_by_app_id_thunk } from '../final_rate/redux/final-rate-thunk'

export default function OverallResultPage() {
    const app_id = window.location.pathname.split('/')[3]
    useEffect(()=>{
        store.dispatch(get_applicant_by_app_id_thunk(app_id))
    },[])
    return (
        <AdminLayout>
            <OverallResultPageSection/>
        </AdminLayout>
    )
}
