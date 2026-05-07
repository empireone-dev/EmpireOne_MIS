import React from "react";
import SchedulePolicySection from "./sections/schedule-policy-section";
import EmployeeLayout from "../../employee-layout";

export default function page() {
    return (
        <EmployeeLayout>
            <SchedulePolicySection />
        </EmployeeLayout>
    );
}
