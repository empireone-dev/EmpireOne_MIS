import React from 'react'
import EmployeeLayout from '../employee-layout'
import ListMemoTableSection from './sections/list-memo-table-section'
import store from '@/app/store/store';
import { get_emp_memo_thunk } from '../../admin/employee_relation/upload_memo/redux/emp-memo-thunk';

export default function ListMemoPage() {
    // useEffect(() => {
    //     store.dispatch(get_emp_memo_thunk())
    // }, []);
    return (
        <EmployeeLayout>
            <ListMemoTableSection/>
        </EmployeeLayout>
    )
}
