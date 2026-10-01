import React, { useState } from "react";
import { Button, message } from "antd";
import { DeleteRowOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { get_all_employees_with_no_acknowledgment_service } from "@/app/pages/services/employee-service";

export default function ExtractNoAcknowldgementSection() {
    const [loading, setLoading] = useState(false);

    const generateExcel = async () => {
        try {
            setLoading(true);

            const res = await get_all_employees_with_no_acknowledgment_service();
            const payload = res?.data ?? res;
            const employeeData = payload?.data ?? payload;

            if (!employeeData || employeeData.length === 0) {
                message.info(
                    "All employees have acknowledged at least one document.",
                );
                return;
            }

            const excelData = employeeData.map((employee, i) => ({
                "No.": i + 1,
                "Employee ID": employee.emp_id || "",
                "Last Name": employee.applicant?.lname || "",
                "First Name": employee.applicant?.fname || "",
                "Middle Name": employee.applicant?.mname || "",
                Position: employee.position || "",
                Department: employee?.dept?.dept || "",
                Account: employee.account || "",
                Site: employee.applicant?.site || "",
                Status: employee.status || "",
                Email: employee.applicant?.email || "",
                "Contact Number": employee.applicant?.phone || "",
            }));

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);

            const headers = Object.keys(excelData[0]);
            ws["!cols"] = headers.map((header) => {
                const maxDataLen = excelData.reduce((max, row) => {
                    const cellVal =
                        row[header] != null ? String(row[header]) : "";
                    return Math.max(max, cellVal.length);
                }, 0);
                return { wch: Math.max(header.length, maxDataLen) };
            });

            XLSX.utils.book_append_sheet(wb, ws, "No Acknowledgment");

            const fileName = "Employees_With_No_Acknowledgment.xlsx";
            XLSX.writeFile(wb, fileName);

            message.success(
                `Excel file "${fileName}" with ${excelData.length} employee(s) has been downloaded successfully!`,
            );
        } catch (error) {
            console.error("Error generating Excel file:", error);
            message.error("Failed to generate Excel file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mt-4">
                <Button
                    type="danger"
                    icon={<DeleteRowOutlined />}
                    onClick={generateExcel}
                    loading={loading}
                    className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white"
                    size="middle"
                >
                    Export No Acknowledgment
                </Button>
            </div>
        </div>
    );
}

