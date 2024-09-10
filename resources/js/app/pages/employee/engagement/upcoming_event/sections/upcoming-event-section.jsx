import React from "react";
import UpcomingEventsCardComponent from "../components/upcoming-events-card-component";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function UpcomingEventSection() {
    return (
        <div>
            <div className="rounded-lg p-3 flex flex-col">
                <div className=" flex flex-1 bg-blue-400 p-6 rounded-t-lg mb-5">
                    <h1 className="flex gap-1 text-4xl font-sans text-white w-full">
                        <CalendarDaysIcon className="h-9"/>
                        <b>Upcoming Event(s):</b> 10
                    </h1>
                    <div className="text-white text-lg w-full flex justify-center lg:justify-end">
                        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:text-blue-600">
                            <b>View all Events</b>
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex flex-1 gap-5 mt-1 mx-2">
                        <UpcomingEventsCardComponent event="The Coldest Sunset" />
                        <UpcomingEventsCardComponent event="Zumba Party" />
                        <UpcomingEventsCardComponent event="Birthday Bash" />
                        <UpcomingEventsCardComponent event="Year End Party" />
                        <UpcomingEventsCardComponent event="Christmas Party" />
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex flex-1 gap-5 mt-1 mx-2">
                        <UpcomingEventsCardComponent event="The Coldest Sunset" />
                        <UpcomingEventsCardComponent event="Zumba Party" />
                        <UpcomingEventsCardComponent event="Birthday Bash" />
                        <UpcomingEventsCardComponent event="Year End Party" />
                        <UpcomingEventsCardComponent event="Christmas Party" />
                    </div>
                </div>
            </div>
        </div>
    );
}
