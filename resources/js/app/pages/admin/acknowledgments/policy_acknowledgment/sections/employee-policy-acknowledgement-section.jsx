import React from "react";
import { Table, Tag, Tooltip } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import {
    ClipboardDocumentCheckIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

export default function EmployeePolicyAcknowledgementSection() {
    const { employee } = useSelector((state) => state.employees);
    const { acknowledgment } = useSelector((state) => state.employees);
    const { policyAcknowledgment } = useSelector((state) => state.employees);

    // console.log("employee: ", employee);
    // console.log("acknowledgment: ", acknowledgment);

    const tableData = [
        {
            key: "schedule_policy",
            type: "Schedule Policy",
            data: policyAcknowledgment?.schedule_policy_acknowledges,
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
            title: "Date/Time Completed",
            key: "acknowledged_at",
            render: (_, record) =>
                record.data?.acknowledged_at ? (
                    <>{moment(record.data.acknowledged_at).format("LLL")}</>
                ) : (
                    <span className="text-gray-400">—</span>
                ),
        },
        // {
        //     title: "Action",
        //     dataIndex: "action",
        //     key: "action",
        //     render: (_, record, i) => {
        //         const hasAcknowledged = !!record.data;
        //         return (
        //             <div key={i}>
        //                 <Tooltip
        //                     title={
        //                         hasAcknowledged
        //                             ? "View Signed Document"
        //                             : "Not yet acknowledged"
        //                     }
        //                 >
        //                     <button
        //                         onClick={() => {
        //                             if (hasAcknowledged) {
        //                                 window.open(
        //                                     `/admin/acknowledgments/${record.key}/view/${acknowledgment?.emp_id}`,
        //                                     "_blank",
        //                                 );
        //                             }
        //                         }}
        //                         disabled={!hasAcknowledged}
        //                         className={
        //                             hasAcknowledged
        //                                 ? "bg-amber-400 hover:bg-amber-500 text-white p-2 px-4 rounded-md"
        //                                 : "bg-gray-200 text-gray-400 p-2 px-4 rounded-md cursor-not-allowed"
        //                         }
        //                     >
        //                         <EyeIcon className="h-5" />
        //                     </button>
        //                 </Tooltip>
        //             </div>
        //         );
        //     },
        // },
    ];

    const employeeName = acknowledgment?.applicant
        ? `${acknowledgment.applicant.fname ?? ""} ${acknowledgment.applicant.lname ?? ""}`.trim()
        : "";

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-lg text-gray-800">
                    Documents acknowledged by: <b>{employeeName}</b>
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
