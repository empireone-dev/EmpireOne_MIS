import React from "react";
import { Table, Tag, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

export default function PolicyAcknowledgmentSection() {
    const { employeesWithPolicyAcknowledgment } = useSelector(
        (state) => state.employees,
    );

    console.log(
        "employeesWithPolicyAcknowledgment",
        employeesWithPolicyAcknowledgment,
    );

    const renderStatus = (data) =>
        data ? (
            <Tag color="green">Acknowledged</Tag>
        ) : (
            <Tag color="red">Not Yet</Tag>
        );

    const baseColumns = [
        {
            title: "Employee #",
            dataIndex: "emp_id",
            key: "emp_id",
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
            render: (_, record, i) => (
                <div key={i}>
                    {record?.applicant?.fname} {record?.applicant?.mname}{" "}
                    {record?.applicant?.lname}
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "eogs",
            key: "email",
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            render: (_, record, i) => (
                <div key={i}>{record?.dept || "N/A"}</div>
            ),
        },
        {
            title: "Account",
            dataIndex: "account",
            key: "account",
            render: (_, record, i) => (
                <div key={i}>{record?.account || "N/A"}</div>
            ),
        },
        {
            title: "Site",
            dataIndex: "site",
            key: "site",
            render: (_, record, i) => (
                <div key={i}>{record?.applicant?.site || "N/A"}</div>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record, i) => (
                <div key={i}>
                    <button
                        onClick={() => {
                            window.open(
                                `/admin/acknowledgments/policy_acknowledgment/${record.emp_id}`,
                                "_blank",
                            );
                        }}
                        className="bg-purple-700 hover:bg-purple-600 text-white p-2 px-4 rounded-md"
                    >
                        <Tooltip title="Documents Acknowledged">
                            <ClipboardDocumentCheckIcon className="h-5" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <Table
            pagination={false}
            columns={baseColumns}
            dataSource={employeesWithPolicyAcknowledgment ?? []}
            rowKey="emp_id"
        />
    );
}
