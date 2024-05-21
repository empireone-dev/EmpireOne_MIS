import React from "react";
import AdminLayout from "../../admin-layout";
import JobTitleTableSection from "./sections/job-title-table-section";

export default function JobTitlePage() {
    return (
        <AdminLayout>
            <JobTitleTableSection />
        </AdminLayout>
    );
}
