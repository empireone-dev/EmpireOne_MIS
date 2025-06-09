import React, { useRef, useState } from "react";
import {
    FolderOpenFilled,
    LineOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Pagination, Select, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { router } from "@inertiajs/react";
import DeclinedReasonSection from "./declined-reason-section";
import HiringSearchSection from "../../../hiring/hiring_section/sections/hiring-search-section";

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

    const urls = new URL(window.location.href);
    const searchParams = new URLSearchParams(urls.search);
    const pages = searchParams.get('page');
    const status = searchParams.get('status');

    function search_status(value) {

        router.visit('?page=' + pages + '&status=' + (value || 'null'))
    }

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
            title: <div>
                <Select
                    allowClear
                    className="w-28"
                    showSearch
                    placeholder="Status"
                    optionFilterProp="label"

                    value={status == 'null' ? null : status}
                    onChange={search_status}
                    // onSearch={onSearch}
                    options={
                        [
                            { text: "Contract Signing", value: "Contract Signing" },
                            { text: "Accepted", value: "Accepted" },
                            { text: "Declined", value: "Declined" },
                            { text: "Pending", value: "Pending" },
                            { text: "Hired", value: "Hired" },
                        ]
                    }
                />
            </div>,
            dataIndex: "status",
            key: "status",
            render: (_, record, i) => {
                console.log("record", record);
                let color = "";
                switch (record.status) {
                    case "Contract Signing":
                        color = "#52D017";
                        break;
                    case "Accepted":
                        color = "#43BFC7";
                        break;
                    case "Declined":
                        color = "#E55451";
                        break;
                    case "Pending":
                        color = "#E1AD01";
                        break;
                    case "Hired":
                        color = "#008000";
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
                                <Tooltip title="201 File">
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.visit(
                                                    `/admin/file_201/${record.app_id}?status=${record.status}`
                                                )
                                            }
                                            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
                                        >
                                            <FolderOpenFilled />
                                        </button>
                                    </div>
                                </Tooltip>
                            )}
                        {record.status === "Declined" && (
                            <Tooltip title="Reason of Declination">
                                <div>
                                    <DeclinedReasonSection data={record} />
                                </div>
                            </Tooltip>
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

    const url = window.location.pathname + window.location.search;

    const getQueryParam = (url, paramName) => {
        const searchParams = new URLSearchParams(url.split("?")[1]);
        return searchParams.get(paramName);
    };

    const page = getQueryParam(url, "page");
    const currentPage = page ? parseInt(page, 10) : 1; // Ensure currentPage is a number

    const onChangePaginate = (page) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", page);
        const newUrl = window.location.pathname + "?" + searchParams.toString();
        router.visit(newUrl);
    };

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Onboarding Section</b>
                    </h2>
                </div>
            </div>
            <HiringSearchSection />
            <Table
                pagination={false}
                columns={columns}
                dataSource={joboffers.data}
            />
            <div className="flex w-full items-center justify-end mt-2">
                <Pagination
                    onChange={onChangePaginate}
                    defaultCurrent={currentPage}
                    total={joboffers.total}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}
