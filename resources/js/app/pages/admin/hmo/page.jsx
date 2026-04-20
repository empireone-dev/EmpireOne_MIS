import React from "react";
import HmoVideoSection from "./sections/hmo-video-section";
import AdminLayout from "../admin-layout";

export default function page() {
    return (
        <AdminLayout>
            <HmoVideoSection />
        </AdminLayout>
    );
}
