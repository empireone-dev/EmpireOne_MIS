import React, { useRef, useState } from 'react';
import { FileAddOutlined, MedicineBoxOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { router } from '@inertiajs/react';

export default function EmployeeHealthDataTableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const { employees } = useSelector((state) => state.employees)
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

    const columns = [
        {
            title: 'Employee #',
            dataIndex: 'emp_id',
            key: 'emp_id',
            ...getColumnSearchProps('emp_id'),
        },
        {
            title: 'Fullname',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname'),
            render: (_, record, i) => {
                console.log('record', record)

                return (
                    <div key={i}>
                        {record?.applicant?.fname} {record?.applicant?.mname} {record?.applicant?.lname}
                    </div>

                )
            }
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            ...getColumnSearchProps('position'),
        },
        {
            title: 'Department',
            dataIndex: 'dept',
            key: 'dept',
            ...getColumnSearchProps('dept'),
        },
        {
            title: 'Email Address',
            dataIndex: 'eogs',
            key: 'eogs',
            ...getColumnSearchProps('eogs'),
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            ...getColumnSearchProps('contact'),
            render: (_, record, i) => {
                console.log('record', record)

                return (
                    <div key={i}>
                        {record?.applicant?.phone}
                    </div>

                )
            }
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
                    <div className="gap-1.5 flex">
                        <button
                            type="button"
                            onClick={() => router.visit('/admin/employee_wellness/employee_health_data/employee_med_form')}
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center"
                        >
                            <FileAddOutlined className='text-lg' />
                        </button>
                        <button
                            type="button"
                            onClick={() => router.visit('/admin/employee_wellness/employee_health_data/employee_acquire_medicine')}
                            className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center"
                        >
                            <MedicineBoxOutlined className='text-lg' />
                        </button>
                    </div>
                )
            }
        },
    ];

    const url = window.location.pathname + window.location.search;

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

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Employee Records</b>
                    </h2>
                </div>
            </div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={employees.data}
            />
            <div className="flex w-full items-center justify-end mt-2">
                <Pagination
                    onChange={onChangePaginate}
                    defaultCurrent={currentPage}
                    total={employees.total}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};
