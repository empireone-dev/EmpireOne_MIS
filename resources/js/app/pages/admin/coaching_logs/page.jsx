import React from 'react'
import AdminLayout from '../admin-layout'
import CoachingLogsTableSection from './sections/coaching-logs-table-section'

export default function CoachingLogsPage() {
    return (
        <AdminLayout>
            <CoachingLogsTableSection />
        </AdminLayout>
    )
}
