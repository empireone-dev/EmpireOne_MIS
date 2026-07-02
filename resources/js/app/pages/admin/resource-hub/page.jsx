import React from "react";
import ResourceHubSection from "./sections/resource-hub-section";
import AdminLayout from "../admin-layout";

export default function page() {
    return (
        <AdminLayout>
            <ResourceHubSection />
        </AdminLayout>
    );
}
