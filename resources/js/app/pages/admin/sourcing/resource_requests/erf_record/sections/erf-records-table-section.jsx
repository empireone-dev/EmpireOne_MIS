import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import ButtonComponents from '../components/button-components';
import ErfDropdownFilterComponents from '@/app/pages/admin/sourcing/resource_requests/erf_record/components/erf-dropdown-filter-components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AddPositionButtonSection from './add-position-button-section';

export default function ErfRecordsTableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const { erf_records } = useSelector((state) => state.erf_records);

    const filterData = (selectedStatus) => {
        if (selectedStatus.length === 0) {
            setFilteredData(erf_records);
        } else {
            const filtered = erf_records.filter(record => selectedStatus.includes(record.status));
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        const storedData = localStorage.getItem('filteredData');
        if (storedData) {
            setFilteredData(JSON.parse(storedData));
        } else {
            filterData([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('filteredData', JSON.stringify(filteredData));
    }, [filteredData]);

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

    const columns = [
        {
            title: 'Ref #',
            dataIndex: 'id',
            key: 'emp_id',
            ...getColumnSearchProps('emp_id'),
        },
        {
            title: 'Requesting Manager',
            dataIndex: 'fullname',
            key: 'fullname',
            ...getColumnSearchProps('fullname'),
            render: (_, record, i) => {
                console.log('record', record)

                return (
                    <div key={i}>
                        {record.user?.employee_fname} {record.user?.employee_lname}
                    </div>
                )
            }
        },
        {
            title: 'Job Title',
            dataIndex: 'jobTitle',
            key: 'position',
            ...getColumnSearchProps('position'),
        },
        {
            title: 'Job Type',
            dataIndex: 'jobType',
            key: 'dept',
            ...getColumnSearchProps('dept'),
        },
        {
            title: 'Position Status',
            dataIndex: 'positionStatus',
            key: 'eogs',
            ...getColumnSearchProps('eogs'),
        },
        {
            title: 'Date Needed',
            dataIndex: 'dateNeed',
            key: 'contact',
            ...getColumnSearchProps('contact'),
        },
        {
            title: 'Budget/Cost',
            dataIndex: 'budgetCost',
            key: 'eogs',
            ...getColumnSearchProps('eogs'),
        },
        {
            title: 'Date Submitted',
            dataIndex: 'submitted',
            key: 'eogs',
            ...getColumnSearchProps('eogs'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record, i) => {
                console.log('record', record)

                return (
                    <Tag
                        color={
                            record.status == 'Approved' ? 'green' :
                                record.status == 'Pending' ? 'orange' :
                                    record.status == 'Declined' ? 'red' :
                                        record.status == 'In Review' ? 'blue' :
                                            'blue'
                        }
                        key={i}
                    >
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
                    <ButtonComponents />
                )
            }
        },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Employee Section</b>
                    </h2>
                </div>
                <div className='flex flex-1 justify-between'>
                    <AddPositionButtonSection />
                    <div className='mr-8'>
                        <ErfDropdownFilterComponents filterData={filterData} />
                    </div>
                </div>

            </div>
            <Table columns={columns} dataSource={filteredData} className='mt-1' />
        </div>
    );
}
