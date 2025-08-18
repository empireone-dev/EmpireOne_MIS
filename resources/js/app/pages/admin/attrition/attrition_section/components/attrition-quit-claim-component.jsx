import { InboxOutlined } from '@ant-design/icons';
import { Menu, message, Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react'
import { upload_exit_clearance_thunk } from '../redux/employee-attrition-thunk';
import store from '@/app/store/store';

export default function AttritionQuitClaimComponent({ data, item }) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    function openHandler(params) {
        setStatusModalOpen(true);
    }

    const handleFiles = async (fileList) => {
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
            });

        const fileArray = Array.from(fileList);

        // Remove files that already exist in state
        const newUniqueFiles = fileArray.filter(
            (file) =>
                !files.some(
                    (existing) =>
                        existing.file.name === file.name &&
                        existing.file.size === file.size &&
                        existing.file.lastModified === file.lastModified
                )
        );

        const base64Files = await Promise.all(
            newUniqueFiles.map(async (file) => ({
                file,
                files: await toBase64(file),
            }))
        );

        setFiles((prevFiles) => [...prevFiles, ...base64Files]);
    };

    const props = {
        name: "file",
        multiple: true, // Changed to true to allow multiple files
        // accept: "application/pdf",
        showUploadList: true,
        beforeUpload() {
            return false; // Prevent automatic upload
        },
        onChange(info) {
            const { fileList } = info;
            // Handle files when they are added
            const newFiles = fileList
                .map((file) => file.originFileObj || file)
                .filter(Boolean);
            handleFiles(newFiles);
        },
        onRemove(file) {
            setFiles((prevFiles) =>
                prevFiles.filter((f) => f.file.name !== file.name)
            );
            return true; // allow UI to remove it too
        },

        // onDrop(e) {
        //     console.log("Dropped files", e.dataTransfer.files);
        // },
    };

    const handleCancel = () => {
        setStatusModalOpen(false);
    };

    async function handleUpload() {
        try {
            setLoading(true); // Set loading before starting the submission

            // Extract just the base64 strings from the files array
            const base64FilesArray = files.map(fileObj => fileObj.files);

            console.log('Files to upload:', base64FilesArray);
            console.log('Sample base64 string:', base64FilesArray[0]?.substring(0, 50));

            await store.dispatch(
                upload_exit_clearance_thunk({
                    files: base64FilesArray,
                    app_id: data?.applicant?.app_id,
                    emp_id: data?.emp_id,
                })
            );
            message.success("Email Sent Successfully!");
            setStatusModalOpen(false); // Close modal on success
        } catch (error) {
            console.error('Upload error:', error);
            message.error("Failed to send email. Please try again.");
        } finally {
            setLoading(false); // Reset loading after submission
        }
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <Modal
                title="Send Quit Claim"
                centered
                visible={statusModalOpen}
                onOk={() => setStatusModalOpen(false)}
                onCancel={() => setStatusModalOpen(false)}
                width={1000}
                footer={null}
            >
                <form class="w-full h-full">
                    <div class="flex flex-col -mx-3 mb-2">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Employee No.
                            </label>
                            <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.emp_id} readOnly />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Employee's Name
                            </label>
                            <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={`${data?.applicant?.fname} ${data?.applicant?.mname} ${data?.applicant?.lname}`} readOnly />

                        </div>


                        <div className='flex flex-1 '>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    job Position
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.position} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Department
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.dept} readOnly />
                            </div>
                            {/* <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.account} readOnly />
                            </div> */}
                        </div>

                        <div className='flex flex-1'>
                            {/* <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Supervisor
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.sup_id} readOnly />
                            </div> */}
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    EOGS Email
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" value={data?.eogs} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Employment Status
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" value={data?.status} readOnly />
                            </div>
                        </div>

                        <div className='flex flex-1'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Hired Date
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.hired} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Separation Date
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.separation} readOnly />
                            </div>
                        </div>

                        <div className='flex flex-1'>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Reason for Separation
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.reas} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Reason for End of Contract
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.reas} readOnly />
                            </div>
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Exit Interview & Clearance Status
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.estatus} readOnly />
                            </div>
                        </div>
                        <div className="space-y-2 px-3">
                            <label className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                Quit Claim
                            </label>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload Quit Claim
                                </p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload.
                                </p>
                            </Dragger>
                        </div>
                        <div className="flex justify-end space-x-2 px-3 mt-1">
                            <button type='button' onClick={handleCancel} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                                Cancel
                            </button>
                            <button
                                type='submit'
                                loading={loading}
                                disabled={loading || files.length === 0}
                                onClick={handleUpload} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Send
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
