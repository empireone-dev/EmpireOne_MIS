import {
    PictureFilled,
    StopOutlined,
    DownloadOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { Image, Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import File201ApprovedSection from "./file-201-approved-section";
import File201ButtonDeclinedSection from "./file-201-button-declined-section";

export default function File201ImageSection({ data }) {
    const [open, setOpen] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const { applicant } = useSelector((state) => state.final_rate);

    const handleDownload = async () => {
        if (!data?.reqs_img) return;

        try {
            setDownloading(true);

            // Create filename with applicant's last name
            const applicantLastName = applicant?.lname || "Unknown";
            const documentName = data.reqs || "download";
            const filename = `${documentName} (${applicantLastName})`;

            // Use the proxy download endpoint to avoid CORS issues
            const downloadUrl = `/api/download-file?url=${encodeURIComponent(
                data.reqs_img
            )}&filename=${encodeURIComponent(filename)}`;

            // Create temporary link
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = filename;

            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();

            // Add a small delay to show the loading state
            setTimeout(() => {
                setDownloading(false);
            }, 3000);
        } catch (err) {
            console.error("Download failed:", err);
            setDownloading(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
            >
                <PictureFilled />
            </button>
            <Modal
                title={data.reqs}
                visible={open}
                onCancel={() => setOpen(false)}
                width={800}
                footer={null}
            >
                {data?.reqs_img ? (
                    <div className="flex flex-col items-center">
                        <Image src={data.reqs_img} />
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className={`mt-3 flex items-center gap-2 text-white font-medium rounded-lg text-base px-3 py-2 ${
                                downloading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50"
                            }`}
                        >
                            {downloading ? (
                                <LoadingOutlined />
                            ) : (
                                <DownloadOutlined />
                            )}
                            {downloading ? "Downloading..." : "Download"}
                        </button>
                    </div>
                ) : (
                    <p className="flex items-center justify-center text-gray-400 font-sans">
                        <StopOutlined />
                        &nbsp;No image available
                    </p>
                )}
                <div className="flex flex-1 gap-1.5 w-full items-center justify-center mt-3 text-white">
                    {data.status === "Uploaded" ? (
                        <>
                            <File201ApprovedSection
                                setOpen={setOpen}
                                data={data}
                            />
                            <File201ButtonDeclinedSection
                                setOpen={setOpen}
                                data={data}
                            />
                        </>
                    ) : (
                        <p className="text-center">Status: {data.status}</p>
                    )}
                </div>
            </Modal>
        </div>
    );
}
