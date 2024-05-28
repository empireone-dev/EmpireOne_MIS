import React from "react";
import AdminLayout from "../../admin-layout";
import JobTitleTableSection from "./sections/job-title-table-section";
import { useEffect } from "react";
import { get_job_position_thunk } from "./redux/job-title-thunk";
import store from "@/app/pages/store/store";

export default function JobTitlePage() {
    useEffect(() => {
        store.dispatch(get_job_position_thunk())
      }, []);
    return (
        <AdminLayout>
            <JobTitleTableSection />
        </AdminLayout>
    );
}
