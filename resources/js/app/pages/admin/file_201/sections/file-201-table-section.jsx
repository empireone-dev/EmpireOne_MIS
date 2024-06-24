import React, { useRef, useState } from 'react';
import { FileTextFilled, PictureFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { router } from '@inertiajs/react';
import File201ButtonSection from './file-201-button-section';

export default function File201TableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const searchInput = useRef(null);
    const { joboffers } = useSelector((state) => state.joboffers)

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
            dataIndex: 'name',
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

    const dataSource = [
        {
            key: '1',
            name: 'Barangay Clearance with the purpose of bank application',
            status: 'Approved',
        },
        {
            key: '2',
            name: 'Birth Certificate',
            status: 'Approved',
        },
        {
            key: '3',
            name: 'Contract',
            status: 'Uploaded',
        },
    ];

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
            </Modal>

            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        Pre-Employment Requirements of:<b> <u>Sarah Sample</u></b>
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
