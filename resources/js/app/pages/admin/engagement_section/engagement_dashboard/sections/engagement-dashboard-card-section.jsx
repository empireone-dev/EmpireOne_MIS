import React, { useState } from 'react';
import SanCarlosEngagementDaashboardSection from './san-carlos-engagement-dashboard-section';
import CarcarEngagementDashboardSection from './carcar-engagement-dashboard-section';

function SanCarlosTab() {
    return (
        <div class="mx-auto ">
            <SanCarlosEngagementDaashboardSection />
        </div>
    );
}

function CarcarTab() {
    return (
        <div class="mx-auto ">
            <CarcarEngagementDashboardSection />
        </div>
    );
}

export default function EngagementDashboardCardSection() {
    const [activeTab, setActiveTab] = useState('SanCarlos');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
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
                    <div className={`transition-opacity duration-500 ease-in-out ${activeTab === 'SanCarlos' ? 'opacity-100' : 'opacity-0'}`}>
                        {activeTab === 'SanCarlos' && <SanCarlosTab />}
                    </div>

                    <div className={`transition-opacity duration-500 ease-in-out ${activeTab === 'Carcar' ? 'opacity-100' : 'opacity-0'}`}>
                        {activeTab === 'Carcar' && <CarcarTab />}
                    </div>
                </div>
            </section>
        </div>
    );
}
