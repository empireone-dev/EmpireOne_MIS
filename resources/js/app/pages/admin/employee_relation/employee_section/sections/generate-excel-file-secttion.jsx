import React, { useState } from "react";
import { Button, message } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";
import { get_all_employees_service } from "@/app/pages/services/employee-service";

export default function GenerateExcelFileSection() {
    const [loading, setLoading] = useState(false);
    const { employees } = useSelector((state) => state.employees);

    const generateExcel = async () => {
        try {
            setLoading(true);

            let employeeData;

            // Try to fetch all employees first, fall back to current employees data
            try {
                const allEmployeesResponse = await get_all_employees_service();
                employeeData =
                    allEmployeesResponse.data.data || allEmployeesResponse.data;
            } catch (error) {
                // Fallback to current loaded data
                if (!employees?.data || employees.data.length === 0) {
                    message.warning("No employee data available to export");
                    return;
                }
                employeeData = employees.data;
                message.info(
                    "Exporting currently loaded employee data. For complete export, please ensure all data is loaded.",
                );
            }

            if (!employeeData || employeeData.length === 0) {
                message.warning("No employee data available to export");
                return;
            }

            // Prepare data for Excel
            const excelData = employeeData.map((employee, index) => ({
                "No.": index + 1,
                "Employee ID": employee.emp_id || "",
                "Full Name":
                    `${employee.applicant?.fname || ""} ${employee.applicant?.mname || ""} ${employee.applicant?.lname || ""}`.trim(),
                "First Name": employee.applicant?.fname || "",
                "Middle Name": employee.applicant?.mname || "",
                "Last Name": employee.applicant?.lname || "",
                Position: employee.position || "",
                Department: employee?.dept || "",
                Account: employee.account || "",
                Site: employee.applicant?.site || "",
                Status: employee.status || "",
                "Hired Date": employee.hired || "",
                Email: employee.applicant?.email || "",
                "Contact Number": employee.applicant?.phone || "",
                Address: employee.applicant?.caddress || "",
                "Birth Date": employee.applicant?.dob || "",
                Age: employee.applicant?.age || "",
                Gender: employee.applicant?.gender || "",
                "Civil Status": employee.applicant?.marital || "",
                "Educational Attainment": employee.applicant?.educ || "",
                Course: employee.applicant?.courset || "",
                "Emergency Contact Name": employee.applicant?.ename || "",
                "Emergency Contact Number": employee.applicant?.ephone || "",
                "Emergency Contact Relationship":
                    employee.applicant?.relationship || "",
                "SSS Number": employee.applicant?.sss || "",
                "PhilHealth Number": employee.applicant?.philh || "",
                "PAG-IBIG Number": employee.applicant?.pagibig || "",
                "TIN Number": employee.applicant?.tin || "",
            }));

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);

            // Set column widths for better readability
            const colWidths = [
                { wch: 5 }, // No.
                { wch: 12 }, // Employee ID
                { wch: 25 }, // Full Name
                { wch: 15 }, // First Name
                { wch: 15 }, // Middle Name
                { wch: 15 }, // Last Name
                { wch: 20 }, // Position
                { wch: 20 }, // Department
                { wch: 15 }, // Account
                { wch: 12 }, // Site
                { wch: 12 }, // Status
                { wch: 12 }, // Hired Date
                { wch: 25 }, // Email
                { wch: 15 }, // Contact Number
                { wch: 30 }, // Address
                { wch: 12 }, // Birth Date
                { wch: 5 }, // Age
                { wch: 8 }, // Gender
                { wch: 12 }, // Civil Status
                { wch: 20 }, // Emergency Contact Name
                { wch: 15 }, // Emergency Contact Number
                { wch: 15 }, // Emergency Contact Relationship
                { wch: 15 }, // SSS Number
                { wch: 15 }, // PhilHealth Number
                { wch: 15 }, // PAG-IBIG Number
                { wch: 15 }, // TIN Number
            ];
            ws["!cols"] = colWidths;

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, "Employee Masterlist");

            // Generate filename with current date
            const fileName = `Employee_Masterlist_${moment().format("YYYY-MM-DD_HH-mm-ss")}.xlsx`;

            // Save the file
            XLSX.writeFile(wb, fileName);

            message.success(
                `Excel file "${fileName}" with ${excelData.length} employees has been downloaded successfully!`,
            );
        } catch (error) {
            console.error("Error generating Excel file:", error);
            message.error("Failed to generate Excel file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
                {employees?.total || 0} employees
            </span>
            <Button
                type="primary"
                icon={<FileExcelOutlined />}
                onClick={generateExcel}
                loading={loading}
                className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700"
                size="middle"
            >
                Export to Excel
            </Button>
        </div>
    );
}
