import React, { useRef, useState } from "react";
import { CheckCircleFilled, CheckCircleOutlined, CheckSquareOutlined, LineOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, Tag, Upload } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import moment from "moment";
import ReUploadRequirementsSection from "./re-upload-requirements-section";

export default function PreEmploymentTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    // const { job_positions } = useSelector((state) => state.job_positions)
    const { preemploymentfiles } = useSelector((state) => state.preemploymentfiles)
    const { applicant } = useSelector((state) => state.final_rate);


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

    // const data = [
    //     {
    //         key: '1',
    //         reqs: 'Birth Certificate',
    //         status: 'Approved',
    //     },
    //     {
    //         key: '2',
    //         reqs: 'Police Clearance',
    //         status: 'Declined',
    //     },
    //     {
    //         key: '3',
    //         reqs: 'Drug Test',
    //         status: 'Uploaded',
    //     },
    //     {
    //         key: '4',
    //         reqs: 'NBI Clearance',
    //         status: 'Approved',
    //     },
    // ];


    const columns = [
        // {
        //     title: "App ID",
        //     dataIndex: "app_id",
        //     key: "app_id",
        //     width: 120,
        //     responsive: ['lg'],
        //     ...getColumnSearchProps("app_id"),
        // },
        {
            title: "Requirements",
            dataIndex: "reqs",
            key: "reqs",
            ellipsis: true,
            ...getColumnSearchProps("reqs"),
            render: (text) => (
                <div className="text-xs sm:text-sm md:text-base">
                    {searchedColumn === "reqs" ? (
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
                    )}
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record, i) => {
                console.log('record', record);

                const statusText = record.status === 'Declined'
                    ? `${record.status} - ${record.reas}`
                    : record.status;

                return (
                    <Tag
                        color={
                            record.status === 'Approved' ? 'green' :
                                record.status === 'Uploaded' ? 'orange' :
                                    record.status === 'Declined' ? 'red' :
                                        record.status === 'In Review' ? 'blue' :
                                            'blue'
                        }
                        key={i}
                        className="text-xs sm:text-sm break-words"
                        style={{ 
                            maxWidth: '100%',
                            whiteSpace: 'normal',
                            height: 'auto',
                            lineHeight: '1.2'
                        }}
                    >
                        <span className="hidden md:inline">{statusText}</span>
                        <span className="md:hidden">
                            {record.status === 'Declined' 
                                ? `${record.status}${record.reas ? ` - ${record.reas}` : ''}`
                                : record.status
                            }
                        </span>
                    </Tag>
                );
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: 80,
            align: 'center',
            render: (_, record) => {

                return (
                    <div className='flex justify-center items-center gap-1'>
                        {record.status === 'Approved' && (
                            <div className="text-green-500">
                                <CheckCircleOutlined className="text-lg sm:text-xl md:text-2xl" />
                            </div>
                        )}
                        {record.status === 'Declined' && (
                            <ReUploadRequirementsSection data={record} />
                        )}
                        {record.status === 'Uploaded' && (
                            <div className='text-lg sm:text-xl md:text-2xl text-orange-500'>
                                <CheckSquareOutlined />
                            </div>
                        )}

                    </div>
                )
            }
        },
    ];
    console.log('applicant', applicant)
    return (
        <div className="mt-2">
            <div className="overflow-x-auto">
                <Table 
                    columns={columns} 
                    dataSource={applicant?.requirements ?? []} 
                    scroll={{ x: 350 }}
                    size="small"
                    className="responsive-table"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showQuickJumper: false,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} of ${total} items`,
                        responsive: true,
                    }}
                />
            </div>
            <style jsx>{`
                @media (max-width: 640px) {
                    .responsive-table .ant-table-thead > tr > th {
                        padding: 8px 4px !important;
                        font-size: 12px !important;
                    }
                    .responsive-table .ant-table-tbody > tr > td {
                        padding: 8px 4px !important;
                        font-size: 12px !important;
                    }
                    .responsive-table .ant-table-filter-trigger {
                        margin-right: 2px !important;
                    }
                }
                @media (max-width: 480px) {
                    .responsive-table .ant-table-thead > tr > th {
                        padding: 6px 2px !important;
                        font-size: 11px !important;
                    }
                    .responsive-table .ant-table-tbody > tr > td {
                        padding: 6px 2px !important;
                        font-size: 11px !important;
                    }
                }
            `}</style>
        </div>
    );
}
