import React from "react";
import ResourceHubSection from "./sections/resource-hub-section";
import EmployeeLayout from "../employee-layout";

export default function page() {
    return (
        <EmployeeLayout>
            <ResourceHubSection />
        </EmployeeLayout>
    );
}
