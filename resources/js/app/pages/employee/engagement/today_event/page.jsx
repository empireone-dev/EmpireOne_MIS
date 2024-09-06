import React from 'react'
import EmployeeLayout from '../../employee-layout'
import TodayEventsSection from './sections/today-events-section'

export default function TodayEventPage() {
    return (
        <EmployeeLayout>
            <TodayEventsSection />
        </EmployeeLayout>
    )
}
