import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCompanyForm } from "../redux/company-forms-slice";
import { upload_company_form_service } from "@/app/pages/services/company-forms-service";

export default function UploadFormSection({ open, onClose }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const resetForm = () => {
        setFile(null);
        setTitle("");
        setDescription("");
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleFileSelect = (selected) => {
        if (!selected || selected.type !== "application/pdf") {
            message.error("Only PDF files are accepted.");
            return;
        }
        setFile(selected);
    };

    const handleInputChange = (e) => handleFileSelect(e.target.files[0]);

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            message.error("Please select a PDF file.");
            return;
        }
        if (!title.trim()) {
            message.error("Please enter a title.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title.trim());
        formData.append("description", description.trim());

        setLoading(true);
        try {
            const res = await upload_company_form_service(formData);
            dispatch(addCompanyForm(res.data));
            message.success("Form uploaded successfully.");
            resetForm();
            onClose();
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.errors?.file?.[0] ||
                "Upload failed. Please try again.";
            message.error(msg);
        } finally {
            setLoading(false);
        }
    };

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
                {/* Drop zone */}
                <div
                    className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <div className="grid gap-1">
                        <FilePdfOutlined className="flex items-center justify-center text-4xl" />
                        <h2 className="text-center text-gray-400 text-xs leading-4">
                            PDF File only
                        </h2>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
                            Drag and Drop your file here or
                        </h4>
                        <div className="flex items-center justify-center">
                            <div className="flex w-28 h-9 px-2 flex-col bg-green-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center">
                                Choose File
                            </div>
                        </div>
                        {file && (
                            <p className="text-center text-green-700 text-xs font-medium">
                                {file.name}
                            </p>
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={handleInputChange}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Leave Request Form"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional description..."
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex h-9 px-5 flex-col bg-green-600 rounded-full shadow text-white text-sm font-semibold items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Uploading..." : "Upload Form"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

