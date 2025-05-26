import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';
import DeclinedSection from './declined-section';
import { get_applicant_thunk, update_applicant_after_confirmation_status_thunk } from '../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import { message } from 'antd';
import store from '@/app/store/store';

export default function ConfirmationSection() {
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const app_id = window.location.pathname.split('/')[2];
    const iffdate = window.location.pathname.split('/')[3];
    const ifftime = window.location.pathname.split('/')[4];
    const meet_link = window.location.pathname.split('/')[5];

    // Optionally, fetch applicant status on mount to check if already confirmed
    useEffect(() => {
        async function fetchStatus() {
            try {
                const response = await store.dispatch(get_applicant_thunk());
                // Assuming get_applicant_thunk returns a list or single applicant with status:
                // Adjust the logic based on your actual state shape.
                const applicant = response.payload.find(app => app.app_id === app_id);
                if (applicant && applicant.status === 'Initial Phase') {
                    setConfirmed(true);
                }
            } catch (error) {
                // handle error silently or show message
            }
        }
        fetchStatus();
    }, [app_id]);

    const submitConfirmation = async (e) => {
        e.preventDefault();
        if (confirmed) {
            message.info("You have already confirmed your attendance.");
            return;
        }
        setLoading(true);
        try {
            await store.dispatch(
                update_applicant_after_confirmation_status_thunk({
                    app_id: app_id,
                    iffdate: iffdate,
                    ifftime: ifftime,
                    meet_link: meet_link,
                    status: "Initial Phase",
                })
            );
            setConfirmed(true);
            message.success("Thank you for confirming your attendance!");
            store.dispatch(get_applicant_thunk()); // refresh state if needed
        } catch (error) {
            message.error("Failed to submit confirmation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            <div className="bg-sky-400 transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto px-32 flex items-center justify-center">
                    <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                        <div className="flex items-center justify-center p-3">
                            <img className="w-60" src="/images/newlogo.png" alt="logo" />
                        </div>
                        <div className='mb-3 mt-7'>
                            <h1 className='text-2xl text-center'><b>Will you be able to attend the scheduled Initial Interview?</b></h1>
                        </div>
                        <form onSubmit={submitConfirmation}>
                            <div className='flex gap-2 items-center justify-center'>
                                <button
                                    type="submit"
                                    disabled={loading || confirmed}
                                    className={`bg-blue-500 hover:bg-blue-600 text-white p-2 w-36 rounded-md ${confirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? <LoadingOutlined spin /> : <CheckOutlined />}
                                    {loading ? " SUBMITTING..." : confirmed ? " CONFIRMED" : " Yes"}
                                </button>
                                <DeclinedSection />
                            </div>
                        </form>
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
