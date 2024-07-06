import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import React from 'react'
import AddEngagementAnnouncementSection from './add-engagement-announcement-section';

export default function EngagementAnnouncementSection() {
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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">
                    <b>{greeting}, Sarah Bangbang</b>
                </h2>
                <h2 className="text-lg font-medium mr-6 flex items-center">
                    <b className="mr-1"><CalendarDaysIcon className='h-6' /></b>
                    <b>{currentDate}</b>
                </h2>
            </div>
            <AddEngagementAnnouncementSection/>
        </div>
    )
}
