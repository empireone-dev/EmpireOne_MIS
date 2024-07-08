import React from 'react'
import { useState } from 'react';
import CalendarTabSection from './calendar-tab-section';
import BothSiteTabSection from './both-site-tab-section';
import TableTabSection from './table-tab-section';

function CalendarTab() {
  return (
    <div class="lg:flex lg:h-full lg:flex-col">
        <CalendarTabSection/>
      </div>
  );
}

function TableTab() {
  return (
    <div class="mx-auto ">
      <TableTabSection/>
    </div>
  );
}

function BothTab() {
  return (
    <div class="mx-auto ">
      <BothSiteTabSection/>
    </div>
  );
}

export default function EngagementCalendarSection() {
  const [activeTab, setActiveTab] = useState('SanCarlos');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200  ">
        <ul class="flex flex-wrap -mb-px">

          <li class="me-2">
            <a href="#" className={`inline-block p-4 ${activeTab === 'Calendar' ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => handleTabChange('Calendar')}>Calendar View</a>
          </li>
          <li class="me-2">
            <a href="#" className={`inline-block p-4 ${activeTab === 'Table' ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => handleTabChange('Table')}>Table View</a>
          </li>
          <li class="me-2">
            <a href="#" className={`inline-block p-4 ${activeTab === 'Both' ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => handleTabChange('Both')}>Both Site Calendar</a>
          </li>
        </ul>
      </div>
      {activeTab === 'Calendar' && <CalendarTab />}
      {activeTab === 'Table' && <TableTab />}
      {activeTab === 'Both' && <BothTab />}
    </div>
  )
}
