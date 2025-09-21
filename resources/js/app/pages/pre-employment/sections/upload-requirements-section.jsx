import { FileJpgOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Modal, Button, Upload, message } from "antd";
import { useSelector } from "react-redux";
import { store_pre_employment_file_service } from "../../services/pre-employment-file-service";
import moment from "moment";
import { get_checklist_thunk } from "../../admin/hiring/pre_employment/redux/pre-employment-thunk";
import store from "@/app/store/store";
import { store_pre_employment_file_thunk } from "../redux/pre-employment-files-thunk";
import { get_applicant_by_app_id_thunk } from "../../admin/final_rate/redux/final-rate-thunk";

// File size validation constants
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// File size validation function
const validateFileSize = (file) => {
    if (!file) return { isValid: false, error: "No file provided" };

    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

    if (file.size > MAX_FILE_SIZE_BYTES) {
        return {
            isValid: false,
            error: `File size (${fileSizeMB}MB) exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB}MB`,
            sizeMB: fileSizeMB,
        };
    }

    return { isValid: true, sizeMB: fileSizeMB };
};

export default function UploadRequirementsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reqs, setReqs] = useState("");
    const { user } = useSelector((state) => state.app);
    const { checklists } = useSelector((state) => state.checklists);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const app_id = window.location.pathname.split("/")[2];
    const { applicant } = useSelector((state) => state.final_rate);
    const site = decodeURIComponent(
        window.location.pathname.split("/")[3].replace(/\+/g, " ")
    );
    const job_offer_id = window.location.pathname.split("/")[4];

    const showModal = () => {
        setIsModalOpen(true);
    };

    // The dataset containing `reqs` values to remove
    const toRemove = applicant?.requirements?.map((res) => res.reqs) ?? [];

    const filteredEntries = checklists.filter(
        (entry) => !toRemove.includes(entry.reqs)
    );

    console.log("filteredEntries", filteredEntries);

    const handleOk = async () => {
        if (!fileList[0] || !fileList[0].originFileObj) {
            message.error("Please select a file to upload");
            return;
        }

        if (!reqs) {
            message.error("Please select a requirement");
            return;
        }

        if (!app_id) {
            message.error("Application ID is missing");
            return;
        }

        // Validate file size before upload
        const validation = validateFileSize(fileList[0].originFileObj);
        if (!validation.isValid) {
            message.error(validation.error);
            return;
        }

        setLoading(true);

        // Debug logging
        console.log("Upload attempt:", {
            fileName: fileList[0].originFileObj.name,
            fileSize: fileList[0].originFileObj.size,
            fileSizeMB: (
                fileList[0].originFileObj.size /
                (1024 * 1024)
            ).toFixed(2),
            reqs: reqs,
            app_id: app_id,
            fileType: fileList[0].originFileObj.type,
        });

        const fd = new FormData();
        fd.append("file", fileList[0].originFileObj);
        fd.append("status", "Uploaded");
        fd.append("reqs", reqs);
        fd.append("created", moment().format("YYYY-MM-DD HH:mm:ss"));
        fd.append("app_id", app_id);
        fd.append("site", site);

        try {
            // Remove the status check condition - upload regardless of Antd upload status
            await store_pre_employment_file_service(fd);
            await store.dispatch(get_applicant_by_app_id_thunk(app_id));
            message.success("Uploaded successfully!");
            setIsModalOpen(false);
            setFileList([]);
            setReqs("");
        } catch (error) {
            console.error("Upload error:", error);

            // Enhanced error handling
            if (error.response) {
                const { status, data } = error.response;
                console.error("Server response:", data);

                if (status === 413) {
                    message.error(
                        "File size is too large. Maximum allowed size is 50MB."
                    );
                } else if (status === 422) {
                    // More detailed 422 error handling
                    if (data.details && data.details.file) {
                        message.error(
                            `File upload failed: ${data.details.file[0]}`
                        );
                    } else if (data.message) {
                        message.error(`Validation failed: ${data.message}`);
                    } else {
                        message.error(
                            "Validation failed. Please check your file and try again."
                        );
                    }
                } else if (status === 500) {
                    message.error(
                        "Server error occurred. Please try again or contact support."
                    );
                } else {
                    message.error(
                        data.error ||
                            data.message ||
                            "Upload failed. Please try again."
                    );
                }
            } else if (error.request) {
                message.error(
                    "Network error. Please check your connection and try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFileList([]);
        setReqs("");
    };

    return (
        <div>
            <div className="flex mt-2.5">
                <button
                    type="button"
                    id="theme-toggle"
                    onClick={showModal}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
                >
                    <FileJpgOutlined /> UPLOAD REQUIREMENTS
                </button>
            </div>
            <Modal
                confirmLoading={loading}
                title="UPLOAD REQUIREMENTS"
                open={isModalOpen}
                onOk={handleOk}
                okText="Submit"
                onCancel={handleCancel}
            >
                <div className="w-full">
                    <label
                        className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
                        for="grid-text"
                    >
                        Name of Requirements
                    </label>
                    <select
                        className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name=""
                        id=""
                        value={reqs}
                        onChange={(e) => setReqs(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select a requirement...
                        </option>
                        {filteredEntries
                            .filter((res) => !site || res?.site === site)
                            .map((res, i) => (
                                <option value={res.reqs} key={i}>
                                    {res.reqs} {!site ? ` (${res.site})` : ""}{" "}
                                    {res.remarks === "Yes" ? "*" : ""}
                                </option>
                            ))}
                    </select>
                </div>
                <Upload
                    listType="picture"
                    maxCount={1}
                    multiple={false}
                    fileList={fileList}
                    beforeUpload={(file) => {
                        const validation = validateFileSize(file);
                        if (!validation.isValid) {
                            message.error(validation.error);
                            return false;
                        }

                        // Set the file to fileList and prevent automatic upload
                        setFileList([
                            {
                                ...file,
                                uid: file.uid || Date.now().toString(),
                                name: file.name,
                                status: "done", // Set as done to show in list
                                originFileObj: file,
                            },
                        ]);

                        // Show file size info
                        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(
                            2
                        );
                        message.info(
                            `File selected: ${file.name} (${fileSizeMB}MB)`
                        );

                        return false; // Prevent automatic upload
                    }}
                    onRemove={() => {
                        setFileList([]);
                        return true;
                    }}
                    showUploadList={{
                        showPreviewIcon: true,
                        showRemoveIcon: true,
                        showDownloadIcon: false,
                    }}
                >
                    <Button type="primary" icon={<UploadOutlined />}>
                        Upload Scanned Image
                    </Button>
                </Upload>
                <div className="mt-3 text-zinc-400 text-sm">
                    <p>
                        <i>
                            Note: Requirements marked with an asterisk (*) are
                            mandatory and must be submitted or uploaded to
                            proceed to the next step of the application process.
                        </i>
                    </p>
                    <p className="mt-1">
                        <i>Maximum file size: {MAX_FILE_SIZE_MB}MB</i>
                    </p>
                </div>
            </Modal>
        </div>
    );
}
