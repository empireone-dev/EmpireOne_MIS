import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined, DownloadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Space, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setCompanyForms, removeCompanyForm } from "../redux/company-forms-slice";
import { delete_company_form_service, get_company_forms_service } from "@/app/pages/services/company-forms-service";

export default function FormsTableSection() {
    const dispatch = useDispatch();
    const { company_forms } = useSelector((state) => state.company_forms);

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewTitle, setPreviewTitle] = useState("");
    const searchInput = useRef(null);

    useEffect(() => {
        get_company_forms_service().then((res) => {
            dispatch(setCompanyForms(res.data));
        });
    }, [dispatch]);

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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) setTimeout(() => searchInput.current?.select(), 100);
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const handleView = (record) => {
        setPreviewTitle(record.title);
        setPreviewUrl(`/storage/${record.file_path}`);
    };

    const handleDownload = (record) => {
        const link = document.createElement("a");
        link.href = `/storage/${record.file_path}`;
        link.download = record.file_name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (id) => {
        try {
            await delete_company_form_service(id);
            dispatch(removeCompanyForm(id));
            message.success("Form deleted.");
        } catch {
            message.error("Failed to delete form.");
        }
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps("title"),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description"),
            render: (text) => text || "—",
        },
        {
            title: "File",
            dataIndex: "file_name",
            key: "file_name",
            render: (text) => (
                <span className="text-xs text-gray-600">{text}</span>
            ),
        },
        {
            title: "Uploaded",
            dataIndex: "created_at",
            key: "created_at",
            render: (_, record) => moment(record.created_at).format("LLL"),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="small">
                    <Button
                    className="p-2 rounded-md"
                        size="small"
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                    >
                        View
                    </Button>
                    <Button
                        className="p-2 rounded-md"
                        size="small"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(record)}
                    >
                        Download
                    </Button>
                    <Popconfirm
                        title="Delete this form?"
                        description="This action cannot be undone."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="p-2 rounded-md" size="small" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center gap-x-3 mb-4">
                <h2 className="text-lg font-medium text-gray-800">
                    <b>Company Forms</b>
                </h2>
            </div>

            <Table
                columns={columns}
                dataSource={company_forms}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                open={!!previewUrl}
                title={previewTitle}
                onCancel={() => setPreviewUrl(null)}
                footer={[
                    <Button key="close" onClick={() => setPreviewUrl(null)}>
                        Close
                    </Button>,
                ]}
                width="80%"
                styles={{ body: { padding: 0 } }}
                destroyOnClose
            >
                {previewUrl && (
                    <iframe
                        src={previewUrl}
                        width="100%"
                        height="700px"
                        title="Form PDF Preview"
                        style={{ border: "none" }}
                    />
                )}
            </Modal>
        </div>
    );
}

