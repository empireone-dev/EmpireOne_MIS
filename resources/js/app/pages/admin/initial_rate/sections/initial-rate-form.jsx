import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";
import React from "react";
import TeamworkSection from "./teamwork-section";
import ProblemSolvingSection from "./problem-solving-section";
import CustomerServiceSection from "./customer-service-section";
import GuideQuestionSection from "./guide-question-section";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setInitialRate } from "../redux/initial-rate-state";
import { store_initial_rate_thunk } from "../redux/initial-rate-thunk";
import store from "@/app/store/store";
import { useState } from "react";
import { message } from "antd";
import { router } from "@inertiajs/react";

export default function InitialRateForm({ data }) {
    const { initialRate, applicant } = useSelector(
        (state) => state.initial_rate
    );
    const app_id = window.location.pathname.split("/")[3];
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(
            setInitialRate({
                ...initialRate,
                interviewer: user?.employee_fname + " " + user?.employee_lname,
                int_id: user.id,
                app_id: app_id,
                oavg:
                    (parseInt(initialRate.tscore ?? 0) +
                        parseInt(initialRate.pscore ?? 0) +
                        parseInt(initialRate.cscore ?? 0)) /
                    3,
                interdata: applicant.inter
                //tier condition
            })
        );
    }, [
        initialRate?.tscore,
        initialRate?.pscore,
        initialRate?.cscore,
        user?.employee_fname,
    ]);
    function handleRate(e) {
        dispatch(
            setInitialRate({
                ...initialRate,
                [e.target.name]: e.target.value,
            })
        );
    }
    async function submit_initial_rate(e) {
        e.preventDefault();
        setLoading(true);
        await store.dispatch(store_initial_rate_thunk(initialRate));
        await message.success('Applicant successfully rated');
        router.visit('/admin/recruitment/applicant_records?searching=' + app_id)
        setLoading(false);
    }
    return (
        <div className="font-sans">
            <div className="flex text-xl items-center justify-center mb-1">
                <h1>
                    <b>Initial Rating Scale</b>
                </h1>
            </div>
            <form
                onSubmit={submit_initial_rate}
                className="border rounded-lg p-3.5"
            >
                <div className="flex flex-1 gap-3.5">
                    <div className="flex flex-col w-full">
                        <label htmlFor="">
                            <b>Application No.</b>
                        </label>
                        <input
                            type="number"
                            value={applicant.app_id ?? ""}
                            placeholder=""
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="">
                            <b>Applicant's Name</b>
                        </label>
                        <input
                            type="text"
                            value={
                                applicant.fname + " " + applicant.lname ?? ""
                            }
                            placeholder=""
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                </div>
                <GuideQuestionSection />
                <TeamworkSection />
                <ProblemSolvingSection />
                <CustomerServiceSection />
                <div className="flex flex-col w-full mt-3">
                    <label htmlFor="">
                        <b>OVERALL RESULT</b>
                    </label>
                    <input
                        type="number"
                        value={initialRate.oavg ?? 0}
                        name="ini_overall_r"
                        placeholder=""
                        className="border p-2 rounded w-full mt-1"
                        readOnly
                    />
                </div>
                <div className="flex flex-col w-full mt-5">
                    <label htmlFor="">
                        <b>INITIAL PHASE INTERVIEWER</b>
                    </label>
                    <input
                        type="text"
                        value={initialRate?.interviewer ?? ""}
                        placeholder=""
                        className="border p-2 rounded w-full mt-1"
                        readOnly
                    />
                </div>
                <div className="mt-5">
                    <label>
                        <b>OVERALL COMMENT</b>
                    </label>
                    <textarea
                        placeholder=""
                        name="ocomment"
                        onChange={handleRate}
                        className="border p-2 rounded w-full mt-1 h-40"
                    />
                </div>
                <div className="flex justify-end mt-3.5">
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                            }`}
                        onClick={submit_initial_rate}
                        disabled={loading}
                    >
                        {loading ? (
                            <LoadingOutlined spin />
                        ) : (
                            <CheckCircleFilled />
                        )}
                        {loading ? " SUBMITTING..." : " SUBMIT"}
                    </button>
                </div>
            </form>
        </div>
    );
}
