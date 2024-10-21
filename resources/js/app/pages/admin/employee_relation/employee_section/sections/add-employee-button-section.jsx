import React, { useEffect } from "react";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import AddNewEmployeeSection from "./add-new-employee-section";
import AddExistingEmployeeSection from "./add-existing-employee-section";
import store from "@/app/store/store";
import { get_job_position_thunk } from "../../../sourcing/job_title_section/redux/job-title-thunk";
import { get_department_thunk } from "../../../sourcing/department/redux/department-thunk";
import { get_account_thunk } from "../redux/account-thunk";
import { get_users_thunk } from "@/app/pages/redux/app-thunk";
import { get_hired_applicant_thunk } from "../redux/employee-section-thunk";
import { get_applicant_thunk } from "../../../recruitment/applicants/applicant_records/redux/applicant-thunk";
export default function AddEmployeeButtonSection({ data }) {
    useEffect(() => {
        store.dispatch(get_job_position_thunk())
        store.dispatch(get_department_thunk())
        store.dispatch(get_account_thunk())
        store.dispatch(get_users_thunk())
        store.dispatch(get_hired_applicant_thunk())
        store.dispatch(get_applicant_thunk())
    }, []);
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <AddNewEmployeeSection data={data} />
                <AddExistingEmployeeSection data={data} />
            </div>
        </div>
    );
}
