import React, { useRef, useState } from "react";
import { EyeOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { router } from "@inertiajs/react";
import ComplianceSearchSection from "./compliance-search-section";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function ComplianceTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const { video_quizzes } = useSelector((state) => state.video_quizzes);

    console.log('video_quizzesss', video_quizzes)

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
    const pages = searchParams.get('page');
    const name = searchParams.get('name');
    const emp_id = searchParams.get('emp_id');
    const email = searchParams.get('email');
    function search_name(value) {
        router.visit(`?page=1&name=${value || ''}&emp_id=${emp_id || ''}&email=${email || ''}`);
    }

    function search_emp_id(value) {
        router.visit(`?page=1&name=${name || ''}&emp_id=${value || ''}&email=${email || ''}`);
    }

    function search_email(value) {
        router.visit(`?page=1&name=${name || ''}&emp_id=${emp_id || ''}&email=${value || ''}`);
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
                console.log("record", record);

                return (
                    <div key={i}>
                        {record?.name}
                    </div>
                );
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            // ...getColumnSearchProps("email"),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record, i) => {
                return (
                    <div key={i}>
                        <button className="bg-sky-400 hover:bg-sky-600 text-white p-2 px-4 rounded-md">
                            <Tooltip title="Show Trainings Taken">
                                <EyeIcon className="h-5" />
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
                        <b>Compliance Training</b>
                    </h2>
                </div>
            </div>
            <ComplianceSearchSection />
            <Table
                pagination={false}
                columns={columns}
                dataSource={video_quizzes?.data ?? []}
            />
            <div className="flex">
                <div className="w-full mt-3.5">
                    {video_quizzes?.total > 0
                        ? `Showing ${(currentPage - 1) * pageSize + 1
                        } to ${Math.min(currentPage * pageSize, video_quizzes.total)} of ${video_quizzes.total
                        } entries`
                        : "No entries available"}
                </div>
                <div className="flex w-full items-center justify-end mt-2">
                    <Pagination
                        onChange={onChangePaginate}
                        defaultCurrent={currentPage}
                        total={video_quizzes.total}
                        pageSize={pageSize}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
}
