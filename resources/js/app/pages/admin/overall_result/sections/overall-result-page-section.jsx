    import React, { useState } from 'react';
import InitialPhaseResultSection from './initial-phase-result-section';
import FinalPhaseResultSection from './final-phase-result-section';
import { useSelector } from 'react-redux';

function InitialPhaseTab() {
    return (
        <div class="mx-auto ">
            <InitialPhaseResultSection/>
        </div>
    );
}

function FinalPhaseTab() {
    return (
        <div class="mx-auto ">
           <FinalPhaseResultSection/>
        </div>
    );
}

export default function OverallResultPageSection() {
    const [activeTab, setActiveTab] = useState('InitialPhase'); 
  
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='font-sans'>
            <section>
                <div className="">
                    <div className="text-sm font-medium text-center border-b border-gray-200">
                        <ul className="flex flex-wrap -mb-px">
                            <li className="me-2">
                                <a href="#" className={`inline-block p-4 ${activeTab === 'InitialPhase' ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => handleTabChange('InitialPhase')}>Initial Phase Result</a>
                            </li>
                            <li className="me-2">
                                <a href="#" className={`inline-block p-4 ${activeTab === 'FinalPhase' ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'}`} onClick={() => handleTabChange('FinalPhase')}>Final Phase Result</a>
                            </li>
                        </ul>
                    </div>
                    {activeTab === 'InitialPhase' && <InitialPhaseTab />}
                    {activeTab === 'FinalPhase' && <FinalPhaseTab />}
                </div>
            </section>
        </div>
    );
}
