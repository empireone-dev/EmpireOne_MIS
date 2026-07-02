import React, { useState } from "react";
import FormsTableSection from "./sections/forms-table-section";
import EmployeeLayout from "../employee-layout";

export default function page() {
    return (
        <EmployeeLayout>
            <FormsTableSection />
        </EmployeeLayout>
    );
}
