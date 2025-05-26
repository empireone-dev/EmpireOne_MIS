import store from "@/app/store/store";
import { message } from "antd";
import { useState } from "react";
import { get_applicant_thunk, update_applicant_after_confirmation_status_thunk } from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";

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
