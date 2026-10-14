import React from "react";
import AdminLayout from "../admin-layout";
import EmpireonePresentationSection from "./sections/empireone-presentation-section";

export default function page() {
    return (
        <AdminLayout>
            <EmpireonePresentationSection />
        </AdminLayout>
    );
}
