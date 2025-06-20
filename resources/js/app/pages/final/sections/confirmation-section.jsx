import React, { useState } from 'react';
import DeclinedSection from './declined-section';
import ConfirmAttendanceSection from './confirm-attendance-section';

export default function ConfirmationSection() {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div className="min-h-screen bg-sky-400 overflow-auto py-6">
            <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 flex justify-center">
                <div className="bg-white shadow-2xl rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-3xl mt-10">
                    <div className="flex items-center justify-center p-3">
                        <img className="w-40 sm:w-48 md:w-60" src="/images/newlogo.png" alt="logo" />
                    </div>
                    <div className="mb-4 mt-6 text-center">
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Will you be able to attend the scheduled Final Interview?
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-4">
                        <ConfirmAttendanceSection confirmed={confirmed} setConfirmed={setConfirmed} />
                        <DeclinedSection confirmed={confirmed} setConfirmed={setConfirmed} />
                    </div>
                    {confirmed && (
                        <p className="text-center mt-6 text-green-600 font-semibold">
                            Thank you for confirming your attendance!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
