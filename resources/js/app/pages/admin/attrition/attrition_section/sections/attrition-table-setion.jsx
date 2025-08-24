import React, { useRef, useState } from 'react';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Space, Table, Tag, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import AddAttritionSection from './add-attrition-section';
import { useSelector } from 'react-redux';
import ButtonComponents from '../components/button-components';
import store from '@/app/store/store';
import { get_employee_attrition_thunk } from '../redux/employee-attrition-thunk';
import { useEffect } from 'react';
import AttritionMenuSection from './attrition-menu-section';
import moment from 'moment';
import AttritionSearchSection from './attirition-search-section';
import { router } from '@inertiajs/react';

export default function AttritionTableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const { employee_attritions } = useSelector((state) => state.employee_attritions)
    console.log('attrition', employee_attritions)

    const url = window.location.pathname + window.location.search;

    // Re-fetch data whenever URL changes (including search parameters)
    useEffect(() => {
        store.dispatch(get_employee_attrition_thunk());
    }, [url]);

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
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
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

    // URL search parameters
    const urls = new URL(window.location.href);
    const searchParams = new URLSearchParams(urls.search);
    const pages = searchParams.get('page');
    const status = searchParams.get('status');
    const dept = searchParams.get('dept');
    const position = searchParams.get('position');
    const estatus = searchParams.get('estatus');
    const reas = searchParams.get('reas');

    function search_status(value) {
        router.visit('?page=' + pages + '&status=' + (value || 'null') + '&dept=' + dept + '&position=' + position + '&estatus=' + estatus + '&reas=' + reas)
    }

    function search_dept(value) {
        router.visit('?page=' + pages + '&status=' + status + '&dept=' + (value || 'null') + '&position=' + position + '&estatus=' + estatus + '&reas=' + reas)
    }

    function search_position(value) {
        router.visit('?page=' + pages + '&status=' + status + '&dept=' + dept + '&position=' + (value || 'null') + '&estatus=' + estatus + '&reas=' + reas)
    }

    function search_estatus(value) {
        router.visit('?page=' + pages + '&status=' + status + '&dept=' + dept + '&position=' + position + '&estatus=' + (value || 'null') + '&reas=' + reas)
    }

    function search_reas(value) {
        router.visit('?page=' + pages + '&status=' + status + '&dept=' + dept + '&position=' + position + '&estatus=' + estatus + '&reas=' + (value || 'null'))
    }

    const columns = [
        {
            title: 'Employee No.',
            dataIndex: 'emp_id',
            key: 'emp_id',
            ...getColumnSearchProps('emp_id'),
        },
        {
            title: 'Employee Name',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (_, record, i) => {
                const fullName = `${record?.applicant?.fname || ''} ${record?.applicant?.mname || ''} ${record?.applicant?.lname || ''}`.trim();
                return (
                    <div key={i}>
                        {fullName}
                    </div>
                )
            },
            onFilter: (value, record) => {
                const fullName = `${record?.applicant?.fname || ''} ${record?.applicant?.mname || ''} ${record?.applicant?.lname || ''}`.trim();
                return fullName.toLowerCase().includes(value.toLowerCase());
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                <div
                    style={{
                        padding: 8,
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        ref={searchInput}
                        placeholder="Search Employee Name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, 'fullname')}
                        style={{
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, 'fullname')}
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
                                setSearchedColumn('fullname');
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
        },
        {
            title: 'Position.',
            dataIndex: 'position',
            key: 'position',
            // ...getColumnSearchProps('position'),
        },
        {
            title: 'Department.',
            dataIndex: 'dept',
            key: 'dept',
            // ...getColumnSearchProps('dept'),
        },
        {
            title: 'Hired',
            dataIndex: 'hired',
            key: 'hired',
            render: (_, record) => {
                return (
                    <div className="gap-1.5 flex">
                        {record.hired ? moment(record.hired).format('LL') : ''}
                    </div>
                );
            },
        },
        {
            title: 'Separation',
            dataIndex: 'separation',
            key: 'separation',
            render: (_, record) => {
                return (
                    <div className="gap-1.5 flex">
                        {record.separation ? moment(record.separation).format('LL') : ''}
                    </div>
                );
            },
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
            title: <div className="flex gap-3 items-center justify-center">
                <Select
                    allowClear
                    className="w-32"
                    showSearch
                    placeholder="Reason"
                    optionFilterProp="label"
                    value={reas == 'null' ? null : reas}
                    onChange={search_reas}
                    options={[
                        { label: "Resignation", value: "Resigned" },
                        { label: "Termination", value: "Terminated" },
                        { label: "AWOL", value: "AWOL" },
                        { label: "End of Contract", value: "End of Contract" },
                        { label: "EOPE", value: "EOPE" },
                    ]}
                />
            </div>,
            dataIndex: 'reas',
            key: 'reas',
            onFilter: (value, record) => {
                if (!value) return true;
                return record.reas === value;
            },
            filteredValue: reas && reas !== 'null' ? [reas] : null,
            render: (_, record) => {
                return (
                    <Tag color="#FF0000" key={record.key}>
                        {record.reas}
                    </Tag>
                );
            },
        },
        {
            title: <div className="flex gap-3 items-center justify-center">
                <Select
                    allowClear
                    className="w-32"
                    showSearch
                    placeholder="Exit Status"
                    optionFilterProp="label"
                    value={estatus == 'null' ? null : estatus}
                    onChange={search_estatus}
                    options={[
                        { label: "Pending", value: "Pending" },
                        { label: "Cleared", value: "Cleared" },
                        { label: "Pending Clearance", value: "Pending Clearance" },
                    ]}
                />
            </div>,
            dataIndex: 'estatus',
            key: 'estatus',
            onFilter: (value, record) => {
                if (!value) return true;
                return record.estatus === value;
            },
            filteredValue: estatus && estatus !== 'null' ? [estatus] : null,
            render: (_, record) => {
                let color = '';
                let textColor = '#000'; // default text color

                switch (record.estatus) {
                    case 'Pending':
                        color = '#E1AD01';
                        textColor = '#fff';
                        break;
                    case 'Cleared':
                        color = '#52D017';
                        textColor = '#fff';
                        break;
                    case 'Pending Clearance':
                        color = '#FFFF00';   // background
                        textColor = '#000';  // black text for yellow background
                        break;
                    default:
                        color = '#d9d9d9';
                        textColor = '#000';
                }

                return (
                    <Tag
                        key={record.key}
                        style={{ backgroundColor: color, color: textColor, border: 'none' }}
                    >
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
                        {/* <ButtonComponents/> */}
                        <AttritionMenuSection data={record} />
                    </h1>
                )
            }
        },
    ];

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
    const pageSize = 10;

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
            <AttritionSearchSection />
            <Table
                pagination={false}
                columns={columns}
                dataSource={employee_attritions?.data || employee_attritions}
                scroll={{ x: 1200 }}
                size="middle"
            />
            <div className="flex">
                <div className="w-full mt-3.5">
                    {(employee_attritions?.total || employee_attritions?.length) > 0
                        ? `Showing ${(currentPage - 1) * pageSize + 1
                        } to ${Math.min(
                            currentPage * pageSize,
                            employee_attritions?.total || employee_attritions?.length
                        )} of ${employee_attritions?.total || employee_attritions?.length} entries`
                        : "No entries available"}
                </div>
                <div className="flex w-full items-center justify-end mt-2">
                    <Pagination
                        onChange={onChangePaginate}
                        defaultCurrent={currentPage}
                        total={employee_attritions?.total || employee_attritions?.length}
                        pageSize={pageSize}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>
    );
};
