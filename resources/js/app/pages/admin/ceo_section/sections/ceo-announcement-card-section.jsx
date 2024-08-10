import { FileImageOutlined } from '@ant-design/icons';
import { CameraIcon, DocumentTextIcon, PhotoIcon, StopCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import SanCarlosCeoAnnouncementSection from './san-carlos-ceo-announcement-section';
import CarcarCeoAnnouncementSection from './carcar-ceo-announcement-section copy';

function SanCarlosTab() {
  return (
    <div class="mx-auto ">
      <SanCarlosCeoAnnouncementSection/>
    </div>
  );
}

function CarcarTab() {
  return (
    <div class="mx-auto ">
      <CarcarCeoAnnouncementSection/>
    </div>
  );
}

export default function CeoAnnouncementCardSection() {
  const [title, setTitle] = useState('');
  const [site, setSite] = useState('');
  const [announcement, setAnnouncement] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const [activeTab, setActiveTab] = useState('SanCarlos');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 mt-6">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">CEO Announcement</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

            <div className='flex flex-1 gap-3'>
              <div className="w-full">
                <label htmlFor="username" className="text-sm font-medium leading-6 text-gray-900">Title</label>
                <div className="mt-1">
                  <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="country" className="text-sm font-medium leading-6 text-gray-900">Site</label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                  >
                    <option>Select a site to announce</option>
                    <option>San Carlos</option>
                    <option>Carcar</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="What's on your mind?"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                  ></textarea>
                  <div className="flex flex-wrap items-center mt-2">
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
              </div>

            </div>
          </div>
        </div>

        <div className=" flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className={`rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${!(title || site || announcement) && 'cursor-not-allowed opacity-50'}`}
            disabled={!title && !site && !announcement}
          >
            POST
          </button>
        </div>
      </form>

      <div className=" mt-4">
        <section>
          <div className="py-1">
            <div className="text-sm font-medium text-center border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px">
                <li className="me-2">
                  <a href="#" className={`inline-block p-4 ${activeTab === 'SanCarlos' ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => handleTabChange('SanCarlos')}>San Carlos Site</a>
                </li>
                <li className="me-2">
                  <a href="#" className={`inline-block p-4 ${activeTab === 'Carcar' ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => handleTabChange('Carcar')}>Carcar Site</a>
                </li>
              </ul>
            </div>
            {activeTab === 'SanCarlos' && <SanCarlosTab />}
            {activeTab === 'Carcar' && <CarcarTab />}
          </div>
        </section>
      </div>
    </div>
  );
}
