import React from "react";
import BirthdayCardComponent from "./components/birthday-card-component";
import { CakeIcon } from "@heroicons/react/24/outline";

export default function BirthdaySection() {
    return (
        <div>
            <div className="rounded-lg p-3 flex flex-col">
                {/* Header */}
                <div className="flex flex-col lg:flex-row items-center bg-blue-400 p-6 rounded-t-lg mb-5">
                    <h1 className=" flex gap-1 text-3xl lg:text-4xl font-sans text-white w-full text-center lg:text-left mb-4 lg:mb-0">
                        <CakeIcon className="h-9"/>
                        <b>Birthday(s) of the month of September</b>
                    </h1>
                </div>

                {/* Birthday Card Section */}
                <div className="mb-6">
                    {/* Grid layout for responsive cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-2">
                        <BirthdayCardComponent name="Quickly De Guzman" image="/images/male.png" bdate="September 13" />
                        <BirthdayCardComponent name="Marlou Pepito" image="/images/ITlogo.png" bdate="September 23" />
                        <BirthdayCardComponent name="Sample Name" image="/images/ITlogo.png" bdate="September 25" />
                        <BirthdayCardComponent name="Mateo Bangbang" image="/images/male.png" bdate="September 30" />
                    </div>
                </div>

                {/* Another Birthday Card Section */}
                <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-2">
                        <BirthdayCardComponent name="Quickly De Guzman" bdate="September 23" />
                        <BirthdayCardComponent name="Marlou Pepito" bdate="September 23"/>
                        <BirthdayCardComponent name="Alejandro Soriano II" bdate="September 23"/>
                        <BirthdayCardComponent name="Mateo Bangbang" bdate="September 23"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
