import React from 'react'
import EmployeeTrainingsSection from './sections/employee-trainings-section'
import AdminLayout from '../../admin-layout'

export default function Page() {
    return (
        <AdminLayout>
            <EmployeeTrainingsSection />
        </AdminLayout>
    )
}
