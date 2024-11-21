import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";
import React from "react";
import CustomerServiceFinalSection from "./customer-service-final-rate-section";
import WorkEffectivenessFinalRateSection from "./work-effectiveness-final-rate-section";
import { useDispatch, useSelector } from "react-redux";
import { setFinalRate } from "../redux/final-rate-slice";
import store from "@/app/store/store";
import { store_final_rate_thunk } from "../redux/final-rate-thunk";
import { useState } from "react";
import { useEffect } from "react";
import { message } from "antd";
import { router } from "@inertiajs/react";

export default function FinalRateFormSection() {
    const { finalRate, applicant } = useSelector((state) => state.final_rate);
    const app_id = window.location.pathname.split("/")[3];
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(
            setFinalRate({
                ...finalRate,
                interviewer: user?.employee_fname + " " + user?.employee_lname,
                int_id: user.id,
                app_id: app_id,
                oavg:
                    (parseInt(finalRate.cscore ?? 0) +
                        parseInt(finalRate.wscore ?? 0)) /
                    2,
                //tier condition
            })
        );
    }, [finalRate?.cscore, finalRate?.wscore, user?.employee_fname]);
    function handleRate(e) {
        dispatch(
            setFinalRate({
                ...finalRate,
                [e.target.name]: e.target.value,
            })
        );
    }

    async function submit_final_rate(e) {
        e.preventDefault();
        setLoading(true);
        await store.dispatch(store_final_rate_thunk(finalRate));
        await message.success("Successfully Rated!");
        setLoading(false);
        router.visit('/admin/recruitment/applicant_records?searching=' + app_id)
    }

    console.log(finalRate, "finalRate");

    return (
        <div className="font-sans">
            <div className="flex text-xl items-center justify-center mb-1">
                <h1>
                    <b>Final Rating Scale</b>
                </h1>
            </div>
            <div className="flex flex-1 justify-end pr-4">
                <h1 className="text-lg mb-2 bg-ge">
                    <b>Status:</b>
                </h1>{" "}
                <h1 className="bg-green-500 text-lg rounded-md p-1 text-white ml-1">
                    {applicant.status}
                </h1>
            </div>
            <form
                className="border rounded-lg p-3.5"
                onSubmit={submit_final_rate}
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
                <CustomerServiceFinalSection />
                <WorkEffectivenessFinalRateSection />
                {/* <div className="flex items-center mb-5 mt-3 gap-1">
                    <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-black rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <h1>
                        <b>Mark as Tier Shark</b>
                    </h1>
                </div> */}
                <div className="flex flex-col w-full mt-3">
                    <label htmlFor="">
                        <b>OVERALL RESULT</b>
                    </label>
                    <input
                        type="number"
                        value={finalRate.oavg ?? 0}
                        name="final_overall_r"
                        placeholder=""
                        className="border p-2 rounded w-full mt-1"
                        readOnly
                    />
                </div>
                <div className="flex flex-col w-full mt-5">
                    <label htmlFor="">
                        <b>FINAL PHASE INTERVIEWER</b>
                    </label>
                    <input
                        type="text"
                        value={finalRate?.interviewer ?? ""}
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
                        onClick={submit_final_rate}
                        disabled={loading}
                    >
                        {loading ? (
                            <LoadingOutlined spin />
                        ) : (
                            <CheckCircleFilled />
                        )}
                        {loading ? " Loading..." : " CONFIRM"}
                    </button>
                </div>
            </form>
        </div>
    );
}
