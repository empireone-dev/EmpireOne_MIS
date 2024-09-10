import { CakeIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function BirthdayCardComponent({ name, image, bdate }) {
    return (
        <div className="flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500 border border-blue-500 rounded-lg shadow md:flex-row md:max-w-2xl">
            <img
                className="object-cover rounded-t-lg h-48 w-full md:h-48 md:w-44 md:rounded-none md:rounded-l-lg bg-white"
                src={image}
            />
            <div className="flex flex-col justify-between p-4 leading-normal text-white w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight">
                    {name}
                </h5>
                <p className="flex items-center gap-1 mb-3 font-semibold text-lg">
                    <CakeIcon className="h-5 w-5" />
                    {bdate}
                </p>
            </div>
        </div>
    );
}
