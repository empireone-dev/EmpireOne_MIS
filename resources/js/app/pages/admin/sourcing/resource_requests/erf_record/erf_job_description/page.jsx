import React from 'react'
import ErfJobDescriptionFormSection from './sections/erf-job-description-form-section'
import AdminLayout from '@/app/pages/admin/admin-layout'

export default function ErfJobDescriptionPage() {
  return (
    <AdminLayout>
      <ErfJobDescriptionFormSection/>
    </AdminLayout>
  )
}
