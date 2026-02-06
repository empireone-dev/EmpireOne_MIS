import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal, Steps, Descriptions, Card } from "antd";
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
    const { erf_records,filteredData } = useSelector((state) => state.erf_records);
    const dispatch =useDispatch()
    console.log("erf_records", erf_records);

    const filterData = (selectedStatus) => {
        if (selectedStatus.length === 0) {
            dispatch(setFilteredData(erf_records))
        } else {
            const filtered = erf_records.filter((record) =>
                selectedStatus.includes(record.status)
            );
            dispatch(setFilteredData(filtered))
        }
    };


    useEffect(() => {
        dispatch(setFilteredData(erf_records))
    }, [erf_records]);

    const openErfModal = (record) => {
        setSelectedErfRecord(record);
        setIsModalVisible(true);
    };

    const closeErfModal = () => {
        setIsModalVisible(false);
        setSelectedErfRecord(null);
    };

    const getStatusStep = (status) => {
        const steps = [
            { title: 'Submitted', status: 'finish' },
            { title: 'In Review', status: 'process' },
            { title: 'Approved', status: 'finish' },
            { title: 'Completed', status: 'wait' }
        ];

        switch (status) {
            case 'Pending':
                return { current: 0, steps: steps.map((step, index) => ({
                    ...step,
                    status: index === 0 ? 'process' : 'wait'
                })) };
            case 'In Review':
                return { current: 1, steps: steps.map((step, index) => ({
                    ...step,
                    status: index < 1 ? 'finish' : index === 1 ? 'process' : 'wait'
                })) };
            case 'Approved':
                return { current: 2, steps: steps.map((step, index) => ({
                    ...step,
                    status: index < 2 ? 'finish' : index === 2 ? 'process' : 'wait'
                })) };
            case 'Completed':
                return { current: 3, steps: steps.map((step, index) => ({
                    ...step,
                    status: 'finish'
                })) };
            case 'Declined':
                return { current: 1, steps: steps.map((step, index) => ({
                    ...step,
                    status: index === 0 ? 'finish' : index === 1 ? 'error' : 'wait'
                })) };
            default:
                return { current: 0, steps };
        }
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
                    style={{ padding: 0, height: 'auto' }}
                >
                    {text}
                </Button>
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
            title: "Date Needed",
            dataIndex: "dateNeed",
            key: "contact",
            ...getColumnSearchProps("contact"),
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
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return <ErfMenuButtonSection data={record} />;
            },
        },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>ERF Records</b>
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
                title={`ERF Details - ${selectedErfRecord?.ref_id || ''}`}
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
                                    <Descriptions.Item label="Reference ID">
                                        {selectedErfRecord.ref_id}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                        <Tag
                                            color={
                                                selectedErfRecord.status === "Approved"
                                                    ? "green"
                                                    : selectedErfRecord.status === "Pending"
                                                    ? "orange"
                                                    : selectedErfRecord.status === "Declined"
                                                    ? "red"
                                                    : selectedErfRecord.status === "In Review"
                                                    ? "blue"
                                                    : "blue"
                                            }
                                        >
                                            {selectedErfRecord.status}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Requesting Manager">
                                        {selectedErfRecord.user?.employee_fname} {selectedErfRecord.user?.employee_lname}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Date Submitted">
                                        {selectedErfRecord.submitted}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Job Title">
                                        {selectedErfRecord.jobTitle}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Job Type">
                                        {selectedErfRecord.jobType}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Position Status">
                                        {selectedErfRecord.positionStatus}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Date Needed">
                                        {selectedErfRecord.dateNeed}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Budget/Cost" span={2}>
                                        {selectedErfRecord.budgetCost}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            {selectedErfRecord.businessJustification && (
                                <Card title="Business Justification" className="mb-4">
                                    <p>{selectedErfRecord.businessJustification}</p>
                                </Card>
                            )}

                            {selectedErfRecord.qualifications && (
                                <Card title="Required Qualifications" className="mb-4">
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
                                    current={getStatusStep(selectedErfRecord.status).current}
                                    items={getStatusStep(selectedErfRecord.status).steps}
                                    size="small"
                                />
                                
                                <div className="mt-4 p-3 bg-gray-50 rounded">
                                    <h4 className="text-sm font-medium mb-2">Timeline</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                            <span>Requisition created:</span>
                                            <span className="text-gray-600">{selectedErfRecord.submitted}</span>
                                        </div>
                                        {selectedErfRecord.status !== 'Pending' && (
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
                                                <span className="text-gray-600">{selectedErfRecord.dateNeed}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
