import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import AddAttritionSection from './add-attrition-section';
import { useSelector } from 'react-redux';
import ButtonComponents from '../components/button-components';
import store from '@/app/store/store';
import { get_employee_thunk } from '../../../employee_relation/employee_section/redux/employee-section-thunk';
import { useEffect } from 'react';
import AttritionMenuSection from './attrition-menu-section';

export default function AttritionTableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const { employee_attritions } = useSelector((state) => state.employee_attritions)
    console.log('attrition', employee_attritions)

    useEffect(() => {
        store.dispatch(get_employee_thunk())
    }, []);
    
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
            title: 'Employee Name',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname'),
            render: (_, record, i) => {
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
            title: 'Hired',
            dataIndex: 'dept',
            key: 'dept',
            ...getColumnSearchProps('dept'),
        },
        {
            title: 'Separation',
            dataIndex: 'dept',
            key: 'dept',
            ...getColumnSearchProps('dept'),
        },
        {
            title: 'Employment Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                let color = '';
                switch (record.status) {
                    case 'Probationary':
                        color = '#52D017';
                        break;
                    case 'Regular':
                        color = '#43BFC7';
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
            title: 'Exit Clearance Status',
            dataIndex: 'estatus',
            key: 'estatus',
            render: (_, record) => {
                let color = '';
                switch (record.estatus) {
                    case 'Pending':
                        color = '#E1AD01';
                        break;
                    case 'Cleared':
                        color = '#52D017';
                        break;
                }
                return (
                    <Tag color={color} key={record.key}>
                        {record.estatus}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <h1>
                        <ButtonComponents/>
                        {/* <AttritionMenuSection data={record}/> */}
                    </h1>
                )
            }
        },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Employee Attrition Records</b>
                    </h2>
                </div>
            </div>
            <AddAttritionSection />
            <Table columns={columns} dataSource={employee_attritions} />;
        </div>
    );
};
