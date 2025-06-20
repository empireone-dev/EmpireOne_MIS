import React, { useState } from 'react';
import DeclinedSection from './declined-section';
import ConfirmAttendanceSection from './confirm-attendance-section';
import { useSelector } from 'react-redux';

export default function ConfirmationSection() {
    const [confirmed, setConfirmed] = useState(false);
    const { interview_confirmations } = useSelector((state) => state.applicants);

    console.log('interview_confirmations', interview_confirmations);

    return (
        <div className="min-h-screen bg-sky-400 flex justify-center items-start py-8 overflow-auto">
            <div className="bg-white shadow-2xl rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-3xl mx-4">
                <div className="flex items-center justify-center p-3">
                    <img
                        className="w-40 sm:w-48 md:w-60"
                        src="/images/newlogo.png"
                        alt="logo"
                    />
                </div>
                <div className="mb-3 mt-5 sm:mt-7 text-center">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Will you be able to attend the scheduled Initial Interview?
                    </h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-center justify-center mt-4">
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
    );
}
