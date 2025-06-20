import store from "@/app/store/store";
import { useState } from "react";
import {
    declined_attendance_thunk,
    get_applicant_thunk,
} from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
import { message } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../../_components/modal";

export default function DeclinedSection({ confirmed, setConfirmed }) {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [reschedDecision, setReschedDecision] = useState(null); // YES or NO

    const app_id = window.location.pathname.split("/")[2];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
            closeModal();
        } catch {
            message.error("Failed to submit your response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                disabled={confirmed}
                className={`bg-red-500 hover:bg-red-600 text-white p-2 w-36 rounded-md ${confirmed ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                <XMarkIcon className="h-5 w-5 inline-block text-white mr-1" />
                No
            </button>

            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="max-w-lg">
                <div className="text-base">
                    <h2 className="text-lg font-semibold mb-4">
                        Kindly provide your reason for declining the Final interview
                        invitation.
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
                                Would you be open to being scheduled for another Final
                                interview?
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="resched"
                                        value="yes"
                                        checked={reschedDecision === "yes"}
                                        onChange={() => setReschedDecision("yes")}
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="resched"
                                        value="no"
                                        checked={reschedDecision === "no"}
                                        onChange={() => setReschedDecision("no")}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="p-2 px-4 rounded-md hover:text-blue-500"
                            >
                                Cancel
                            </button>
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
            </Modal>
        </>
    );
}
