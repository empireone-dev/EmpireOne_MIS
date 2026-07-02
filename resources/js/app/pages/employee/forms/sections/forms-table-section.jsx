import React, { useEffect, useRef, useState } from "react";
import {
    SearchOutlined,
    DownloadOutlined,
    EyeOutlined,
    FolderOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setCompanyForms, setFolders } from "../redux/company-forms-slice";
import {
    get_company_forms_service,
    get_folders_service,
} from "@/app/pages/services/company-forms-service";

export default function FormsTableSection() {
    const dispatch = useDispatch();
    const { company_forms, folders } = useSelector(
        (state) => state.company_forms,
    );

    // Search
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    // Preview
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewTitle, setPreviewTitle] = useState("");

    // Folder navigation
    const [selectedFolderId, setSelectedFolderId] = useState(null); // null = All Files

    useEffect(() => {
        Promise.all([get_company_forms_service(), get_folders_service()]).then(
            ([formsRes, foldersRes]) => {
                dispatch(setCompanyForms(formsRes.data));
                dispatch(setFolders(foldersRes.data));
            },
        );
    }, [dispatch]);

    // ---- File handlers ----
    const handleView = (record) => {
        setPreviewTitle(record.title);
        setPreviewUrl(`/api/company_form/${record.id}/view`);
    };

    const handleDownload = (record) => {
        const link = document.createElement("a");
        link.href = `/api/company_form/${record.id}/view`;
        link.download = record.file_name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ---- Search helpers ----
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
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
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
            <SearchOutlined
                style={{ color: filtered ? "#1677ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
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

    // ---- Derived data ----
    const filteredForms =
        selectedFolderId === null
            ? company_forms
            : company_forms.filter((f) => f.folder_id === selectedFolderId);

    const currentFolderName =
        selectedFolderId === null
            ? "All Files"
            : (folders.find((f) => f.id === selectedFolderId)?.name ??
              "All Files");

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
            title: "Folder",
            dataIndex: "folder_id",
            key: "folder_id",
            render: (fid) => {
                const folder = folders.find((f) => f.id === fid);
                return folder ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        <FolderOutlined />
                        {folder.name}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">—</span>
                );
            },
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
                </Space>
            ),
        },
    ];

    return (
        <div className="flex gap-4">
            {/* Folder Sidebar */}
            <div className="w-52 flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-700">
                            Folders
                        </h3>
                    </div>

                    {/* All Files */}
                    <button
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left transition-colors mb-1 ${
                            selectedFolderId === null
                                ? "bg-green-50 text-green-700 font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedFolderId(null)}
                    >
                        <FolderOpenOutlined />
                        <span>All Files</span>
                        <span className="ml-auto text-xs text-gray-400">
                            {company_forms.length}
                        </span>
                    </button>

                    {/* Folder items */}
                    {folders.map((folder) => (
                        <div
                            key={folder.id}
                            className="group flex items-center gap-1 mb-0.5"
                        >
                            <button
                                className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left transition-colors ${
                                    selectedFolderId === folder.id
                                        ? "bg-green-50 text-green-700 font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                                onClick={() => setSelectedFolderId(folder.id)}
                            >
                                <FolderOutlined />
                                <span className="truncate">{folder.name}</span>
                                <span className="ml-auto text-xs text-gray-400">
                                    {
                                        company_forms.filter(
                                            (f) => f.folder_id === folder.id,
                                        ).length
                                    }
                                </span>
                            </button>
                        </div>
                    ))}

                    {folders.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-2">
                            No folders yet
                        </p>
                    )}
                </div>
            </div>

            {/* Table panel */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>{currentFolderName}</b>
                    </h2>
                    <span className="text-sm text-gray-400">
                        {filteredForms.length} file(s)
                    </span>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredForms}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>

            {/* Preview Modal */}
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
                        title="Form Preview"
                        style={{ border: "none" }}
                    />
                )}
            </Modal>
        </div>
    );
}
