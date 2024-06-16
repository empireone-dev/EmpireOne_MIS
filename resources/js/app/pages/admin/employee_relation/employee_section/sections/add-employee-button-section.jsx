import React from "react";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import AddNewEmployeeSection from "./add-new-employee-section";
import AddExistingEmployeeSection from "./add-existing-employee-section";
export default function AddEmployeeButtonSection() {
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <AddNewEmployeeSection/>
                <AddExistingEmployeeSection/>
            </div>
        </div>
    );
}
