import React from "react";
import EmployeeLayout from "../employee-layout";
import EmpireonePresentationSection from "./sections/empireone-presentation-section";

export default function page() {
    return (
        <EmployeeLayout>
            <EmpireonePresentationSection />
        </EmployeeLayout>
    );
}
