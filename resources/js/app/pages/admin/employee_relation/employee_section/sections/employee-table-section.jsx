import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import DropdownButton from '../components/button-components';
import ButtonComponents from '../components/button-components';

export default function EmployeeTableSection() {
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
            emp_id: 32,
            position: 'HR Manager',
            fullname: 'John Brown',
            dept: 'Human Resource',
            eogs: 'dawdwa@gmail.com',
            status: 'Regular',
            contact: '09123456789',
        },
        {
            key: '2',
            emp_id: 32,
            position: 'HR Manager',
            fullname: 'John Brown',
            dept: 'Human Resource',
            eogs: 'dawdwa@gmail.com',
            status: 'Regular',
            contact: '09123456789',
        },
        {
            key: '3',
            emp_id: 32,
            position: 'HR Manager',
            fullname: 'John Brown',
            dept: 'Human Resource',
            eogs: 'dawdwa@gmail.com',
            status: 'Regular',
            contact: '09123456789',
        },
        {
            key: '4',
            emp_id: 32,
            position: 'HR Manager',
            fullname: 'John Brown',
            dept: 'Human Resource',
            eogs: 'dawdwa@gmail.com',
            status: 'Regular',
            contact: '09123456789',
        },
    ];
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
                    <ButtonComponents/>
                )
            }
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};
