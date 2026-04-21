import { FileExcelOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";
import { get_all_employees_with_acknowledgment_service } from "@/app/pages/services/employee-service";

export default function GenerateAcknowledgmentSection() {
    const [loading, setLoading] = useState(false);
    const { employeesWithAcknowledgment } = useSelector((state) => state.employees);

    const generateExcel = async () => {
        try {
            setLoading(true);

            let employeeData;

            // Try to fetch all employees with acknowledgment first, fall back to current page data
            try {
                const allEmployeesResponse = await get_all_employees_with_acknowledgment_service();
                const payload = allEmployeesResponse.data ?? allEmployeesResponse;
                employeeData = payload?.data ?? payload;
            } catch (error) {
                // Fallback to current loaded page data
                if (!employeesWithAcknowledgment || employeesWithAcknowledgment.length === 0) {
                    message.warning("No acknowledgment data available to export");
                    return;
                }
                employeeData = employeesWithAcknowledgment;
                message.info(
                    "Exporting currently loaded page data. For a complete export, please try again.",
                );
            }

            if (!employeeData || employeeData.length === 0) {
                message.warning("No acknowledgment data available to export");
                return;
            }

            // Prepare data for Excel — one row per acknowledged document
            const acknowledgmentTypes = [
                { key: "cocd_acknowledges",     label: "Code of Conduct (COCD)" },
                { key: "ethics_acknowledges",    label: "Ethics" },
                { key: "handbook_acknowledges",  label: "Employee Handbook" },
                { key: "hmo_acknowledges",       label: "HMO Acknowledgment" },
            ];

            let rowNumber = 0;
            const excelData = employeeData.flatMap((employee) => {
                const baseInfo = {
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
                };

                const rows = [];
                acknowledgmentTypes.forEach(({ key, label }) => {
                    const ack = employee[key];
                    if (ack?.acknowledged_at) {
                        rowNumber += 1;
                        rows.push({
                            "No.": rowNumber,
                            ...baseInfo,
                            "Document Type": label,
                            "Acknowledged At": moment(ack.acknowledged_at).format("LLL"),
                        });
                    }
                });

                return rows;
            });

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);

            // Auto-fit column widths based on header and cell content
            if (excelData.length > 0) {
                const headers = Object.keys(excelData[0]);
                const colWidths = headers.map((header) => {
                    const maxDataLen = excelData.reduce((max, row) => {
                        const cellVal = row[header] != null ? String(row[header]) : "";
                        return Math.max(max, cellVal.length);
                    }, 0);
                    return { wch: Math.max(header.length, maxDataLen) };
                });
                ws["!cols"] = colWidths;
            }

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, "Acknowledgment Records");

            // Generate filename with current date
            const fileName = `Acknowledgment_Records_Of_Employees.xlsx`;

            // Save the file
            XLSX.writeFile(wb, fileName);

            message.success(
                `Excel file "${fileName}" with ${excelData.length} records has been downloaded successfully!`,
            );
        } catch (error) {
            console.error("Error generating Excel file:", error);
            message.error("Failed to generate Excel file. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="mt-4">
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
