import { EditFilled } from '@ant-design/icons';
import { CameraIcon, DocumentTextIcon, MegaphoneIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';

export default function AddEngagementAnnouncementSection() {
    const [announceTitle, setAnnounceTitle] = useState('');
    const [site, setSite] = useState('');
    const [announceDesc, setAnnounceDesc] = useState('');
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    return (
        <div className="my-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1"
                >
                    <MegaphoneIcon className='h-4' />
                    Create Announcement
                </button>
            </div>
            <Modal
                title="Create Announcement"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={null}
            >
                <form className="w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className='flex flex-1'>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-text">
                                    Announcement Title:
                                </label>
                                <input className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={announceTitle} onChange={(e) => setAnnounceTitle(e.target.value)} id="grid-text" type="text" placeholder="" />
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-text">
                                    Site:
                                </label>
                                <select
                                    value={site}
                                    onChange={(e) => setSite(e.target.value)}
                                    className='appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    name="site"
                                    id="site">
                                    <option></option>
                                    <option>San Carlos</option>
                                    <option>Carcar</option>
                                    <option>Both</option>
                                </select>
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-text">
                                    Date:
                                </label>
                                <input
                                    className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-text"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-text">
                                Announcement Description:
                            </label>
                            <textarea
                                className="appearance-none block w-full h-32 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={announceDesc}
                                onChange={(e) => setAnnounceDesc(e.target.value)}
                                id="grid-text"
                                placeholder=""
                            />
                        </div>
                        <div className="flex flex-wrap items-center mt-1 px-3">
                            <label htmlFor="image-upload" className="flex items-center mr-4 cursor-pointer text-gray-600 hover:text-gray-900">
                                <PhotoIcon className='h-6' />
                                <span>Upload Image</span>
                                <input id="image-upload" name="image-upload" type="file" className="sr-only" />
                            </label>
                            <label htmlFor="video-upload" className="flex mr-4  items-center cursor-pointer text-gray-600 hover:text-gray-900">
                                <CameraIcon className='h-6' />
                                <span>Upload Video</span>
                                <input id="video-upload" name="video-upload" type="file" className="sr-only" />
                            </label>
                            <label htmlFor="image-upload" className="flex items-center mr-4 cursor-pointer text-gray-600 hover:text-gray-900">
                                <DocumentTextIcon className='h-6' />
                                <span>Upload PDF File</span>
                                <input id="image-upload" name="image-upload" type="file" className="sr-only" />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end mt-3.5">
                        <button className={`rounded-md w-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${!(announceTitle || site || announceDesc) && 'cursor-not-allowed opacity-50'}`} disabled={!announceTitle && !site && !announceDesc}>
                            <EditFilled /> POST
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
