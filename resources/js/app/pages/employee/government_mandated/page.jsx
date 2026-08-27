import React from "react";
import EmployeeLayout from "../employee-layout";
import GovernmentMandatedSection from "./sections/government-mandated-section";

export default function Page() {
    return (
        <EmployeeLayout>
            <GovernmentMandatedSection />
        </EmployeeLayout>
    );
}
