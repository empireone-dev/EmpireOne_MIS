import React, { useRef, useState } from "react";
import {  Select,Table, Tag,  } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { router } from "@inertiajs/react";
import ApplicantMenuSection from "./applicant-menu-section";
import ApplicantSearchSection from "./applicant-search-section";
import CreateApplicantSection from "./create-applicant-section";
import ApplicantPhoneStatusComponent from "../components/applicant-phone-status-component";

// ContactCell component to handle modal state properly
const ContactCell = ({ record }) => {
    const [open, setOpen] = useState(false);
    return (
        <ApplicantPhoneStatusComponent record={record} open={open} setOpen={setOpen} />
    );
};

export default function ApplicantsTableSection() {
    // const [filteredDatas, setFilteredDatas] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { applicants, interviewer } = useSelector(
        (state) => state.applicants
    );

    const urls = new URL(window.location.href);
    const searchParams = new URLSearchParams(urls.search);
    const pages = searchParams.get('page');
    const status = searchParams.get('status');
    const site = searchParams.get('site');

    const filteredDatas = applicants.data;
  
    console.log("filteredDatas", filteredDatas);
 
    function search_status(value) {
        router.visit('?page=1' + '&status=' + (value || 'null') + '&site=' + site)
    }
    function search_site(value) {
        router.visit('?page=1' + '&status=' + status + '&site=' + (value || 'null'))
    }
    const columns = [
        {
            title: "Application #",
            dataIndex: "app_id",
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
                        {record.lname}, {record.fname} {record.suffix}
                    </div>
                );
            },
        },
        {
            title: "Date of Birth",
            dataIndex: "dob",
            key: "dob",
            // ...getColumnSearchProps("dob"),
            render: (_, record) => {
                return (
                    <div className="gap-1.5 flex">
                        {moment(record.dob).format("LL")}
                    </div>
                );
            },
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            // ...getColumnSearchProps("gender"),
        },
        {
            title: "Marital Status",
            dataIndex: "marital",
            key: "mstatus",
            // ...getColumnSearchProps("mstatus"),
        },
        {
            title: "Email Address",
            dataIndex: "email",
            key: "eogs",
            // ...getColumnSearchProps("eogs"),
        },
        {
            title: "Contact",
            dataIndex: "phone",
            key: "contact",
            // ...getColumnSearchProps("contact"),
            render: (_, record) => {
                return <ContactCell record={record} />;
            },
        },
        {
            title: "Date Submitted",
            dataIndex: "submitted",
            key: "submitted",
            // ...getColumnSearchProps("submitted"),
            render: (_, record) => {
                return (
                    <div className="gap-1.5 flex">
                        {moment(record.submitted).format("L")}
                    </div>
                );
            },
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
                            { text: "Accepted Offer", value: "Accepted Offer" },
                            { text: "Counter Offer", value: "Counter Offer" },
                            { text: "Declined", value: "Declined" },
                            { text: "Failed", value: "Failed" },
                            { text: "Final Phase", value: "Final Phase" },
                            { text: "For Final Phase", value: "For Final Phase" },
                            { text: "Hired", value: "Hired" },
                            { text: "Initial Phase", value: "Initial Phase" },
                            { text: "Passed", value: "Passed" },
                            { text: "Pending", value: "Pending" },
                            { text: "Pooling", value: "Pooling" },
                            { text: "Probationary", value: "Probationary" },
                            { text: "Regular", value: "Regular" },
                            { text: "Send Failed", value: "Send Failed" },
                        ]
                    }
                />
            </div>,
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                let color = "";
                switch (record.status) {
                    case "Failed":
                    case "Send Failed":
                    case "Dismissal":
                    case "Declined":
                    case "Resigned":
                    case "Terminated":
                    case "EOPE":
                    case "AWOL":
                        color = "red";
                        break;
                    case "Passed":
                    case "Accepted Offer":
                    case "Hired":
                    case "Probationary":
                        color = "green";
                        break;
                    case "For Final Phase":
                    case "Final Phase":
                    case "Regular":
                        color = "blue";
                        break;
                    case "Pending":
                    case "Counter Offer":
                        color = "yellow";
                        break;
                    case "Initial Phase":
                        color = "orange";
                        break;
                    case "Pooling":
                        color = "purple";
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

                    value={site == 'null' ? null : site}
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
                        {record?.site}
                    </div>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <>
                        <ApplicantMenuSection
                            interviewer={interviewer}
                            data={record}
                        />
                    </>
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
    const categories = getQueryParam(url, "categories");

    const paginationConfig = {
        current: page,
        pageSize: pageSize,
        total: applicants.last_page * pageSize,
        onChange: (newPage, newPageSize) => {
            router.visit(window.location.pathname + `?page=${newPage}&status=${status}&site=${site}`);
            setCurrent(newPage);
            setPageSize(newPageSize);
        },
    };

    return (
        <div>
            <div className="flex justify-between items-center ">
                <div className="flex items-center gap-x-3 mb-3">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Applicant(s) Records</b>
                    </h2>
                </div>
            </div>

            <div className="flex flex-1 justify-between w-full items-start">
                <div>
                    <ApplicantSearchSection />
                </div>
                <div className="flex justify-end items-center mr-5">
                    <CreateApplicantSection />
                </div>
            </div>
{/* 
            <Table
                pagination={paginationConfig}
                columns={columns}
                dataSource={filteredDatas}
                className="mt-1"
            /> */}

            <div className="w-full">
                {applicants.total > 0
                    ? `Showing ${(page - 1) * pageSize + 1} to ${Math.min(
                        page * pageSize,
                        applicants.total
                    )} of ${applicants.total} entries`
                    : "No entries available"}
            </div>
        </div>
    );
}
