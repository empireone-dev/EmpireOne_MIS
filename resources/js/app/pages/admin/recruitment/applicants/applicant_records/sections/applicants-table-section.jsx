import React, { useRef, useState } from "react";
import { Select, Table, Tag, Tooltip, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { router } from "@inertiajs/react";
import ApplicantMenuSection from "./applicant-menu-section";
import ApplicantSearchSection from "./applicant-search-section";
import CreateApplicantSection from "./create-applicant-section";
import ApplicantPhoneStatusComponent from "../../components/applicant-phone-status-component";
import { FileFilled } from "@ant-design/icons";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import ApplicantCvFileComponent from "../../components/applicant-cv-file-component";
import ApplicantDetaillsComponent from "../../components/applicant-detaills-component";
import ApplicantAiInterviewComponent from "../../components/applicant-ai-interview-component";

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

// ApplicationDetailsModal component to show application details
const ApplicationDetailsModal = ({ record, open, setOpen }) => {
    const capitalizeFirstLetter = (str) => {
        if (!str) return str;
        return str
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(" ");
    };

    return (
        <Modal
            title={`Application Details - ${record?.app_id}`}
            open={open}
            onCancel={() => setOpen(false)}
            footer={[
                <Button key="close" onClick={() => setOpen(false)}>
                    Close
                </Button>,
            ]}
            width={600}
        >
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mt-3">
                        <h3 className="font-bold text-lg text-gray-700 mb-4">
                            Personal Information:
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <span className="font-medium">Full Name:</span>
                                <span className="ml-2">
                                    {capitalizeFirstLetter(record?.fname)}{" "}
                                    {capitalizeFirstLetter(record?.mname)}{" "}
                                    {capitalizeFirstLetter(record?.lname)}{" "}
                                    {record?.suffix !== "undefined"
                                        ? record?.suffix
                                        : ""}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Email:</span>
                                <span className="ml-2">{record?.email}</span>
                            </div>
                            <div>
                                <span className="font-medium">Phone:</span>
                                <span className="ml-2">{record?.phone}</span>
                            </div>
                            <div>
                                <span className="font-medium">Gender:</span>
                                <span className="ml-2">{record?.gender}</span>
                            </div>
                            <div>
                                <span className="font-medium">
                                    Date of Birth:
                                </span>
                                <span className="ml-2">
                                    {record?.dob
                                        ? moment(record.dob).format("LL")
                                        : "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">
                                    Marital Status:
                                </span>
                                <span className="ml-2">
                                    {record?.marital || "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">
                                    BPO Experience:
                                </span>
                                <span className="ml-2">
                                    {record?.with_bpo === "Yes"
                                        ? "✓ Yes"
                                        : "✗ No"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border-l pl-4 mt-3">
                        <h3 className="font-bold text-lg text-gray-700 mb-4">
                            Application Information:
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <span className="font-medium">
                                    Applying For:
                                </span>
                                <span className="ml-2">
                                    {record?.applying_for || "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Source:</span>
                                <span className="ml-2">
                                    {record?.source || "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">
                                    Referred By:
                                </span>
                                <span className="ml-2">
                                    {record?.referred_by || "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Site:</span>
                                <span className="ml-2">
                                    {record?.site || "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">Status:</span>
                                <span className="ml-2">
                                    <Tag
                                        color={
                                            record?.status === "Failed" ||
                                            record?.status === "Send Failed" ||
                                            record?.status === "Declined"
                                                ? "red"
                                                : record?.status === "Passed" ||
                                                    record?.status ===
                                                        "Accepted Offer" ||
                                                    record?.status === "Hired"
                                                  ? "green"
                                                  : record?.status ===
                                                          "For Final Phase" ||
                                                      record?.status ===
                                                          "Final Phase" ||
                                                      record?.status ===
                                                          "Regular"
                                                    ? "blue"
                                                    : record?.status ===
                                                            "Pending" ||
                                                        record?.status ===
                                                            "Counter Offer"
                                                      ? "yellow"
                                                      : record?.status ===
                                                          "Initial Phase"
                                                        ? "orange"
                                                        : record?.status ===
                                                            "Pooling"
                                                          ? "purple"
                                                          : "default"
                                        }
                                    >
                                        {record?.status}
                                    </Tag>
                                </span>
                            </div>
                            <div>
                                <span className="font-medium">
                                    Date Submitted:
                                </span>
                                <span className="ml-2">
                                    {record?.submitted
                                        ? moment(record.submitted).format("LL")
                                        : "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <h3 className="font-bold text-lg text-gray-700 mb-4">
                        Address Information:
                    </h3>
                    <div>
                        <>{record?.caddress || "N/A"}</>
                    </div>
                </div>

                {(record?.mmname ||
                    record?.ffname ||
                    record?.educ ||
                    record?.courset ||
                    record?.nationality ||
                    record?.religion) && (
                    <div className="pt-4">
                        <h3 className="font-bold text-lg text-gray-700 mb-4">
                            Additional Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                {record?.mmname && (
                                    <div>
                                        <span className="font-medium">
                                            Mother's Maiden Name:
                                        </span>
                                        <span className="ml-2">
                                            {record.mmname}
                                        </span>
                                    </div>
                                )}
                                {record?.ffname && (
                                    <div>
                                        <span className="font-medium">
                                            Father's Full Name:
                                        </span>
                                        <span className="ml-2">
                                            {record.ffname}
                                        </span>
                                    </div>
                                )}
                                {record?.nationality && (
                                    <div>
                                        <span className="font-medium">
                                            Nationality:
                                        </span>
                                        <span className="ml-2">
                                            {record.nationality}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                {record?.educ && (
                                    <div>
                                        <span className="font-medium">
                                            Education:
                                        </span>
                                        <span className="ml-2">
                                            {record.educ}
                                        </span>
                                    </div>
                                )}
                                {record?.courset && (
                                    <div>
                                        <span className="font-medium">
                                            Course Taken:
                                        </span>
                                        <span className="ml-2">
                                            {record.courset}
                                        </span>
                                    </div>
                                )}
                                {record?.religion && (
                                    <div>
                                        <span className="font-medium">
                                            Religion:
                                        </span>
                                        <span className="ml-2">
                                            {record.religion}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

// ApplicationIdCell component to handle modal state
const ApplicationIdCell = ({ record }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                type="link"
                onClick={() => setOpen(true)}
                className="p-0 font-medium text-blue-600 hover:text-blue-800"
            >
                <u>{record.app_id}</u>
            </Button>
            <ApplicationDetailsModal
                record={record}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};

export default function ApplicantsTableSection() {
    // const [filteredDatas, setFilteredDatas] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { applicants, interviewer } = useSelector(
        (state) => state.applicants,
    );

    const urls = new URL(window.location.href);
    const searchParams = new URLSearchParams(urls.search);
    const pages = searchParams.get("page");
    const status = searchParams.get("status");
    const site = searchParams.get("site");

    const filteredDatas = applicants.data ?? [];

    function search_status(value) {
        router.visit(
            "?page=1" + "&status=" + (value || "null") + "&site=" + site,
        );
    }
    function search_site(value) {
        router.visit(
            "?page=1" + "&status=" + status + "&site=" + (value || "null"),
        );
    }
    const columns = [
        {
            title: "Application #",
            dataIndex: "app_id",
            key: "app_id",
            render: (_, record) => {
                return <ApplicationIdCell record={record} />;
            },
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
            // ...getColumnSearchProps("fullname"),
            render: (_, record, i) => {
                console.log("record", record);

                const capitalizeFirstLetter = (str) => {
                    if (!str) return str;
                    return str
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase(),
                        )
                        .join(" ");
                };

                return (
                    <div key={i} className="font-bold flex items-center gap-2">
                        {record.with_bpo === "Yes" && (
                            <Tooltip title="With BPO Experience">
                                <span className="text-green-600 text-sm">
                                    ✓
                                </span>
                            </Tooltip>
                        )}
                        <span>
                            {capitalizeFirstLetter(record.lname)},&nbsp;
                            {capitalizeFirstLetter(record.fname)}&nbsp;
                            {record.suffix === "undefined"
                                ? "--"
                                : record.suffix}
                        </span>
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
            title: "CV File & Application Details",
            dataIndex: "cv_file",
            key: "cv_file",
            render: (_, record) => {
                return (
                    <div className="gap-1.5 flex text-center justify-center">
                        <div>
                            <ApplicantCvFileComponent data={record} />
                        </div>
                        <div>
                            <ApplicantDetaillsComponent data={record} />
                        </div>

                        <div>
                            <ApplicantAiInterviewComponent data={record} />
                        </div>
                    </div>
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
                            { text: "Cebu", value: "Cebu" },
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
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <>
                        {record && (
                            <div className="flex justify-center gap-1">
                                <ApplicantMenuSection
                                    interviewer={interviewer}
                                    data={record}
                                />
                            </div>
                        )}
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
            router.visit(
                window.location.pathname +
                    `?page=${newPage}&status=${status}&site=${site}`,
            );
            setCurrent(newPage);
            setPageSize(newPageSize);
        },
    };

    return (
        <div>
            {filteredDatas && (
                <Table
                    pagination={paginationConfig}
                    columns={columns}
                    dataSource={filteredDatas}
                    className="mt-1"
                />
            )}

            <div className="w-full">
                {applicants.total > 0
                    ? `Showing ${(page - 1) * pageSize + 1} to ${Math.min(
                          page * pageSize,
                          applicants.total,
                      )} of ${applicants.total} entries`
                    : "No entries available"}
            </div>
        </div>
    );
}
