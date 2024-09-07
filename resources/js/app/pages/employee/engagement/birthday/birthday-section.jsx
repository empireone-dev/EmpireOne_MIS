import React from "react";
import BirthdayCardComponent from "./components/birthday-card-component";

export default function BirthdaySection() {
    return (
        <div>
            <div className="rounded-lg p-3 flex flex-col">
                <div className=" flex flex-1 bg-blue-400 p-6 rounded-t-lg mb-5">
                    <h1 className="text-4xl font-sans text-white w-full">
                        <b>Birthday(s) of the month of September</b>
                    </h1>
                    <div className="text-white text-lg w-full justify-end flex">
                        <button>
                            <b>View all Events</b>
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex flex-wrap gap-5 mx-2">
                        <BirthdayCardComponent name="Quickly De Guzman" />
                        <BirthdayCardComponent name="Marlou Pepito" />
                        <BirthdayCardComponent name="Alejandro Soriano II" />
                        <BirthdayCardComponent name="Alejandro Soriano II" />
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex flex-wrap gap-5 mx-2">
                        <BirthdayCardComponent name="Quickly De Guzman" />
                        <BirthdayCardComponent name="Marlou Pepito" />
                        <BirthdayCardComponent name="Alejandro Soriano II" />
                        <BirthdayCardComponent name="Alejandro Soriano II" />
                    </div>
                </div>
            </div>
        </div>
    );
}
