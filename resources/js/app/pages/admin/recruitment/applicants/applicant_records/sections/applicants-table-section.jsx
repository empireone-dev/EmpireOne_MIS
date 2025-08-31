import React, { useRef, useState } from "react";
import { Select, Table, Tag } from "antd";
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
        <ApplicantPhoneStatusComponent
            record={record}
            open={open}
            setOpen={setOpen}
        />
    );
};

export default function ApplicantsTableSection() {
    // const [filteredDatas, setFilteredDatas] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { applicants, interviewer } = useSelector(
        (state) => state.applicants
    );

    // Safe window access for SSR compatibility
    const getUrlParams = () => {
        if (typeof window === 'undefined') return { pages: null, status: null, site: null };
        
        try {
            const urls = new URL(window.location.href);
            const searchParams = new URLSearchParams(urls.search);
            return {
                pages: searchParams.get("page"),
                status: searchParams.get("status"),
                site: searchParams.get("site")
            };
        } catch (error) {
            console.error('Error parsing URL:', error);
            return { pages: null, status: null, site: null };
        }
    };

    const { pages, status, site } = getUrlParams();
    const filteredDatas = applicants?.data ?? [];

    function search_status(value) {
        if (typeof window !== 'undefined') {
            router.visit(
                "?page=1" + "&status=" + (value || "null") + "&site=" + (site || "null")
            );
        }
    }
    function search_site(value) {
        if (typeof window !== 'undefined') {
            router.visit(
                "?page=1" + "&status=" + (status || "null") + "&site=" + (value || "null")
            );
        }
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
            title: (
                <div>
                    <Select
                        allowClear
                        className="w-28"
                        showSearch
                        placeholder="Status"
                        optionFilterProp="label"
                        value={status == "null" ? null : status}
                        onChange={search_status}
                        // onSearch={onSearch}
                        options={[
                            { text: "Accepted Offer", value: "Accepted Offer" },
                            { text: "Counter Offer", value: "Counter Offer" },
                            { text: "Declined", value: "Declined" },
                            { text: "Failed", value: "Failed" },
                            { text: "Final Phase", value: "Final Phase" },
                            {
                                text: "For Final Phase",
                                value: "For Final Phase",
                            },
                            { text: "Hired", value: "Hired" },
                            { text: "Initial Phase", value: "Initial Phase" },
                            { text: "Passed", value: "Passed" },
                            { text: "Pending", value: "Pending" },
                            { text: "Pooling", value: "Pooling" },
                            { text: "Probationary", value: "Probationary" },
                            { text: "Regular", value: "Regular" },
                            { text: "Send Failed", value: "Send Failed" },
                        ]}
                    />
                </div>
            ),
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
            title: (
                <div className="flex gap-3 items-center justify-center">
                    {/* 
                Account
                <FilterOutlined /> */}
                    <Select
                        allowClear
                        className="w-28"
                        showSearch
                        placeholder="Site"
                        optionFilterProp="label"
                        value={site == "null" ? null : site}
                        onChange={search_site}
                        // onSearch={onSearch}
                        options={[
                            { text: "San Carlos", value: "San Carlos" },
                            { text: "Carcar", value: "Carcar" },
                        ]}
                    />
                </div>
            ),
            dataIndex: "site",
            key: "site",
            render: (_, record, i) => {
                console.log("record", record);

                return <div key={i}>{record?.site}</div>;
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

    // Safe URL handling for SSR compatibility
    const getUrlAndParams = () => {
        if (typeof window === 'undefined') return { url: '', page: 1, categories: null };
        
        try {
            const url = window.location.pathname + window.location.search;
            const getQueryParam = (url, paramName) => {
                const urlParts = url.split("?");
                if (urlParts.length < 2) return null;
                const searchParams = new URLSearchParams(urlParts[1]);
                return searchParams.get(paramName);
            };
            
            return {
                url,
                page: parseInt(getQueryParam(url, "page")) || 1,
                categories: getQueryParam(url, "categories")
            };
        } catch (error) {
            console.error('Error parsing URL for pagination:', error);
            return { url: '', page: 1, categories: null };
        }
    };

    const { url, page, categories } = getUrlAndParams();

    const paginationConfig = {
        current: page,
        pageSize: pageSize,
        total: (applicants?.last_page ?? 0) * pageSize,
        onChange: (newPage, newPageSize) => {
            if (typeof window !== 'undefined') {
                router.visit(
                    window.location.pathname +
                        `?page=${newPage}&status=${status || 'null'}&site=${site || 'null'}`
                );
            }
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

            {filteredDatas && filteredDatas.length >= 0 ? (
                // <Table
                //     pagination={paginationConfig}
                //     columns={columns}
                //     dataSource={filteredDatas}
                //     className="mt-1"
                //     loading={!applicants}
                // />
                sss
            ) : (
                <div className="flex justify-center items-center py-8">
                    <p>Loading applicants data...</p>
                </div>
            )}

            <div className="w-full">
                {(applicants?.total ?? 0) > 0
                    ? `Showing ${(page - 1) * pageSize + 1} to ${Math.min(
                          page * pageSize,
                          applicants.total
                      )} of ${applicants.total} entries`
                    : "No entries available"}
            </div>
        </div>
    );
}
