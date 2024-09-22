import React, { useRef, useState } from 'react';
import { FileTextFilled, PictureFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { router } from '@inertiajs/react';
import File201ButtonSection from './file-201-button-section';
import store from '@/app/store/store';
import { get_checklist_thunk } from '../../hiring/pre_employment/redux/pre-employment-thunk';
import { useEffect } from 'react';

export default function File201TableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const searchInput = useRef(null);
    const { applicant } = useSelector((state) => state.final_rate);
    console.log('applicant',applicant.requirements)

    useEffect(() => {
        store.dispatch(get_checklist_thunk())
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
                        Close
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
            title: 'Requirements',
            dataIndex: 'reqs',
            key: 'reqs',
            ...getColumnSearchProps('reqs'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record, i) => (
                <Tag color={'orange'} key={i}>
                    {record.status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <div className='flex flex-1 gap-1'>
                    <button
                        type="button"
                        onClick={() => setModalVisible(true)}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
                    >
                        <PictureFilled />
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
                    >
                        <FileTextFilled />
                    </button>
                </div>
            ),
        },
    ];

    const dataSource = applicant?.requirements??[];
    // console.log("preemploymentfile",preemploymentfile)

    return (
        <div>
            {/* Modal component */}
            <Modal
                title="(Pre Employment Requirements' Name)"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <p>Sample Image</p>
                <img src="/images/SCemp.jpg" alt="" />
                <div className='flex flex-1 gap-1 w-full items-center justify-center mt-2 text-white'>
                    <div className='flex w-full items-center justify-center'>
                        <button className='bg-green-500 w-full rounded hover:bg-green-600 p-0.5'>
                            Approved
                        </button>
                    </div>
                    <div className='flex w-full items-center justify-center'>
                        <button className='bg-red-500 w-full rounded hover:bg-red-600 p-0.5'>
                            Declined
                        </button>
                    </div>
                </div>
            </Modal>

            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        Pre-Employment Requirements of<b> {applicant?.fname??''} {applicant?.lname??''}</b>
                    </h2>
                </div>
                <div className='flex flex-1 justify-between'>
                    <File201ButtonSection />
                </div>
            </div>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    );
};
