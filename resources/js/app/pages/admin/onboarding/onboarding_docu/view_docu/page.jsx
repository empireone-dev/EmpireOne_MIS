import React, { useEffect } from 'react'
import DocuSection from './sections/docu-section'
import AdminLayout from '../../../admin-layout'
import store from '@/app/store/store'
import { get_onboarding_docu_by_id_thunk } from '../redux/onboarding-docu-thunk'

export default function ViewDocuPage() {
    const id = window.location.pathname.split('/')[5]
    useEffect(() => {
      store.dispatch(get_onboarding_docu_by_id_thunk(id))
    }, [])
    return (
        <AdminLayout>
            <DocuSection />
        </AdminLayout>
    )
}
