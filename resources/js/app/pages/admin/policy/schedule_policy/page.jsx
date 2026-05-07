import React from "react";
import SchedulePolicySection from "./sections/schedule-policy-section";
import AdminLayout from "../../admin-layout";

export default function page() {
    return (
        <AdminLayout>
            <SchedulePolicySection />
        </AdminLayout>
    );
}
