import React, { useRef, useState } from "react";
import { EyeOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Input,
    Pagination,
    Select,
    Space,
    Table,
    Tag,
    Tooltip,
} from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { router } from "@inertiajs/react";
import {
    ClipboardDocumentCheckIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import AcknowledgmentsSearchSection from "./acknowledgments-search-section";
import GenerateAcknowledgmentSection from "./generate-acknowledgment-section";

export default function AcknowledgmentsTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const { employeesWithAcknowledgment, employeesWithAcknowledgmentTotal } =
        useSelector((state) => state.employees);
    const { employees } = useSelector((state) => state.employees);

    console.log("employeesWithAcknowledgment", employeesWithAcknowledgment);

    const url = window.location.pathname + window.location.search;
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
    const pages = searchParams.get("page");
    const name = searchParams.get("name");
    const emp_id = searchParams.get("emp_id");
    const email = searchParams.get("email");
    function search_name(value) {
        router.visit(
            `?page=1&name=${value || ""}&emp_id=${emp_id || ""}&email=${email || ""}`,
        );
    }

    function search_emp_id(value) {
        router.visit(
            `?page=1&name=${name || ""}&emp_id=${value || ""}&email=${email || ""}`,
        );
    }

    function search_email(value) {
        router.visit(
            `?page=1&name=${name || ""}&emp_id=${emp_id || ""}&email=${value || ""}`,
        );
    }

    const columns = [
        {
            title: "Employee #",
            dataIndex: "emp_id",
            key: "emp_id",
            // ...getColumnSearchProps("emp_id"),
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
            // ...getColumnSearchProps("fullname"),
            render: (_, record, i) => {
                return (
                    <div key={i}>
                        {record?.applicant?.fname} {record?.applicant?.mname}{" "}
                        {record?.applicant?.lname}
                    </div>
                );
            },
        },
        {
            title: "Email",
            dataIndex: "eogs",
            key: "email",
            // ...getColumnSearchProps("email"),
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            // ...getColumnSearchProps("department"),
            render: (_, record, i) => {
                return <div key={i}>{record?.dept?.dept || "N/A"}</div>;
            },
        },
        {
            title: "Account",
            dataIndex: "account",
            key: "account",
            // ...getColumnSearchProps("account"),
            render: (_, record, i) => {
                return <div key={i}>{record?.account || "N/A"}</div>;
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record, i) => {
                return (
                    <div key={i}>
                        <button
                            onClick={() => {
                                window.open(
                                    `/admin/acknowledgments/${record.emp_id}`,
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
                );
            },
        },
    ];

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
    const pageSize = 10;
    // const isStatus = getQueryParam(url, "status");
    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Document Acknowledgment Records</b>
                    </h2>
                </div>
            </div>
            <div className="flex flex-1 justify-between">
                <AcknowledgmentsSearchSection />
                <GenerateAcknowledgmentSection />
            </div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={employeesWithAcknowledgment ?? []}
                rowKey="emp_id"
            />

            <div className="flex">
                <div className="w-full mt-3.5">
                    {employeesWithAcknowledgment?.length > 0
                        ? `Showing ${Math.min((currentPage - 1) * pageSize + 1, employeesWithAcknowledgmentTotal)} to ${Math.min(currentPage * pageSize, employeesWithAcknowledgmentTotal)} of ${employeesWithAcknowledgmentTotal} entries`
                        : "No entries available"}
                </div>
                <div className="flex w-full items-center justify-end mt-2">
                    <Pagination
                        onChange={onChangePaginate}
                        current={currentPage}
                        total={employeesWithAcknowledgmentTotal}
                        pageSize={pageSize}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
}
