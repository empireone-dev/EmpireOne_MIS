import { message } from "antd";
import { useState } from "react";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { final_update_applicant_after_confirmation_status_thunk, get_applicant_thunk } from "@/app/pages/admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
import store from "@/app/store/store";

export default function ConfirmAttendanceSection({ confirmed, setConfirmed }) {
    const [loading, setLoading] = useState(false);

    const app_id = window.location.pathname.split('/')[2];
    const iffdate = window.location.pathname.split('/')[3];
    const ifftime = window.location.pathname.split('/')[4];
    const meet_link = window.location.pathname.split('/')[5];

    const submitConfirmation = async (e) => {
        e.preventDefault();
        if (confirmed) {
            message.info("You have already confirmed your attendance.");
            return;
        }
        setLoading(true);
        try {
            await store.dispatch(
                final_update_applicant_after_confirmation_status_thunk({
                    app_id,
                    iffdate,
                    ifftime,
                    meet_link,
                    status: "Final Phase",
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

    return (
        <form onSubmit={submitConfirmation}>
            <button
                type="submit"
                disabled={loading || confirmed}
                className={`bg-blue-500 hover:bg-blue-600 text-white p-2 w-36 rounded-md ${confirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? "" : <CheckOutlined />}
                {loading ? " Submitting..." : " Yes"}
            </button>
        </form>
    );
}
