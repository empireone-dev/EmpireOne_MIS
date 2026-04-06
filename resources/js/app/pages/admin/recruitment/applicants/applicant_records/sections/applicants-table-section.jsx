import React, { useRef, useState, useEffect } from "react";
import { Select, Table, Tag, Tooltip, Modal, Button, message } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import { router } from "@inertiajs/react";
import ApplicantMenuSection from "./applicant-menu-section";
import ApplicantSearchSection from "./applicant-search-section";
import CreateApplicantSection from "./create-applicant-section";
import ApplicantPhoneStatusComponent from "../../components/applicant-phone-status-component";
import { FileFilled, LoadingOutlined } from "@ant-design/icons";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import ApplicantCvFileComponent from "../../components/applicant-cv-file-component";
import ApplicantDetaillsComponent from "../../components/applicant-detaills-component";
import ApplicantAiInterviewComponent from "../../components/applicant-ai-interview-component";
import store from "@/app/store/store";
import { create_job_offer_thunk } from "@/app/pages/admin/hiring/hiring_section/redux/hiring-thunk";
import { get_applicant_thunk } from "../redux/applicant-thunk";
import { get_department_thunk } from "@/app/pages/admin/sourcing/department/redux/department-thunk";
import { get_account_thunk } from "@/app/pages/admin/employee_relation/employee_section/redux/account-thunk";

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

const BULK_SELECTION_KEY = "bulk_job_offer_selection";

function loadSelection() {
    try {
        const saved = sessionStorage.getItem(BULK_SELECTION_KEY);
        return saved ? JSON.parse(saved) : { keys: [], rows: [] };
    } catch {
        return { keys: [], rows: [] };
    }
}

function saveSelection(keys, rows) {
    try {
        sessionStorage.setItem(
            BULK_SELECTION_KEY,
            JSON.stringify({ keys, rows }),
        );
    } catch {}
}

function clearSelection() {
    sessionStorage.removeItem(BULK_SELECTION_KEY);
}

export default function ApplicantsTableSection() {
    // const [filteredDatas, setFilteredDatas] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRowKeys, setSelectedRowKeys] = useState(
        () => loadSelection().keys,
    );
    const [selectedRows, setSelectedRows] = useState(
        () => loadSelection().rows,
    );
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [bulkForm, setBulkForm] = useState({ allowance: "" });
    const [bulkLoading, setBulkLoading] = useState(false);

    const { applicants, interviewer } = useSelector(
        (state) => state.applicants,
    );
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);

    useEffect(() => {
        store.dispatch(get_department_thunk());
        store.dispatch(get_account_thunk());
    }, []);

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

    const rowSelection = {
        selectedRowKeys,
        onChange: (newKeys, newRows) => {
            // Preserve selections from other pages
            const currentPageKeys = filteredDatas.map((row) => row.app_id);
            const prevKeysFromOtherPages = selectedRowKeys.filter(
                (key) => !currentPageKeys.includes(key),
            );
            const prevRowsFromOtherPages = selectedRows.filter(
                (row) => !currentPageKeys.includes(row.app_id),
            );
            const mergedKeys = [...prevKeysFromOtherPages, ...newKeys];
            const mergedRows = [...prevRowsFromOtherPages, ...newRows];
            setSelectedRowKeys(mergedKeys);
            setSelectedRows(mergedRows);
            saveSelection(mergedKeys, mergedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.status !== "Passed",
            title:
                record.status !== "Passed"
                    ? "Only 'Passed' applicants can be selected for bulk job offer"
                    : "",
        }),
    };

    async function handleBulkJobOffer() {
        setBulkLoading(true);
        try {
            for (const row of selectedRows) {
                await store.dispatch(
                    create_job_offer_thunk({
                        ...bulkForm,
                        ...row,
                        status: "Pending",
                    }),
                );
            }
            message.success(
                `Job Offer sent to ${selectedRows.length} applicant(s)!`,
            );
            setBulkModalOpen(false);
            setSelectedRowKeys([]);
            setSelectedRows([]);
            setBulkForm({ allowance: "" });
            clearSelection();
            store.dispatch(get_applicant_thunk());
        } catch (error) {
            message.error("Failed to send some job offers.");
        } finally {
            setBulkLoading(false);
        }
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
            {selectedRowKeys.length > 0 && (
                <div className="mb-3 flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <Tooltip
                        overlayStyle={{ fontSize: "11px" }}
                        title={
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: "1.6" }}>
                                {selectedRows.map((row) => (
                                    <li key={row.app_id}>
                                        #{row.app_id} — {row.fname} {row.lname}
                                    </li>
                                ))}
                            </ul>
                        }
                    >
                        <span className="text-sm font-medium text-blue-700 cursor-default underline decoration-dotted">
                            {selectedRowKeys.length} applicant(s) selected
                        </span>
                    </Tooltip>
                    <Button
                        type="primary"
                        onClick={() => setBulkModalOpen(true)}
                    >
                        Send Job Offer
                    </Button>
                    <Button
                        onClick={() => {
                            setSelectedRowKeys([]);
                            setSelectedRows([]);
                            clearSelection();
                        }}
                    >
                        Clear Selection
                    </Button>
                </div>
            )}

            {filteredDatas && (
                <Table
                    rowSelection={rowSelection}
                    rowKey="app_id"
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

            {/* Bulk Job Offer Modal */}
            <Modal
                title={`Send Job Offer to ${selectedRows.length} Applicant(s)`}
                open={bulkModalOpen}
                onCancel={() => setBulkModalOpen(false)}
                footer={null}
                width={800}
            >
                <li className="bg-gray-300 h-0.5 mb-4"></li>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleBulkJobOffer();
                    }}
                    className="w-full"
                >
                    <div className="flex flex-col -mx-3 mb-3">
                        <div className="flex flex-1 gap-5 px-2.5">
                            <div className="w-full">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Job Position
                                </label>
                                <select
                                    required
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const selectedJob = job_positions.find(
                                            (job) =>
                                                job.jPosition === e.target.value,
                                        );
                                        setBulkForm({
                                            ...bulkForm,
                                            outsourcing_erf: {
                                                ...bulkForm.outsourcing_erf,
                                                department:
                                                    selectedJob?.outsourcing_erf
                                                        ?.department || "",
                                                account:
                                                    selectedJob?.outsourcing_erf
                                                        ?.account || "",
                                            },
                                            jobPos:
                                                selectedJob?.jPosition ||
                                                e.target.value,
                                        });
                                    }}
                                >
                                    <option value="" disabled>
                                        Select Job Position
                                    </option>
                                    {(job_positions ?? [])
                                        .filter(
                                            (job, index, self) =>
                                                index ===
                                                self.findIndex(
                                                    (j) =>
                                                        j.jPosition ===
                                                        job.jPosition,
                                                ),
                                        )
                                        .map((res, i) => (
                                            <option
                                                value={res.jPosition}
                                                key={i}
                                            >
                                                {res.jPosition}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Department
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={
                                        bulkForm.outsourcing_erf?.department ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        setBulkForm({
                                            ...bulkForm,
                                            outsourcing_erf: {
                                                ...bulkForm.outsourcing_erf,
                                                department: e.target.value,
                                            },
                                        })
                                    }
                                >
                                    <option value="">Select Department</option>
                                    {(departments ?? [])
                                        .filter(
                                            (res, index, self) =>
                                                index ===
                                                self.findIndex(
                                                    (d) => d.dept === res.dept,
                                                ),
                                        )
                                        .map((res, i) => (
                                            <option value={res.dept} key={i}>
                                                {res.dept}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Account
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={
                                        bulkForm.outsourcing_erf?.account || ""
                                    }
                                    onChange={(e) =>
                                        setBulkForm({
                                            ...bulkForm,
                                            outsourcing_erf: {
                                                ...bulkForm.outsourcing_erf,
                                                account: e.target.value,
                                            },
                                        })
                                    }
                                >
                                    <option value="">Select Account</option>
                                    {(accounts ?? []).map((res, i) => (
                                        <option value={res.acc} key={i}>
                                            {res.acc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-1">
                            <div className="w-3/5 px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Salary Offer
                                </label>
                                <input
                                    required
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="salary"
                                    value={bulkForm.salary ?? ""}
                                    onChange={(e) =>
                                        setBulkForm({
                                            ...bulkForm,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-3/5 px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Allowance
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="allowance"
                                    value={bulkForm.allowance ?? ""}
                                    onChange={(e) =>
                                        setBulkForm({
                                            ...bulkForm,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Type of Allowance
                                </label>
                                <select
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="typea"
                                    onChange={(e) =>
                                        setBulkForm({
                                            ...bulkForm,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <option value=""></option>
                                    <option value="Program Allowance">
                                        Program Allowance
                                    </option>
                                    <option value="Rice and Meal Allowance">
                                        Rice and Meal Allowance
                                    </option>
                                    <option value="Communication Allowance">
                                        Communication Allowance
                                    </option>
                                    <option value="Skill Allowance">
                                        Skill Allowance
                                    </option>
                                    <option value="Interim Allowance">
                                        Interim Allowance
                                    </option>
                                    <option value="Transportation Allowance">
                                        Transportation Allowance
                                    </option>
                                    <option value="Travel Allowance">
                                        Travel Allowance
                                    </option>
                                    <option value="Clothing Allowance">
                                        Clothing Allowance
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-1">
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Start Date
                                </label>
                                <input
                                    required
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="date"
                                    name="startDate"
                                    value={bulkForm.startDate ?? ""}
                                    onChange={(e) =>
                                        setBulkForm({
                                            ...bulkForm,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full px-2.5">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                    Work Location
                                </label>
                                <select
                                    required
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="work_location"
                                    onChange={(e) =>
                                        setBulkForm({
                                            ...bulkForm,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                >
                                    <option value="" disabled>
                                        Select Work Location
                                    </option>
                                    <option value="San Carlos City (On-site)">
                                        San Carlos City (On-site)
                                    </option>
                                    <option value="Carcar City (On-site)">
                                        Carcar City (On-site)
                                    </option>
                                    <option value="Cebu City (On-site)">
                                        Cebu City (On-site)
                                    </option>
                                    <option value="Work From Home Setup">
                                        Work From Home Setup
                                    </option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 px-2.5">
                        <p className="text-sm text-gray-600 font-medium">
                            This job offer will be sent to:
                        </p>
                        <ul className="list-disc pl-5 text-sm mt-1 max-h-32 overflow-y-auto">
                            {selectedRows.map((row) => (
                                <li key={row.app_id}>
                                    #{row.app_id} &mdash; {row.fname}{" "}
                                    {row.lname}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        disabled={bulkLoading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                        <div className="flex flex-1 items-center justify-center">
                            {bulkLoading ? (
                                <LoadingOutlined spin />
                            ) : null}
                            &nbsp;{" "}
                            {bulkLoading
                                ? "SENDING..."
                                : `SEND JOB OFFER TO ${selectedRows.length} APPLICANT(S)`}
                        </div>
                    </button>
                </form>
            </Modal>
        </div>
    );
}
