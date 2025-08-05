import React, { useRef, useState } from 'react';
import { FileTextFilled, FormOutlined, PictureFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Modal, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { router } from '@inertiajs/react';
import File201ButtonSection from './file-201-button-section';
import store from '@/app/store/store';
import { get_checklist_thunk } from '../../hiring/pre_employment/redux/pre-employment-thunk';
import { useEffect } from 'react';
import File201ImageSection from './file-201-image-section';
import File201ContractSection from './file-201-contract-section';
import ContractApprovalButtonSection from './contract-approval-button-section';
import OnboardingAcknowledgeSection from './onboarding-acknowledge-section';
import PhysicalCOntractSigning from './physical-contract-signing';
import VirtualContractSigning from './virtual-contract-signing';

export default function File201TableSection() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const searchInput = useRef(null);
    const { applicant } = useSelector((state) => state.final_rate);
    console.log('applicant', applicant)

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
                    >
                        {statusText}
                    </Tag>
                );
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <div className='flex flex-1 gap-1'>
                    {record.reqs !== 'Contract' && (
                        <Tooltip title="View Uploaded Requirements">
                            <div>
                                <File201ImageSection data={record} />
                            </div>
                        </Tooltip>
                    )}
                    {record.reqs === 'Contract' && (
                        <div className='flex w-full gap-1.5'>
                            <div>
                                <Tooltip title="View Contract"> {/* Add Tooltip here */}
                                    <div>
                                        <File201ContractSection data={record} />
                                    </div>
                                </Tooltip>
                            </div>
                            {record.status === 'Uploaded' && (
                                <Tooltip title="Contract Approval">
                                    <div>
                                        <ContractApprovalButtonSection data={record} />
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const dataSource = applicant?.requirements ?? [];
    // console.log("preemploymentfile",preemploymentfile)

    const url = window.location.pathname + window.location.search;
    function getQueryParam(url, param) {
        const queryString = url.split("?")[1]; // Get the query string
        if (!queryString) return null; // Return null if no query string

        const params = new URLSearchParams(queryString); // Create a URLSearchParams object
        return params.get(param); // Get the value of the specified parameter
    }

    // Get the search status
    const status = getQueryParam(url, "status");

    const [openChecklistModal, setOpenChecklistModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    async function send_contract_signing() {
        // Trigger any logic to send the contract signing
        setOpenConfirmationModal(true);
        setOpenChecklistModal(false);
    }
    return (
        <div>
            {/* Modal component */}

            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        201 File of<b> {applicant?.fname ?? ''} {applicant?.lname ?? ''}</b>
                    </h2>
                </div>


                <div className='flex flex-1 gap-2 justify-between'>
                    <div>
                        <File201ButtonSection data={applicant} />
                    </div>
                    <div className="w-1/8 p-4">
                        {status == "Accepted" && (
                            <OnboardingAcknowledgeSection data={applicant} setOpen={setOpenChecklistModal} />
                        )}
                        {status == "Contract Signing" && (
                            <button
                                onClick={send_contract_signing}
                                className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 w-full p-2 text-white rounded-md"
                            >
                                <FormOutlined />
                                <div>Set Contract Signing</div>
                            </button>
                        )}
                        {status == "Signed" && (
                            <div className=" text-slate-500 text-md">
                                <i>Contract signing completed.</i>
                            </div>
                        )}
                    </div>
                </div>
                <Modal
                    title={`Contract Signing for ${applicant?.fname ?? ""} ${applicant?.lname ?? ""
                        }`}
                    centered
                    open={openConfirmationModal}
                    width={650}
                    onCancel={() => setOpenConfirmationModal(false)}
                    footer={null}
                >
                    <div className="flex flex-1 gap-4 w-full mt-4">
                        <PhysicalCOntractSigning
                            setOpen={setOpenConfirmationModal}
                            data={applicant}
                        />
                        <VirtualContractSigning
                            setOpen={setOpenConfirmationModal}
                            data={applicant}
                        />
                    </div>
                </Modal>
            </div>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    );
};
