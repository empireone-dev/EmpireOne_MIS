import React, { useRef, useState } from "react";
import { EyeOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { router } from "@inertiajs/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import DeleteTrainingSection from "./delete-training-section";

export default function EmployeeTrainingsSection() {
    const { video_quizzes } = useSelector((state) => state.video_quizzes);

    console.log('video_quizzesasda', video_quizzes)


    const columns = [
        {
            title: "Training",
            dataIndex: "type",
            key: "type",
            // ...getColumnSearchProps("fullname"),
            render: (_, record, i) => {
                console.log("record", record);

                return (
                    <div key={i}>
                        <b>
                            {{
                                AcceptableUsePolicy: "Acceptable Use Policy",
                                AntiPhishing: "Anti-Phishing",
                                AntiSexual: "Anti-Sexual Harassment & Workplace Misconduct Policy",
                                CleanDisk: "Clean Desk and Clear Screen Policy",
                                IsmsAwareness: "ISMS Awareness Training",
                                OccupationalSafety: "Occupational Safety and Health (OSH) Policy Training",
                            }[record?.type] || record?.type}
                        </b>
                    </div>
                );
            },
        },
        {
            title: "Date Completed",
            dataIndex: "created_at",
            key: "created_at",
            // ...getColumnSearchProps("fullname"),
            render: (_, record, i) => {
                console.log("record", record);

                return (
                    <div key={i}>
                        <b>{moment(record?.created_at).format("LL")}</b>
                    </div>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record, i) => {
                return (
                    <div key={i}>
                        <DeleteTrainingSection data={record} />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg text-gray-800">
                        List of completed trainings for <b>{video_quizzes?.[0]?.name ?? ""}</b>
                    </h2>
                </div>
            </div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={Array.isArray(video_quizzes) ? video_quizzes : []}

            />
        </div>
    );
}
