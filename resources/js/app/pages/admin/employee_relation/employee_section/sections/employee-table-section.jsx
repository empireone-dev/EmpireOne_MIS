import React, { useRef, useState } from "react";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import AddEmployeeButtonSection from "./add-employee-button-section";
import EmployeeMenuSection from "./employee-menu-section";
import { router } from "@inertiajs/react";
import EmployeeSearchSection from "./employee-search-section";
import SearchBranchSection from "./search-branch-section";

export default function EmployeeTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const { employees } = useSelector((state) => state.employees);

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

    const accounts = [
        { label: "JTV", value: "JTV" },
        { label: "Service Market", value: "Service Market" },
        { label: "Curtis", value: "Curtis" },
        { label: "Aifi", value: "Aifi" },
        { label: "Latham Pool", value: "Latham Pool" },
        { label: "Weby", value: "Weby" },
        { label: "N/A", value: "N/A" },
    ]

    const urls = new URL(window.location.href);
    const searchParams = new URLSearchParams(urls.search);
    const pages = searchParams.get('page');
    const account = searchParams.get('account');
    const status = searchParams.get('status');
    const site = searchParams.get('site');
    function search_account(value) {

        router.visit('?page=' + pages + '&account=' + (value || 'null') + '&status=' + status + '&site=' + site)
    }
    function search_status(value) {
        router.visit('?page=' + pages + '&account=' + account + '&status=' + (value || 'null') + '&site=' + site)
    }
    function search_site(value) {
        router.visit('?page=' + pages + '&account=' + account + '&status=' + status + '&site=' + (value || 'null'))
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
                        {record?.applicant?.fname} {record?.applicant?.mname}{" "}
                        {record?.applicant?.lname}
                    </div>
                );
            },
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
            // ...getColumnSearchProps("position"),
        },
        {
            title: "Department",
            dataIndex: "dept",
            key: "dept",
            // ...getColumnSearchProps("dept"),
        },
        {
            title: <div className="flex gap-3 items-center justify-center">
                {/* 
                Account
                <FilterOutlined /> */}
                <Select
                    allowClear
                    className="w-28"
                    showSearch
                    placeholder="Account"
                    optionFilterProp="label"
                    value={account  == 'null'?null:account}
                    onChange={search_account}
                    // onSearch={onSearch}
                    options={accounts}
                />
            </div>,
            dataIndex: "account",
            key: "dept",
            render: (text) => text || "N/A",
        },
        {
            title: "Email Address",
            dataIndex: "eogs",
            key: "eogs",
            // ...getColumnSearchProps("eogs"),
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
            // ...getColumnSearchProps("contact"),
            render: (_, record, i) => {
                console.log("record", record);

                return <div key={i}>{record?.applicant?.phone}</div>;
            },
        },
        {
            title: <div className="flex gap-3 items-center justify-center">
                {/* 
                Account
                <FilterOutlined /> */}
                <Select
                    allowClear
                    className="w-28"
                    showSearch
                    placeholder="Site"
                    optionFilterProp="label"
                    
                    value={site  == 'null'?null:site}
                    onChange={search_site}
                    // onSearch={onSearch}
                    options={
                        [
                            { text: "San Carlos", value: "San Carlos" },
                            { text: "Carcar", value: "Carcar" },
                        ]
                    }
                />
            </div>,
            dataIndex: "site",
            key: "site",
            render: (_, record, i) => {
                console.log("record", record);

                return (
                    <div key={i}>
                        {record?.applicant?.site}
                    </div>
                );
            },
        },
        {
            title: <div className="flex gap-3 items-center justify-center">
                {/* Status */}
                <Select
                    allowClear
                    className="w-28"
                    showSearch
                    placeholder="Status"
                    optionFilterProp="label"
                    value={status  == 'null'?null:status}
                    onChange={search_status}
                    // onSearch={onSearch}
                    options={[
                        { text: "Probationary", value: "Probationary" },
                        { text: "Regular", value: "Regular" },
                        { text: "Extended Probationary", value: "Extended Probationary" },
                        { text: "EOPE", value: "EOPE" },
                        { text: "End of Contract", value: "End of Contract" },
                        { text: "Terminated", value: "Terminated" },
                        { text: "Dismissal", value: "Dismissed" },
                        { text: "AWOL", value: "AWOL" },
                        { text: "Resigned", value: "Resigned" },
                    ]}
                />
            </div>,
            dataIndex: "status",
            key: "status",
            // filters: [
            //     { text: "Probationary", value: "Probationary" },
            //     { text: "Regular", value: "Regular" },
            //     { text: "Extended Probationary", value: "Extended Probationary" },
            //     { text: "EOPE", value: "EOPE" },
            //     { text: "Terminated", value: "Terminated" },
            //     { text: "AWOL", value: "AWOL" },
            //     { text: "Resigned", value: "Resigned" },
            // ],
            // onFilter: (value, record) => record.status === value,
            render: (_, record) => {
                let color = "";
                switch (record.status) {
                    case "Probationary":
                        color = "#52D017";
                        break;
                    case "Extended Probationary":
                        color = "#52D017";
                        break;
                    case "EOPE":
                        color = "#FF0000";
                        break;
                    case "Regular":
                        color = "#43BFC7";
                        break;
                    case "Terminated":
                        color = "#FF0000";
                        break;
                    case "Dismissed":
                        color = "#FF0000";
                        break;
                    case "AWOL":
                        color = "#FF0000";
                        break;
                    case "End of Contract":
                        color = "#FF0000";
                        break;
                    case "Resigned":
                        color = "#FF0000";
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
                return <EmployeeMenuSection data={record} />;
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
                        <b>Employee Section</b>
                    </h2>
                </div>
                <div className="flex items-center justify-between">
                    <AddEmployeeButtonSection />
                    {/* <SearchBranchSection /> */}
                </div>
            </div>
            <EmployeeSearchSection />
            <Table
                pagination={false}
                columns={columns}
                dataSource={employees.data}
            />
            <div className="flex">
                <div className="w-full mt-3.5">
                    {employees.total > 0
                        ? `Showing ${(currentPage - 1) * pageSize + 1
                        } to ${Math.min(
                            currentPage * pageSize,
                            employees.total
                        )} of ${employees.total} entries`
                        : "No entries available"}
                </div>
                <div className="flex w-full items-center justify-end mt-2">
                    <Pagination
                        onChange={onChangePaginate}
                        defaultCurrent={currentPage}
                        total={employees.total}
                        pageSize={pageSize}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
}
