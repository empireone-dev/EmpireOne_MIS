import React from "react";
import NdaSection from "./sections/nda-section";
import EmployeeLayout from "../employee-layout";

export default function Page() {
    return (
        <EmployeeLayout>
            <NdaSection />
        </EmployeeLayout>
    );
}
