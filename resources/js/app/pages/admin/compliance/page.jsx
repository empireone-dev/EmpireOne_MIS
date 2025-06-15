import React from 'react'
import AdminLayout from '../admin-layout'
import ComplianceTableSection from './sections/compliance-table-section'

export default function Page() {
    return (
        <AdminLayout>
            <ComplianceTableSection />
        </AdminLayout>
    )
}
