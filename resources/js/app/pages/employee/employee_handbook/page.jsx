import React from "react";
import EmployeeLayout from "../employee-layout";
import EmployeeHandbookSection from "./sections/employee-handbook-section";

export default function page() {
    return (
        <EmployeeLayout>
            <EmployeeHandbookSection />
        </EmployeeLayout>
    );
}
