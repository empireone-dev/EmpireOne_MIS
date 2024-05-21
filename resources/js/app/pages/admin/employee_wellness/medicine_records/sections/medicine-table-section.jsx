import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import ButtonComponents from "../components/button-components";
import AddMedicineSection from "./add-medicine-section";

export default function MedicineTableSection() {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
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
            key: "1",
            meds: 'Biogesic',
            med_type: 'Paracetamol', 
            med_desc: "Explain how your experience and skills align with the job and contribute to the company.",
        },
        {
            key: "2",
            meds: 'Cetirizine',
            med_type: 'Anti-hestamine	', 
            med_desc: "Used in the treatment of allergic rhinitis and urticaria",
        },
        {
            key: "3",
            meds: 'Biogesic',
            med_type: 'Paracetamol', 
            med_desc: "Explain how your experience and skills align with the job and contribute to the company.",
        },
        {
            key: "4",
            meds: 'Biogesic',
            med_type: 'Paracetamol', 
            med_desc: "Explain how your experience and skills align with the job and contribute to the company.",
        },
    ];
    const columns = [
        {
            title: "Medicine",
            dataIndex: "meds",
            key: "meds",
            ...getColumnSearchProps("meds"),
        },
        {
            title: "Medicine Type",
            dataIndex: "med_type",
            key: "med_type",
            ...getColumnSearchProps("med_type"),
        },
        {
            title: "Medicine Description",
            dataIndex: "med_desc",
            key: "med_desc",
            ...getColumnSearchProps("med_desc"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <ButtonComponents/>
                );
            },
        },
    ];

    return (
        <div>
            <div>
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>Medicine Records</b>
                    </h2>
                </div>
            </div>
            <AddMedicineSection/>
            <Table columns={columns} dataSource={data} />;
        </div>
    );
}
