import React, { useRef, useState } from 'react';
import { FolderOpenFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';

export default function HiringTableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
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
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const data = [
        {
            key: '1',
            app_id: 32,
            position: 'HR Manager',
            app_name: 'John Brown',
            salary: '20,000.00',
            status: 'Regular',
        },
        {
            key: '2',
            app_id: 32,
            position: 'HR Manager',
            app_name: 'John Brown',
            salary: '20,000.00',
            status: 'Regular',
        },
        {
            key: '3',
            app_id: 32,
            position: 'HR Manager',
            app_name: 'John Brown',
            salary: '20,000.00',
            status: 'Regular',
        },
        {
            key: '4',
            app_id: 32,
            position: 'HR Manager',
            app_name: 'John Brown',
            salary: '20,000.00',
            status: 'Regular',
        },
    ];
    const columns = [
        {
            title: 'Applicant #',
            dataIndex: 'app_id',
            key: 'app_id',
            ...getColumnSearchProps('app_id'),
        },
        {
            title: 'Applicant Name',
            dataIndex: 'app_name',
            key: 'app_name',
            ...getColumnSearchProps('app_name'),
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            ...getColumnSearchProps('position'),
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
            ...getColumnSearchProps('salary'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record, i) => {
                console.log('record', record)

                return (
                    <Tag color={'orange'} key={i}>
                        {record.status}
                    </Tag>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
                    >
                        <FolderOpenFilled />
                    </button>
                )
            }
        },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Hiring Section</b>
                    </h2>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />;
        </div>
    )
};
