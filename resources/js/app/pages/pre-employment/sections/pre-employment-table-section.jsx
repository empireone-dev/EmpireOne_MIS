import React, { useRef, useState } from "react";
import { CheckCircleFilled, CheckCircleOutlined, CheckSquareOutlined, LineOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, Tag, Upload } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import moment from "moment";

export default function PreEmploymentTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const { job_positions } = useSelector((state) => state.job_positions)

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


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

    const data = [
        {
            key: '1',
            reqs: 'Birth Certificate',
            status: 'Approved',
        },
        {
            key: '2',
            reqs: 'Police Clearance',
            status: 'Declined',
        },
        {
            key: '3',
            reqs: 'Drug Test',
            status: 'Uploaded',
        },
        {
            key: '4',
            reqs: 'NBI Clearance',
            status: 'Approved',
        },
    ];

    const columns = [
        {
            title: "Requirements",
            dataIndex: "reqs",
            key: "reqs",
            ...getColumnSearchProps("reqs"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record, i) => {
                console.log('record', record);

                const statusText = record.status === 'Declined'
                    ? `${record.status} - Blurred Image/Image Not Clear,Uploaded Incorrect File`
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
                    >
                        {statusText}
                    </Tag>
                );
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {

                return (
                    <div className='flex gap-1'>
                        {record.status === 'Approved' && (
                            <div className="text-green-500">
                                <CheckCircleOutlined className="text-2xl ml-2.5" />
                            </div>
                        )}
                        {record.status === 'Declined' && (
                            <div>
                                <button
                                    type="button"
                                    onClick={showModal}
                                    className="text-2xl ml-2.5 text-red-500"
                                >
                                    <UploadOutlined />
                                </button>
                                <Modal title="REUPLOAD REQUIREMENTS" open={isModalVisible} onOk={handleOk} okText="Submit" onCancel={handleCancel}>
                                    <div className='w-full'>
                                        <label
                                            className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                                            for="grid-text"
                                        >
                                            Name of Requirement
                                        </label>
                                        <input type="text" className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value="Police Clearance" readOnly />
                                    </div>
                                    <Upload
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture"
                                        method='GET'
                                        maxCount={1}
                                        multiple={false}
                                        defaultFileList={fileList}
                                    >
                                        <Button type="primary" icon={<UploadOutlined />}>
                                            Upload Scanned Image
                                        </Button>
                                    </Upload>
                                </Modal>
                            </div>
                        )}
                        {record.status === 'Uploaded' && (
                            <div className='ml-2.5 text-2xl text-orange-500'>
                                <CheckSquareOutlined />
                            </div>
                        )}

                    </div>
                )
            }
        },
    ];

    return (
        <div className="mt-2">
            <Table columns={columns} dataSource={data} />;
        </div>
    );
}
