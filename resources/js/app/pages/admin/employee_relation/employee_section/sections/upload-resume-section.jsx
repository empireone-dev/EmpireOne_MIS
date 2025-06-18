import { InboxOutlined } from '@ant-design/icons';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Dragger from 'antd/es/upload/Dragger';
import { message } from 'antd';
import React, { useState } from 'react';

export default function UploadResumeSection({ files, setFiles }) {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileList, setFileList] = useState([]); // ✅ Add controlled fileList

    const displayUploadedFile = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setUploadedFile(fileUrl);
        } else {
            setUploadedFile(null);
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setFiles(null);
        setFileList([]); // ✅ Clear internal Ant Design fileList
    };

    const props = {
        name: 'file',
        multiple: false,
        accept: 'application/pdf',
        method: 'GET',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        fileList: fileList, // ✅ Controlled fileList
        onChange(info) {
            let newFileList = [...info.fileList].slice(-1); // ✅ Keep only latest file
            setFileList(newFileList);

            const { status, originFileObj, name } = info.file;

            if (status === 'done') {
                if (originFileObj) {
                    setFiles(originFileObj);
                    displayUploadedFile(originFileObj);
                    message.success(`${name} file uploaded successfully.`);
                }
            } else if (status === 'error') {
                message.error(`${name} file upload failed.`);
            }
        },
        onRemove() {
            handleRemoveFile();
            return true;
        },
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-semibold mb-4 text-gray-900 mt-9">Upload CV File</h1>

            {/* Dragger Upload */}
            <Dragger {...props} className="bg-white rounded-2xl">
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag PDF file to this area to upload</p>
                <p className="ant-upload-hint text-xs text-gray-500">
                    Only PDF format is accepted. Upload your CV here.
                </p>
            </Dragger>

            {/* File Display */}
            {uploadedFile && (
                <div id="display-area" className="mt-6 mb-10">
                    <div className="flex items-center justify-end w-full bg-neutral-800 rounded-t-md">
                        <button
                            className="text-white py-1.5 px-3 rounded-t-md"
                            onClick={handleRemoveFile}
                        >
                            <XMarkIcon className="h-6" />
                        </button>
                    </div>

                    {/* Desktop/Tablet Preview */}
                    <div className="hidden sm:block w-full aspect-[8/11] sm:aspect-[8/10] lg:aspect-[8/9] rounded-b-md overflow-hidden">
                        <iframe
                            src={uploadedFile}
                            className="w-full h-full"
                            title="Uploaded PDF File"
                        />
                    </div>

                    {/* Mobile fallback view */}
                    <div className="sm:hidden w-full bg-gray-100 text-center p-4 rounded-b-md">
                        <p className="text-sm text-gray-600 mb-2">
                            Preview not supported on mobile. Tap below to open your file:
                        </p>
                        <a
                            href={uploadedFile}
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
