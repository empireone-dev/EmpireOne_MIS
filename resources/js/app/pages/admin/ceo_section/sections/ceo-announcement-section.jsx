import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import React from 'react'
import AddCeoAnnouncementSection from './add-ceo-announcement-section';

export default function CeoAnnouncementSection() {
    const currentDate = new Date().toDateString();
    const currentHour = new Date().getHours();
    let greeting;
    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium font-sans">
                    <b>{greeting}, CEO</b>
                </h2>
                <div className='border border-black rounded-md shadow-xl p-1.5 px-3.5 mr-6 items-center justify-center'>
                    <h2 className="text-lg font-medium flex items-center">
                        <b className="mr-1"><CalendarDaysIcon className='h-6 text-red-600' /></b>
                        <b>{currentDate}</b>
                    </h2>
                </div>
            </div>
            {/* <AddCeoAnnouncementSection /> */}
        </div>
    )
}
