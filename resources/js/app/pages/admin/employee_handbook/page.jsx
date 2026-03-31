import React from "react";
import EmployeeHandbookSection from "./sections/employee-handbook-section";
import AdminLayout from "../admin-layout";

export default function page() {
    return (
        <AdminLayout>
            <EmployeeHandbookSection />
        </AdminLayout>
    );
}
