import React from 'react'
import AdminLayout from '../admin-layout'
import CeoAnnouncementSection from './sections/ceo-announcement-section';
import CeoAnnouncementCardSection from './sections/ceo-announcement-card-section';

export default function Page() {
  
  return (
    <AdminLayout>
      <CeoAnnouncementSection/>
      <CeoAnnouncementCardSection/>
    </AdminLayout>
  )
}
