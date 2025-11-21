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
    useEffect(() => {
        async function loadData() {
            await store.dispatch(get_applicant_thunk());
            await store.dispatch(get_job_position_thunk());
            setLoading(false);
        }
        loadData();
    }, []);
    return (
        <AdminLayout>
            {loading ? (
                <div>
                    <Skeleton />
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
