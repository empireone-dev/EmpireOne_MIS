import React from 'react'
import AccountsTableSection from './sections/accounts-table-section'
import { useEffect } from 'react'
import store from '@/app/store/store'
import AccountsCreateSection from './sections/accounts-create-section'
import AdminLayout from '@/app/pages/admin/admin-layout'
import { get_account_thunk } from '@/app/pages/admin/employee_relation/employee_section/redux/account-thunk'

export default function page() {
    useEffect(() => {
        store.dispatch(get_account_thunk())
    }, [])
    return (
        <AdminLayout>
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 mb-3">
                    <b>Accounts</b>
                </h2>
            </div>
            <AccountsCreateSection />
            <AccountsTableSection />
        </AdminLayout>
    )
}
