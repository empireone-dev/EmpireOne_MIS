import React from "react";
import NdaSection from "./sections/nda-section";
import AdminLayout from "../admin-layout";

export default function Page() {
    return (
        <AdminLayout>
            <NdaSection />
        </AdminLayout>
    );
}
