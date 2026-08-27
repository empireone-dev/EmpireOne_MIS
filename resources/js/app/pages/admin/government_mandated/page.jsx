import React from "react";
import AdminLayout from "../admin-layout";
import GovernmentMandatedSection from "./sections/government-mandated-section";

export default function Page() {
    return (
        <AdminLayout>
            <GovernmentMandatedSection />
        </AdminLayout>
    );
}
