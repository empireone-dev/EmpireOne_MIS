import React from 'react'
import AdminLayout from '../admin-layout'
import DashboardCardSection from './sections/dashboard-card-section'
import AdminFooterComponents from '../_components/admin-footer-components'

export default function DashboardPage() {
  return (
    <AdminLayout>
      <DashboardCardSection/>
    </AdminLayout>
  )
}
