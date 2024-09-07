import React from "react";

export default function BirthdayCardComponent({ name }) {
    return (
        <div>
            <div class="flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500 border border-blue-500 rounded-lg shadow md:flex-row">
                <img
                    class="object-cover rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg bg-white"
                    src="/images/male.png"
                    alt=""
                />
                <div class="flex flex-col justify-between p-4 leading-normal text-white">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight ">
                        {name}
                    </h5>
                    <p class="mb-3 font-bold">September 23</p>
                </div>
            </div>
        </div>
    );
}
