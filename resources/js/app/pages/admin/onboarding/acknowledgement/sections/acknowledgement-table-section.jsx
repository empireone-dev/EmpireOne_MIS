import React, { useRef, useState } from "react";
import {
    DislikeOutlined,
    ExclamationCircleFilled,
    FolderOpenFilled,
    LineOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { router } from "@inertiajs/react";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import DeclinedReasonSection from "./declined-reason-section";

export default function AcknowledgementTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const { joboffers } = useSelector((state) => state.joboffers);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Applicant #",
            dataIndex: "app_id",
            key: "app_id",
            ...getColumnSearchProps("app_id"),
        },
        {
            title: "Applicant Name",
            dataIndex: "app_name",
            key: "app_name",
            ...getColumnSearchProps("app_name"),
            render: (_, record, i) => {
                console.log("record", record);

                return (
                    <div key={i}>
                        {record?.applicant?.fname} {record?.applicant?.mname}{" "}
                        {record?.applicant?.lname}
                    </div>
                );
            },
        },
        {
            title: "Position",
            dataIndex: "jobPos",
            key: "position",
            ...getColumnSearchProps("position"),
        },
        {
            title: "Salary",
            dataIndex: "salary",
            key: "salary",
            ...getColumnSearchProps("salary"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record, i) => {
                console.log("record", record);
                let color = "";
                switch (record.status) {
                    case "Contract Signing":
                        color = "green";
                        break;
                    case "Accepted":
                        color = "blue";
                        break;
                    case "Declined":
                        color = "red";
                        break;
                    case "Pending":
                        color = "yellow";
                        break;
                }

                return (
                    <Tag color={color} key={record.key}>
                        {record.status}
                    </Tag>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <div className="flex gap-1">
                        {record.status !== "Pending" &&
                            record.status !== "Declined" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.visit(
                                            `/admin/file_201/${record.app_id}`
                                        )
                                    }
                                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
                                >
                                    <FolderOpenFilled />
                                </button>
                            )}
                        {record.status === "Declined" && (
                            <DeclinedReasonSection data={record} />
                        )}
                        {record.status === "Pending" && (
                            <div className="ml-4">
                                <LineOutlined />
                            </div>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Onboarding Section</b>
                    </h2>
                </div>
            </div>
            <Table columns={columns} dataSource={joboffers} />;
        </div>
    );
}
