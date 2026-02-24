import React, { useRef, useState } from "react";
import {
    SearchOutlined,
    UserOutlined,
    ClockCircleOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import {
    Button,
    Input,
    Space,
    Table,
    Tag,
    Modal,
    Steps,
    Descriptions,
    Card,
    Timeline,
    Avatar,
    Typography,
} from "antd";
import Highlighter from "react-highlight-words";
import ButtonComponents from "../components/button-components";
import ErfDropdownFilterComponents from "@/app/pages/admin/sourcing/resource_requests/erf_record/components/erf-dropdown-filter-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AddPositionButtonSection from "./add-position-button-section";
import { setErfRecords, setFilteredData } from "../redux/erf-record-slice";
import ErfMenuButtonSection from "./erf-menu-button-section";

export default function ErfRecordsTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedErfRecord, setSelectedErfRecord] = useState(null);
    const { erf_records, filteredData } = useSelector(
        (state) => state.erf_records,
    );
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    console.log("erf_records", erf_records);

    const filterData = (selectedStatus) => {
        // First filter by current user's ERF records
        const userErfRecords = erf_records.filter((record) => 
            record.user?.id === user?.id
        );

        // Then apply status filter if any
        if (selectedStatus.length === 0) {
            dispatch(setFilteredData(userErfRecords));
        } else {
            const filtered = userErfRecords.filter((record) =>
                selectedStatus.includes(record.status),
            );
            dispatch(setFilteredData(filtered));
        }
    };

    useEffect(() => {
        // Only show ERF records for the current user
        const userErfRecords = erf_records.filter((record) => 
            record.user?.id === user?.id
        );
        dispatch(setFilteredData(userErfRecords));
    }, [erf_records, user]);

    const openErfModal = (record) => {
        setSelectedErfRecord(record);
        setIsModalVisible(true);
    };

    const closeErfModal = () => {
        setIsModalVisible(false);
        setSelectedErfRecord(null);
    };

    const getStatusStep = (status) => {
        // Get current date for demonstration - in real app, these would come from API/database
        const currentDate = new Date().toLocaleString();
        const submittedDate = selectedErfRecord?.submitted || currentDate;

        const steps = [
            {
                title: "Submitted",
                status: "finish",
                description: "Request submitted by manager",
            },
            {
                title: "In Review",
                status: "process",
                description: "Under review by Site Director/Site Manager",
            },
            {
                title: "Approved",
                status: "finish",
                description: "Request approved for posting",
            },
            // {
            //     title: "Completed",
            //     status: "wait",
            //     description: "Position posted and recruitment started",
            // },
        ];

        switch (status) {
            case "Pending":
                return {
                    current: 0,
                    steps: steps.map((step, index) => ({
                        ...step,
                        status: index === 0 ? "process" : "wait",
                        title:
                            index === 0
                                ? `${step.title} (${submittedDate})`
                                : step.title,
                        description: step.description,
                    })),
                };
            case "In Review":
                return {
                    current: 1,
                    steps: steps.map((step, index) => ({
                        ...step,
                        status:
                            index < 1
                                ? "finish"
                                : index === 1
                                  ? "process"
                                  : "wait",
                        title:
                            index === 0
                                ? `${step.title} (${submittedDate})`
                                : index === 1
                                  ? `${step.title} (${currentDate})`
                                  : step.title,
                        description: step.description,
                    })),
                };
            case "Approved":
                return {
                    current: 2,
                    steps: steps.map((step, index) => ({
                        ...step,
                        status:
                            index < 2
                                ? "finish"
                                : index === 2
                                  ? "process"
                                  : "wait",
                        title:
                            index === 0
                                ? `${step.title} (${submittedDate})`
                                : index === 1
                                  ? `${step.title} (${currentDate})`
                                  : index === 2
                                    ? `${step.title} (${currentDate})`
                                    : step.title,
                        description: step.description,
                    })),
                };
            case "Completed":
                return {
                    current: 3,
                    steps: steps.map((step, index) => ({
                        ...step,
                        status: "finish",
                        title:
                            index === 0
                                ? `${step.title} (${submittedDate})`
                                : `${step.title} (${currentDate})`,
                        description: step.description,
                    })),
                };
            case "Declined":
                return {
                    current: 1,
                    steps: steps.map((step, index) => ({
                        ...step,
                        status:
                            index === 0
                                ? "finish"
                                : index === 1
                                  ? "error"
                                  : "wait",
                        title:
                            index === 0
                                ? `${step.title} (${submittedDate})`
                                : index === 1
                                  ? `Declined (${currentDate})`
                                  : step.title,
                        description:
                            index === 1
                                ? "Request declined by approver"
                                : step.description,
                    })),
                };
            default:
                return { current: 0, steps };
        }
    };

    // Mock function to get approval notes - in real implementation, this would come from your API
    const getApprovalNotes = (record) => {
        // This is mock data - replace with actual API call
        const mockNotes = [
            {
                id: 1,
                step: "Submitted",
                author: `${record.user?.employee_fname} ${record.user?.employee_lname}`,
                role: "Requesting Manager",
                timestamp: record.submitted,
                note: "Initial request submitted for new senior developer position.",
                type: "submission",
            },
        ];

        // Add review notes based on status
        if (record.status !== "Pending") {
            mockNotes.push({
                id: 2,
                step: "In Review",
                author: "Rachel Green",
                role: "TA Manager",
                timestamp: "1/17/2024, 10:15:00 AM",
                note: "Position is critical for upcoming project. Budget confirmed. Approved for immediate posting.",
                type: "review",
            });
        }

        if (record.status === "Approved") {
            mockNotes.push({
                id: 3,
                step: "Approved",
                author: "Michael Torres",
                role: "Site Director",
                timestamp: "1/16/2024, 2:20:00 PM",
                note: "Approved with priority for recruitment. Please prioritize technical skills mentioned in requirements.",
                type: "approval",
            });
        }

        if (record.status === "Declined") {
            mockNotes.push({
                id: 3,
                step: "Declined",
                author: "Rachel Green",
                role: "TA Manager",
                timestamp: new Date().toLocaleString(),
                note: "Budget constraints for Q1. Please resubmit with revised budget or defer to Q2.",
                type: "decline",
            });
        }

        return mockNotes;
    };

    const searchInput = useRef(null);
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
            title: "Ref #",
            dataIndex: "ref_id",
            key: "ref_id",
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() => openErfModal(record)}
                    style={{ padding: 0, height: "auto" }}
                >
                    <u>{text}</u>
                </Button>
                // <div>{record?.ref_id}</div>
            ),
        },
        {
            title: "Requesting Manager",
            dataIndex: "fullname",
            key: "fullname",
            ...getColumnSearchProps("fullname"),
            render: (_, record, i) => {
                console.log("record", record);

                return (
                    <div key={i}>
                        {record.user?.employee_fname}{" "}
                        {record.user?.employee_lname}
                    </div>
                );
            },
        },
        {
            title: "Job Title",
            dataIndex: "jobTitle",
            key: "position",
            ...getColumnSearchProps("position"),
        },
        {
            title: "Job Type",
            dataIndex: "jobType",
            key: "dept",
            ...getColumnSearchProps("dept"),
        },
        {
            title: "Position Status",
            dataIndex: "positionStatus",
            key: "eogs",
            ...getColumnSearchProps("eogs"),
        },
        {
            title: "Target Onboarding Date",
            dataIndex: "dateNeed",
            key: "contact",
            ...getColumnSearchProps("contact"),
            render: (text) => {
                if (!text) return "";
                const date = new Date(text);
                return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
            },
        },
        {
            title: "Budget/Cost",
            dataIndex: "budgetCost",
            key: "eogs",
            ...getColumnSearchProps("eogs"),
        },
        {
            title: "Date Submitted",
            dataIndex: "submitted",
            key: "eogs",
            ...getColumnSearchProps("eogs"),
            render: (text) => {
                if (!text) return "";
                const date = new Date(text);
                return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }); 
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record, i) => {
                console.log("record", record);

                return (
                    <Tag
                        color={
                            record.status == "Approved"
                                ? "green"
                                : record.status == "Pending"
                                  ? "orange"
                                  : record.status == "Declined"
                                    ? "red"
                                    : record.status == "In Review"
                                      ? "blue"
                                      : "blue"
                        }
                        key={i}
                    >
                        {record.status}
                    </Tag>
                );
            },
        },
        // {
        //     title: "Action",
        //     dataIndex: "action",
        //     render: (_, record) => {
        //         return <ErfMenuButtonSection data={record} />;
        //     },
        // },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>My ERF Records</b>
                    </h2>
                </div>
                <div className="flex flex-1 justify-between">
                    <AddPositionButtonSection />
                    <div className="mr-8">
                        <ErfDropdownFilterComponents filterData={filterData} />
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                className="mt-1"
            />

            {/* ERF Details Modal */}
            <Modal
                title={`ERF Details - ${selectedErfRecord?.ref_id || ""}`}
                open={isModalVisible}
                onCancel={closeErfModal}
                footer={null}
                width={1000}
                style={{ top: 20 }}
            >
                {selectedErfRecord && (
                    <div className="flex gap-6">
                        {/* Main Content */}
                        <div className="flex-1">
                            <Card title="Request Information" className="mb-4">
                                <Descriptions column={2} bordered size="small">
                                    <Descriptions.Item label="Reference ID:">
                                        <b>{selectedErfRecord.ref_id}</b>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status:">
                                        <Tag
                                            color={
                                                selectedErfRecord.status ===
                                                "Approved"
                                                    ? "green"
                                                    : selectedErfRecord.status ===
                                                        "Pending"
                                                      ? "orange"
                                                      : selectedErfRecord.status ===
                                                          "Declined"
                                                        ? "red"
                                                        : selectedErfRecord.status ===
                                                            "In Review"
                                                          ? "blue"
                                                          : "blue"
                                            }
                                        >
                                            {selectedErfRecord.status}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Requesting Manager:">
                                        <b>
                                            {
                                                selectedErfRecord.user
                                                    ?.employee_fname
                                            }{" "}
                                            {
                                                selectedErfRecord.user
                                                    ?.employee_lname
                                            }
                                        </b>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Date Submitted:">
                                        <b>{selectedErfRecord.submitted}</b>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Job Title:">
                                        <b>{selectedErfRecord.jobTitle}</b>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Job Type:">
                                        <b>{selectedErfRecord.jobType}</b>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Position Status:">
                                        <b>
                                            {selectedErfRecord.positionStatus}
                                        </b>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Date Needed:">
                                        <b>{selectedErfRecord.dateNeed}</b>
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label="Budget/Cost:"
                                        span={2}
                                    >
                                        <b>{selectedErfRecord.budgetCost}</b>
                                    </Descriptions.Item>
                                    {selectedErfRecord.status ===
                                        "Declined" && (
                                        <Descriptions.Item label="Reason for Decline:">
                                            <b>{selectedErfRecord.reason}</b>
                                        </Descriptions.Item>
                                    )}
                                </Descriptions>
                            </Card>

                            {selectedErfRecord.businessJustification && (
                                <Card
                                    title="Business Justification"
                                    className="mb-4"
                                >
                                    <p>
                                        {
                                            selectedErfRecord.businessJustification
                                        }
                                    </p>
                                </Card>
                            )}

                            {selectedErfRecord.qualifications && (
                                <Card
                                    title="Required Qualifications"
                                    className="mb-4"
                                >
                                    <p>{selectedErfRecord.qualifications}</p>
                                </Card>
                            )}

                            {selectedErfRecord.responsibilities && (
                                <Card title="Key Responsibilities">
                                    <p>{selectedErfRecord.responsibilities}</p>
                                </Card>
                            )}
                        </div>

                        {/* Stepper Sidebar */}
                        <div className="w-80">
                            <Card title="Request Progress" size="small">
                                <Steps
                                    direction="vertical"
                                    current={
                                        getStatusStep(selectedErfRecord.status)
                                            .current
                                    }
                                    items={
                                        getStatusStep(selectedErfRecord.status)
                                            .steps
                                    }
                                    size="small"
                                />
                            </Card>

                            {/* Approval Notes Timeline */}
                            {/* <Card title="Notes & Comments" size="small" className="mt-4">
                                <Timeline
                                    mode="left"
                                    items={getApprovalNotes(selectedErfRecord).map((note, index) => ({
                                        key: note.id,
                                        dot: note.type === 'decline' ? 
                                            <Avatar size="small" style={{ backgroundColor: '#ff4d4f' }} icon={<MessageOutlined />} /> :
                                            note.type === 'approval' ? 
                                            <Avatar size="small" style={{ backgroundColor: '#52c41a' }} icon={<MessageOutlined />} /> :
                                            <Avatar size="small" style={{ backgroundColor: '#1890ff' }} icon={<MessageOutlined />} />,
                                        children: (
                                            <div className="mb-3">
                                                <div className="flex flex-col">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <Typography.Text strong className="text-sm">
                                                            {note.author}
                                                        </Typography.Text>
                                                        <Typography.Text type="secondary" className="text-xs">
                                                            {note.timestamp}
                                                        </Typography.Text>
                                                    </div>
                                                    <Typography.Text type="secondary" className="text-xs mb-2">
                                                        {note.role} • {note.step}
                                                    </Typography.Text>
                                                    <Typography.Paragraph className="text-sm mb-0" style={{ marginBottom: 0 }}>
                                                        {note.note}
                                                    </Typography.Paragraph>
                                                </div>
                                            </div>
                                        )
                                    }))}
                                />
                            </Card> */}

                            {/* Timeline Summary */}
                            <Card
                                title="Timeline Summary"
                                size="small"
                                className="mt-4"
                            >
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span>Requisition created:</span>
                                        <span className="text-gray-600">
                                            {selectedErfRecord.submitted}
                                        </span>
                                    </div>
                                    {selectedErfRecord.status !== "Pending" && (
                                        <div className="flex justify-between">
                                            <span>Status updated:</span>
                                            <span className="text-gray-600">
                                                {new Date().toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                    {selectedErfRecord.dateNeed && (
                                        <div className="flex justify-between">
                                            <span>Target start date:</span>
                                            <span className="text-gray-600">
                                                {selectedErfRecord.dateNeed}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
