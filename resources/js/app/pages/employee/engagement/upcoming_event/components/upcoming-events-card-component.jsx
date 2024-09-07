import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function UpcomingEventsCardComponent({ event }) {
    return (
        <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                {/* <img
                    class="w-full"
                    src="/img/card-top.jpg"
                    alt="Sunset in the mountains"
                /> */}
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{event}</div>
                    <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, nulla! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                    </p>
                    <div className="w-full bg-green-600 rounded-md p-1.5 text-white text-center mt-3">
                        <button className="">Rate Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
