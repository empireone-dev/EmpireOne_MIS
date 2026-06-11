import {
    FilePdfOutlined,
    FileExcelOutlined,
    FileWordOutlined,
    FileImageOutlined,
    FileOutlined,
} from "@ant-design/icons";

import { Button, Modal, Select, message } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyForms } from "../redux/company-forms-slice";
import {
    get_company_forms_service,
    upload_company_form_service,
} from "@/app/pages/services/company-forms-service";

export default function UploadFormSection({ open, onClose }) {
    const dispatch = useDispatch();
    const { folders } = useSelector((state) => state.company_forms);

    const inputRef = useRef(null);

    const [state, setState] = useState({
        file: null,
        title: "",
        description: "",
        folderId: null,
        loading: false,
    });

    const ACCEPTED_TYPES = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
    ];

    const MAX_SIZE = 100 * 1024 * 1024; // 100MB

    const resetForm = () => {
        setState({
            file: null,
            title: "",
            description: "",
            folderId: null,
            loading: false,
        });

        if (inputRef.current) inputRef.current.value = "";
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const getFileIcon = (file) => {
        if (!file) return <FileOutlined className="text-4xl" />;

        const type = file.type;

        if (type === "application/pdf")
            return <FilePdfOutlined className="text-4xl text-red-500" />;

        if (type.includes("excel") || type.includes("spreadsheet"))
            return <FileExcelOutlined className="text-4xl text-green-600" />;

        if (type.includes("word"))
            return <FileWordOutlined className="text-4xl text-blue-600" />;

        if (type.startsWith("image/"))
            return <FileImageOutlined className="text-4xl text-purple-500" />;

        return <FileOutlined className="text-4xl" />;
    };

    const validateFile = (file) => {
        if (!file) return "No file selected.";

        if (!ACCEPTED_TYPES.includes(file.type)) {
            return "Invalid file type. Please upload PDF, Excel, Word, PNG, or JPG.";
        }

        if (file.size > MAX_SIZE) {
            return "File exceeds 100MB limit.";
        }

        return null;
    };

    const handleFile = (file) => {
        const error = validateFile(file);
        if (error) {
            message.error(error);
            return;
        }

        setState((prev) => ({ ...prev, file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { file, title, description, folderId } = state;

        if (!file) return message.error("Please select a file.");
        if (!title.trim()) return message.error("Title is required.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title.trim());
        formData.append("description", description.trim());

        if (folderId) formData.append("folder_id", folderId);

        try {
            setState((prev) => ({ ...prev, loading: true }));

            await upload_company_form_service(formData);

            const res = await get_company_forms_service();
            dispatch(setCompanyForms(res.data));

            message.success("Form uploaded successfully.");
            handleClose();
        } catch (err) {
            message.error(
                err?.response?.data?.message ||
                    "Upload failed. Please try again.",
            );
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const { file, title, description, folderId, loading } = state;

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            title="Upload Company Form"
            footer={null}
            width={600}
            destroyOnClose
        >
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* DROPZONE */}
                <div
                    className="w-full py-9 bg-gray-50 rounded-2xl border border-dashed border-gray-300 cursor-pointer grid gap-3"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFile(e.dataTransfer.files[0]);
                    }}
                >
                    <div className="flex flex-col items-center">
                        {getFileIcon(file)}
                        <p className="text-xs text-gray-400 mt-2">
                            PDF, Excel, Word, PNG, JPG (Max 100MB)
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-medium">
                            Drag & drop or click to upload
                        </p>

                        {file && (
                            <p className="text-green-600 text-xs mt-1">
                                {file.name}
                            </p>
                        )}
                    </div>

                    <input
                        ref={inputRef}
                        type="file"
                        hidden
                        accept={ACCEPTED_TYPES.join(",")}
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                </div>

                {/* TITLE */}
                <input
                    value={title}
                    onChange={(e) =>
                        setState((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Title"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                {/* DESCRIPTION */}
                <textarea
                    value={description}
                    onChange={(e) =>
                        setState((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Description (optional)"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    rows={3}
                />

                {/* FOLDER */}
                <Select
                    allowClear
                    className="w-full"
                    placeholder="Select folder"
                    value={folderId}
                    onChange={(val) =>
                        setState((p) => ({ ...p, folderId: val }))
                    }
                    options={folders.map((f) => ({
                        label: f.name,
                        value: f.id,
                    }))}
                />

                {/* ACTIONS */}
                <div className="flex justify-end gap-2">
                    <Button onClick={handleClose}>Cancel</Button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-5 h-9 rounded-full disabled:opacity-60"
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
