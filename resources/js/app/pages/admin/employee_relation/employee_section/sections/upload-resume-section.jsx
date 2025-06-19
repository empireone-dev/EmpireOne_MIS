import { InboxOutlined } from '@ant-design/icons';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Dragger from 'antd/es/upload/Dragger';
import { message } from 'antd';
import React, { useState } from 'react';

export default function UploadResumeSection({ files = [], setFiles }) {
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
    const [fileList, setFileList] = useState([]);

    const handleRemoveFile = () => {
        setUploadedFileUrl(null);
        setFiles([]);
        setFileList([]);
    };

    const handleFiles = async (newFileList) => {
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
            });

        const newFiles = Array.from(newFileList).filter(
            (file) =>
                !files.some(
                    (existing) =>
                        existing.file.name === file.name &&
                        existing.file.size === file.size &&
                        existing.file.lastModified === file.lastModified
                )
        );

        if (newFiles.length === 0) return;

        const base64Files = await Promise.all(
            newFiles.map(async (file) => ({
                file,
                base64: await toBase64(file),
            }))
        );

        setFiles((prev) => [...prev, ...base64Files]);

        // Set preview
        const previewUrl = URL.createObjectURL(newFiles[0]);
        setUploadedFileUrl(previewUrl);
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        accept: 'application/pdf',
        method: 'GET',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status, originFileObj, name } = info.file;

            if (status === 'done') {
                message.success(`${name} uploaded successfully.`);
                if (originFileObj) {
                    handleFiles([originFileObj]);
                }
            } else if (status === 'error') {
                message.error(`${name} upload failed.`);
            }
        },
        onRemove(file) {
            setFiles((prev) => prev.filter((f) => f.file.name !== file.name));
            setUploadedFileUrl(null);
            return true;
        },
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold mb-4 text-gray-900 mt-9">Upload CV File</h1>

            <Dragger {...uploadProps} className="bg-white rounded-2xl">
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag PDF file to this area to upload</p>
                <p className="ant-upload-hint text-xs text-gray-500">
                    Only PDF format is accepted. Upload your CV here.
                </p>
            </Dragger>

            {uploadedFileUrl && (
                <div className="mt-6 mb-10">
                    <div className="flex items-center justify-end bg-neutral-800 rounded-t-md">
                        <button onClick={handleRemoveFile} className="text-white py-1.5 px-3">
                            <XMarkIcon className="h-6" />
                        </button>
                    </div>

                    <div className="hidden sm:block w-full aspect-[8/11] sm:aspect-[8/10] lg:aspect-[8/9] overflow-hidden rounded-b-md">
                        <iframe
                            src={uploadedFileUrl}
                            title="Uploaded PDF File"
                            className="w-full h-full"
                        />
                    </div>

                    <div className="sm:hidden w-full bg-gray-100 text-center p-4 rounded-b-md">
                        <p className="text-sm text-gray-600 mb-2">
                            Preview not supported on mobile. Tap below to open your file:
                        </p>
                        <a
                            href={uploadedFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold"
                        >
                            Open PDF
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
