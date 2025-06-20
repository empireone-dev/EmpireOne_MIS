
import Modal from "@/app/pages/_components/modal";
import { delete_video_quiz_thunk, get_video_quiz_by_emp_id_thunk } from "@/app/pages/video_quiz/redux/video-quiz-thunk";
import store from "@/app/store/store";
import { TrashIcon } from "@heroicons/react/24/outline";
import { message, Tooltip } from "antd";
import React, { useState } from "react";

export default function DeleteTrainingSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const emp_id = window.location.pathname.split('/')[3]


    const deleteTraining = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_video_quiz_thunk(data.id)
            );
            store.dispatch(get_video_quiz_by_emp_id_thunk(emp_id))
            message.success("Removed Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Training. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove Training">
                <button
                    className="bg-red-400 hover:bg-red-600 text-white p-2 px-4 rounded-md"
                    onClick={openModal}
                >
                    <TrashIcon className="h-5" />
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl mb-4">
                    Are you sure you want to remove <b>{{
                        AcceptableUsePolicy: "Acceptable Use Policy",
                        AntiPhishing: "Anti-Phishing",
                        AntiSexual: "Anti-Sexual Harassment & Workplace Misconduct Policy",
                        CleanDisk: "Clean Desk and Clear Screen Policy",
                        IsmsAwareness: "ISMS Awareness Training",
                        OccupationalSafety: "Occupational Safety and Health (OSH) Policy Training",
                    }[data?.type] || data?.type}</b> training of <b>{data?.name}</b>?
                </h2>
                <form action="" onSubmit={deleteTraining}>
                    <div className="flex w-full gap-5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-red-400 p-2 w-full rounded-md text-white hover:bg-red-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-blue-400 p-2 w-full rounded-md text-white hover:bg-blue-300"
                        >

                            {
                                loading ? 'Loading...' : 'Confirm'
                            }
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
