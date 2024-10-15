import React, { useEffect } from 'react'
import EditDocumentSection from './sections/edit-document-section'
import AdminLayout from '../../../admin-layout'
import store from '@/app/store/store';
import { get_onboarding_docu_by_id_thunk} from '../redux/onboarding-docu-thunk';

export default function EditDocuPage() {
  const id = window.location.pathname.split('/')[5]
  useEffect(() => {
    store.dispatch(get_onboarding_docu_by_id_thunk(id))
  }, [])
  return (
    <AdminLayout>
      <EditDocumentSection />
    </AdminLayout>
  )
}
