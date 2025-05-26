import store from "@/app/store/store";
import { useState } from "react";
import { declined_attendance_thunk, get_applicant_thunk } from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
import { message } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../../_components/modal";

export default function DeclinedSection({ confirmed, setConfirmed }) {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reason, setReason] = useState('');
    const app_id = window.location.pathname.split('/')[2];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const submitDecline = async (e) => {
        e.preventDefault();

        if (confirmed) {
            message.info('You have already confirmed your attendance.');
            return;
        }

        if (!reason.trim()) {
            message.error('Please provide a reason for declining.');
            return;
        }

        setLoading(true);
        try {
            await store.dispatch(
                declined_attendance_thunk({
                    app_id,
                    reason,
                })
            );

            store.dispatch(get_applicant_thunk());
            setConfirmed(true); // Disable buttons and show confirmation
            message.success('Your reason for declining has been submitted. Thank you.');
            closeModal();
        } catch {
            message.error('Failed to submit your response. Please try again.');
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
                className={`bg-red-500 hover:bg-red-600 text-white p-2 w-36 rounded-md ${confirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <XMarkIcon className="h-5 w-5 inline-block text-white mr-1" />
                No
            </button>

            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="w-20 mx-96">
                <h2 className="text-xl font-semibold mb-4">
                    Kindly provide your reason for declining the interview invitation.
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
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="p-2 px-4 rounded-md hover:text-blue-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 p-2 px-4 rounded-md text-white hover:bg-blue-400"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
