import React from 'react'
import AdminLayout from '../../admin-layout'
import OnboardingDocuTableSection from './sections/onboarding-docu-table-section'
import store from '@/app/store/store';
import { get_onboarding_docu_thunk } from './redux/onboarding-docu-thunk';
import { useEffect } from 'react';
import Skeleton_3 from '@/app/pages/_components/skeleton_3';
import { useState } from 'react';

export default function OnboardingDocuPage() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadData() {
      await store.dispatch(get_onboarding_docu_thunk())
      setLoading(false)
    }
    loadData()
  }, []);
  return (
    <AdminLayout>
      {loading ? (
        <div>
          <Skeleton_3 />
        </div>
      ) : (
        !loading && (
          <OnboardingDocuTableSection />
        )
      )}
    </AdminLayout>
  )
}
