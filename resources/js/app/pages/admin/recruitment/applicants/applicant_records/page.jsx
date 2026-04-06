import React from "react";
import AdminLayout from "../../../admin-layout";
import ApplicantsTableSection from "./sections/applicants-table-section";
import store from "@/app/store/store";
import { useEffect } from "react";
import { get_applicant_thunk } from "./redux/applicant-thunk";
import { get_job_position_thunk } from "../../../sourcing/job_title_section/redux/job-title-thunk";
import { useState } from "react";
import Skeleton from "@/app/pages/_components/skeleton";
import { useDispatch } from "react-redux";
import ApplicantSearchSection from "./sections/applicant-search-section";
import CreateApplicantSection from "./sections/create-applicant-section";

export default function ApplicantRecords() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    useEffect(() => {
        async function loadData() {
            try {
                await store.dispatch(get_applicant_thunk());
                await store.dispatch(get_job_position_thunk());
            } catch (e) {
                console.error("Failed to load applicant data:", e);
                setLoadError(true);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);
    return (
        <AdminLayout>
            {loading ? (
                <div>
                    <Skeleton />
                </div>
            ) : loadError ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <p className="text-lg font-semibold">Failed to load applicant records.</p>
                    <p className="text-sm mt-1">Please refresh the page or contact support if the issue persists.</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            ) : (
                !loading && (
                    <>
                        <div className="flex justify-between items-center ">
                            <div className="flex items-center gap-x-3 mb-3">
                                <h2 className="text-lg font-medium text-gray-800">
                                    <b>Applicant(s) Records</b>
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-1 justify-between w-full items-start">
                            <div>
                                <ApplicantSearchSection />
                            </div>
                            {/* <div className="flex justify-end items-center mr-5">
                                <CreateApplicantSection />
                            </div> */}
                        </div>
                        <ApplicantsTableSection />
                    </>
                )
            )}
        </AdminLayout>
    );
}
