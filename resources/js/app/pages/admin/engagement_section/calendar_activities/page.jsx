import React, { useEffect } from 'react'
import AdminLayout from '../../admin-layout'
import EngagementCalendarSection from './sections/engagement-calendar-section'
import store from '@/app/store/store';
import { get_engagement_thunk } from './redux/engagement-thunk';

export default function CalendarActivitiesPage() {
  useEffect(() => {
    store.dispatch(get_engagement_thunk())
  }, []);
  return (
    <AdminLayout>
      <EngagementCalendarSection/>
    </AdminLayout>
  )
}
