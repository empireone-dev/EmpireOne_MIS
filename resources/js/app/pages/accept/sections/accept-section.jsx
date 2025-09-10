import store from "@/app/store/store";
import { message } from "antd";
import { useState, useEffect } from "react";
import {
    get_applicant_thunk,
    update_applicant_after_confirmation_status_thunk,
} from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";

export default function AcceptSection() {
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);

    const app_id = window.location.pathname.split("/")[2];
    const iffdate = window.location.pathname.split("/")[3];
    const ifftime = window.location.pathname.split("/")[4];
    const meet_link = window.location.pathname.split("/")[5];

    // Check for auto-confirm parameter
    const urlParams = new URLSearchParams(window.location.search);
    const autoConfirm = urlParams.get("auto") === "true";

    const submitConfirmation = async (e) => {
        if (e) e.preventDefault();
        if (confirmed) {
            message.info("You have already confirmed your attendance.");
            return;
        }
        setLoading(true);
        try {
            await store.dispatch(
                update_applicant_after_confirmation_status_thunk({
                    app_id,
                    iffdate,
                    ifftime,
                    meet_link,
                    status: "Initial Phase",
                })
            );
            setConfirmed(true);
            message.success("Thank you for confirming your attendance!");
            store.dispatch(get_applicant_thunk());
        } catch {
            message.error("Failed to submit confirmation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Auto-submit if auto parameter is present
    useEffect(() => {
        if (autoConfirm && !confirmed && !loading) {
            setTimeout(() => {
                submitConfirmation();
            }, 1000); // Small delay to let the page load
        }
    }, [autoConfirm, confirmed, loading]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 to-indigo-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <div className="mb-6">
                    <img
                        src="https://empireone-hris.com/images/newlogo.png"
                        alt="EmpireOne Logo"
                        className="max-w-48 mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Interview Confirmation
                    </h2>
                    {autoConfirm && !confirmed && !loading && (
                        <p className="text-blue-600 mb-4">
                            Automatically processing your confirmation...
                        </p>
                    )}
                    {autoConfirm && loading && (
                        <p className="text-blue-600 mb-4">
                            <LoadingOutlined className="mr-2" />
                            Confirming your attendance...
                        </p>
                    )}
                    {confirmed && (
                        <div className="mb-4">
                            <CheckOutlined className="text-green-500 text-3xl mb-2" />
                            <p className="text-green-600 font-semibold">
                                Attendance Confirmed Successfully!
                            </p>
                        </div>
                    )}
                    {!confirmed && !autoConfirm && (
                        <p className="text-gray-600 mb-4">
                            Please confirm your attendance for the interview.
                        </p>
                    )}
                </div>

                {!autoConfirm && (
                    <form onSubmit={submitConfirmation}>
                        <button
                            type="submit"
                            disabled={loading || confirmed}
                            className={`bg-blue-500 hover:bg-blue-600 text-white p-3 w-full rounded-md font-semibold ${
                                confirmed ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading && <LoadingOutlined className="mr-2" />}
                            {loading
                                ? "Submitting..."
                                : confirmed
                                ? "Confirmed"
                                : "Yes, I'll Attend"}
                        </button>
                    </form>
                )}

                {confirmed && (
                    <div className="mt-4 p-4 bg-green-50 rounded-md">
                        <p className="text-sm text-green-700">
                            Thank you for confirming! We look forward to meeting
                            you.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
