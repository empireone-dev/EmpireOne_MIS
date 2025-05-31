import React, { useState } from 'react';
import DeclinedSection from './declined-section';
import ConfirmAttendanceSection from './confirm-attendance-section';

export default function ConfirmationSection() {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div className="h-screen overflow-hidden">
            <div className="bg-sky-400 transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto px-32 flex items-center justify-center">
                    <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                        <div className="flex items-center justify-center p-3">
                            <img className="w-60" src="/images/newlogo.png" alt="logo" />
                        </div>
                        <div className="mb-3 mt-7">
                            <h1 className="text-2xl text-center font-bold">
                                Will you be able to attend the scheduled Final Interview?
                            </h1>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <ConfirmAttendanceSection confirmed={confirmed} setConfirmed={setConfirmed} />
                            <DeclinedSection confirmed={confirmed} setConfirmed={setConfirmed} />
                        </div>
                        {confirmed && (
                            <p className="text-center mt-4 text-green-600 font-semibold">
                                Thank you for confirming your attendance!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
