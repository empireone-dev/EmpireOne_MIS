import React from 'react'
import AdminLayout from '../../admin-layout'
import OnboardingDocuTableSection from './sections/onboarding-docu-table-section'
import store from '@/app/store/store';
import { get_onboarding_docu_thunk } from './redux/onboarding-docu-thunk';
import { useEffect } from 'react';

export default function OnboardingDocuPage() {
  useEffect(() => {
    store.dispatch(get_onboarding_docu_thunk())
  }, []);
  return (
    <AdminLayout>
        <OnboardingDocuTableSection/>
    </AdminLayout>
  )
}
