import React, { useEffect } from "react";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import AddNewEmployeeSection from "./add-new-employee-section";
import AddExistingEmployeeSection from "./add-existing-employee-section";
import store from "@/app/store/store";
import { get_account_thunk } from "../redux/account-thunk";

export default function AddEmployeeButtonSection() {
  
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <AddNewEmployeeSection />
                <AddExistingEmployeeSection />
            </div>
        </div>
    );
}
