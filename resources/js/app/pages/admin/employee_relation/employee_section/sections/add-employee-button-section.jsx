import React from "react";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
export default function AddEmployeeButtonSection() {
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-s-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UserAddOutlined />
                    Add New Employee
                </button>
                <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-e-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UsergroupAddOutlined />
                    Add Existing Employee
                </button>
            </div>
        </div>
    );
}
