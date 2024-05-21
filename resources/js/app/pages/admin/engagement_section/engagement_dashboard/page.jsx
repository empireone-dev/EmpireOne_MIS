import React from 'react'
import AdminLayout from '../../admin-layout'
import EngagementDashboardCardSection from './sections/engagement-dashboard-card-section'
import EngagementAnnouncementSection from './sections/engagement-announcement-section'

export default function EngagementDashboardPage() {
  return (
    <AdminLayout>
      <EngagementAnnouncementSection/>
      <div >
      <EngagementDashboardCardSection/>
      </div>
    </AdminLayout>
  )
}
