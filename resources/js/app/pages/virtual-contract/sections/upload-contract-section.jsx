import { FilePdfOutlined } from '@ant-design/icons';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

export default function UploadContractSection() {
    const [uploadedFile, setUploadedFile] = useState(null);

    const displayUploadedFile = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setUploadedFile(fileUrl);
        } else {
            setUploadedFile(null);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        displayUploadedFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        displayUploadedFile(e.dataTransfer.files[0]);
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Upload your PDF file scanned contract here.</h1>
            <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed" onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className="grid gap-1">
                    <FilePdfOutlined className='flex items-center justify-center text-4xl' />
                    <h2 className="text-center text-gray-400 text-xs leading-4">PDF File</h2>
                </div>
                <div className="grid gap-2">
                    <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
                    <div className="flex items-center justify-center">
                        <label>
                            <input type="file" accept="application/pdf" hidden onChange={handleFileInputChange} />
                            <div className="flex w-28 h-9 px-2 flex-col bg-green-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File</div>
                        </label>
                    </div>
                </div>
            </div>
            <div>
                {uploadedFile && (
                    <div id="display-area" className='mt-4 mb-4'>
                        <div className='flex flex-1 items-center justify-end w-full bg-neutral-800 rounded-t-md'>
                            <div>
                                <button className=' rounded-t-md text-white py-1.5 px-3 items-center justify-end' onClick={handleRemoveFile}><XMarkIcon className='h-6' /></button>
                            </div>
                        </div>
                        <iframe src={uploadedFile} width="100%" height="1200px" className='rounded-b-md' title="Uploaded PDF File" />
                    </div>
                )}
            </div>
        </div>
    );
}
