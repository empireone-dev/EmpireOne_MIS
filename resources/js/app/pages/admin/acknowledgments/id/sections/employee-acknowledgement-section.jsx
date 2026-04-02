import React from "react";
import { Table, Tag } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

export default function EmployeeAcknowledgementSection() {
    const { employee } = useSelector((state) => state.employees);

    const tableData = [
        {
            key: "cocd",
            type: "Code of Conduct (COCD)",
            data: employee?.cocd_acknowledges,
        },
        {
            key: "handbook",
            type: "Employee Handbook",
            data: employee?.handbook_acknowledges,
        },
        {
            key: "ethics",
            type: "Code of Ethics",
            data: employee?.ethics_acknowledges,
        },
    ];

    const columns = [
        {
            title: "Type of Acknowledgment",
            dataIndex: "type",
            key: "type",
            render: (type) => <b>{type}</b>,
        },
        {
            title: "Status",
            key: "status",
            render: (_, record) =>
                record.data ? (
                    <Tag color="green">Acknowledged</Tag>
                ) : (
                    <Tag color="red">Not Yet Acknowledged</Tag>
                ),
        },
        {
            title: "Date Completed",
            key: "acknowledged_at",
            render: (_, record) =>
                record.data?.acknowledged_at ? (
                    <b>{moment(record.data.acknowledged_at).format("LL")}</b>
                ) : (
                    <span className="text-gray-400">—</span>
                ),
        },
    ];

    const employeeName = employee?.applicant
        ? `${employee.applicant.fname ?? ""} ${employee.applicant.lname ?? ""}`.trim()
        : "";

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-lg text-gray-800">
                    Acknowledgments for <b>{employeeName}</b>
                </h2>
            </div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={tableData}
                rowKey="key"
            />
        </div>
    );
}
