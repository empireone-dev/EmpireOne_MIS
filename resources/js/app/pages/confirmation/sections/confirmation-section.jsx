import React, { useState } from "react";
import DeclinedSection from "./declined-section";
import ConfirmAttendanceSection from "./confirm-attendance-section";
import { useSelector } from "react-redux";
import store from "@/app/store/store";
import { message } from "antd";
import {
    declined_attendance_thunk,
    get_applicant_thunk,
} from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";

export default function ConfirmationSection() {
    const [reason, setReason] = useState("");
    const [reschedDecision, setReschedDecision] = useState(null); // YES or NO
    const [loading, setLoading] = useState(false);

    const app_id = window.location.pathname.split("/")[2];
    const [confirmed, setConfirmed] = useState(false);
    const { interview_confirmations } = useSelector(
        (state) => state.applicants
    );
    const submitDecline = async (e) => {
        e.preventDefault();

        if (confirmed) {
            message.info("You have already confirmed your attendance.");
            return;
        }

        if (!reason.trim()) {
            message.error("Please provide a reason for declining.");
            return;
        }

        if (reschedDecision === null) {
            message.error("Please indicate if you’re open to rescheduling.");
            return;
        }

        setLoading(true);
        try {
            await store.dispatch(
                declined_attendance_thunk({
                    app_id,
                    reason,
                    reschedule: reschedDecision === "yes" ? "Yes" : "No",
                })
            );

            store.dispatch(get_applicant_thunk());
            setConfirmed(true);
            message.success("Your response has been submitted. Thank you.");
        } catch {
            message.error("Failed to submit your response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    console.log("interview_confirmations", interview_confirmations);

    return (
        <div className="min-h-screen bg-sky-400 flex justify-center items-center py-8 overflow-auto">
            <div className="bg-white  shadow-2xl rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-3xl mx-4 mb-28">
                <div className="flex items-center justify-center p-3">
                    <img
                        className="w-40 sm:w-48 md:w-60"
                        src="/images/newlogo.png"
                        alt="logo"
                    />
                </div>
                {confirmed && (
                    <p className="text-center mt-4 text-2xl text-green-600 font-semibold">
                        Thank you for the confirmation!
                    </p>
                )}
                {!confirmed && (
                    <div width="max-w-lg">
                        <div className="text-base">
                            <h2 className="text-lg font-semibold mb-4">
                                Kindly provide your reason for declining the
                                Initial interview invitation.
                            </h2>
                            <form onSubmit={submitDecline}>
                                <textarea
                                    value={reason}
                                    name="reason"
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                    className="w-full h-24 p-2 border rounded-md resize-none"
                                    placeholder="Your reason..."
                                />

                                <div className="mt-5">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Would you be open to being scheduled for
                                        another Initial interview?
                                    </h2>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="resched"
                                                value="yes"
                                                checked={
                                                    reschedDecision === "yes"
                                                }
                                                onChange={() =>
                                                    setReschedDecision("yes")
                                                }
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="resched"
                                                value="no"
                                                checked={
                                                    reschedDecision === "no"
                                                }
                                                onChange={() =>
                                                    setReschedDecision("no")
                                                }
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-blue-500 p-2 px-4 rounded-md text-white hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
