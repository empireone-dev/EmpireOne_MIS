import React, { useState } from "react";
import CheckboxInputComponent from "../components/checkbox-input-component";
import TableRowComponent from "../components/table-row-component";
import { useDispatch, useSelector } from "react-redux";
import store from "@/app/store/store";
import { store_exit_int_thunk } from "../redux/exit-interview-thunk";
import { message, Modal } from "antd";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import { setExitInterviewForm } from "../redux/exit-interview-slice";
import ExitFactorsSection from "./exit-factors-section";
import RateJobSection from "./rate-job-section";
import RateSupWorkerSection from "./rate-sup-worker-section";
import { get_employee_by_id_thunk } from "../../admin/employee_relation/employee_section/redux/employee-section-thunk";
import { get_user_thunk } from "../../redux/app-thunk";
import ExitInterviewResultSection from "../exit_interview_result/sections/exit-interview-result-section";

export default function ExitInterviewFormSection() {
    const { exitInterviewForm } = useSelector((state) => state.exit_int);
    const dispatch = useDispatch();
    const { employee } = useSelector((state) => state.employees);
    const { user } = useSelector((state) => state.app);
    const app_id = window.location.pathname.split("/")[4];
    const emp_id = window.location.pathname.split("/")[3];
    const int_id = window.location.pathname.split("/")[2];
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const hasExistingInterview = employee?.attrition?.ext_int;

    const hasNoExistingInterview = !employee?.attrition?.ext_int;

    useEffect(
        () => {
            dispatch(
                setExitInterviewForm({
                    ...exitInterviewForm,
                    // interviewer: user?.employee_fname + " " + user?.employee_lname,
                    int_id: user.id,
                    app_id: app_id,
                    emp_id: emp_id,
                    // int_id: int_id,
                    // oavg:
                    //     (parseInt(initialRate.tscore ?? 0) +
                    //         parseInt(initialRate.pscore ?? 0) +
                    //         parseInt(initialRate.cscore ?? 0)) /
                    //     3,
                    //tier condition
                })
            );
        },
        [
            // initialRate?.tscore,
            // initialRate?.pscore,
            // initialRate?.cscore,
            // user?.employee_fname,
        ]
    );

    useEffect(() => {
        store.dispatch(get_employee_by_id_thunk(app_id));
        store.dispatch(get_user_thunk());
    }, []);

    function handleRate(e) {
        dispatch(
            setExitInterviewForm({
                ...exitInterviewForm,
                [e.target.name]: e.target.value,
            })
        );
    }

    console.log("employee", employee);

    async function submitExitInt(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(store_exit_int_thunk(exitInterviewForm));

            // Show success popup modal
            Modal.success({
                title: "Success!",
                content: "Exit Interview Successfully Recorded",
                okText: "OK",
                centered: true,
                onOk() {
                    // Hide the form after successful submission
                    setIsSubmitted(true);
                    console.log("Exit interview recorded successfully");
                },
            });
        } catch (error) {
            console.error("Error submitting exit interview:", error);
            Modal.error({
                title: "Error!",
                content: "Failed to record exit interview. Please try again.",
                okText: "OK",
                centered: true,
            });
        } finally {
            setLoading(false);
        }
    }

    // const submitExitInt = async () => {
    //     setLoading(true);
    //     try {
    //         await store.dispatch(
    //             store_exit_int_thunk({
    //                 ...form,
    //             })
    //         );
    //         // await store.dispatch(get_department_thunk());
    //         message.success("Exit Interview Successfully Recorded");
    //         router.visit('/exit_clearance?searching=' + app_id)
    //     } catch (error) {
    //         message.error("Failed to record Exit Interview. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="h-screen overflow-hidden ">
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto flex justify-center">
                    {hasNoExistingInterview && !isSubmitted && (
                        <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                            <div className="flex items-center justify-center p-3">
                                <img
                                    className="w-60"
                                    src="/images/newlogo.png"
                                    alt="logo"
                                />
                            </div>
                            <div className="flex text-2xl items-center justify-center">
                                <h1>
                                    <b>EXIT INTERVIEW</b>
                                </h1>
                            </div>
                            <form
                                className={`border rounded-lg p-3.5 ${
                                    hasExistingInterview
                                        ? "opacity-50 pointer-events-none"
                                        : ""
                                }`}
                                onSubmit={submitExitInt}
                            >
                                <div className="flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3">
                                    <div className="flex w-full">
                                        <div className="flex flex-col gap-4 mb-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>Full Name:</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={`${
                                                        employee?.applicant
                                                            ?.fname || ""
                                                    } ${
                                                        employee?.applicant
                                                            ?.mname || ""
                                                    } ${
                                                        employee?.applicant
                                                            ?.lname || ""
                                                    }`}
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>Account / Department:</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        employee?.account
                                                            ? employee?.account
                                                            : employee?.dept
                                                                  ?.dept
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>Date Hired:</b>
                                                </label>
                                                <input
                                                    type="date"
                                                    value={
                                                        employee?.hired || ""
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className=" w-full">
                                                <label htmlFor="">
                                                    <b>Immediate Supervisor:</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={`${
                                                        employee?.user
                                                            ?.employee_fname ||
                                                        ""
                                                    } ${
                                                        employee?.user
                                                            ?.employee_mname ||
                                                        ""
                                                    } ${
                                                        employee?.user
                                                            ?.employee_lname ||
                                                        ""
                                                    }`}
                                                    className="border p-2 rounded w-full "
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="">
                                                    <b>Employment Status:</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        employee?.status || ""
                                                    }
                                                    className="border p-2 rounded w-full "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full">
                                        <div className="flex flex-col gap-4 mb-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>ID Number:</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="app_id"
                                                    value={
                                                        employee?.app_id || ""
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>Position Title:</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        employee?.position || ""
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>Date Separated:</b>
                                                </label>
                                                <input
                                                    type="date"
                                                    value={
                                                        employee?.attrition
                                                            ?.separation || ""
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>Department Manager:</b>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={`${
                                                        employee?.dept?.user
                                                            ?.employee_fname ||
                                                        ""
                                                    } ${
                                                        employee?.dept?.user
                                                            ?.employee_lname ||
                                                        ""
                                                    }`}
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>
                                                        Reason for Separation::
                                                    </b>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        employee?.attrition
                                                            ?.reas || ""
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3">
                                    <div className="flex w-full">
                                        <div className="flex flex-col gap-4 mb-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>
                                                        1. Please describe the
                                                        main reason for leaving
                                                        your current position.
                                                    </b>
                                                </label>
                                                <textarea
                                                    onChange={handleRate}
                                                    // value={form?.mreas || ''}
                                                    type="text"
                                                    name="mreas"
                                                    placeholder=""
                                                    className="border p-2 h-40 rounded w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3">
                                    <div className="flex w-full">
                                        <div className="flex flex-col gap-4 mb-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <ExitFactorsSection />
                                                <label
                                                    htmlFor=""
                                                    className="mt-1"
                                                >
                                                    Others:
                                                </label>
                                                <input
                                                    onChange={handleRate}
                                                    name="factsOther"
                                                    type="text"
                                                    placeholder=""
                                                    className="border p-2 rounded w-full "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3">
                                    <div className="flex w-full">
                                        <div className="flex flex-col gap-4 mb-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>
                                                        3. Is there anything you
                                                        wish you had known
                                                        before you took the job?
                                                    </b>
                                                </label>
                                                <textarea
                                                    onChange={handleRate}
                                                    name="wish"
                                                    type="text"
                                                    placeholder=""
                                                    className="border p-2 h-40  rounded w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3">
                                    <div className="flex w-full">
                                        <div className="flex flex-col gap-4 mb-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>
                                                        4. What would you
                                                        suggest to the
                                                        management to make our
                                                        organization a better
                                                        place to work?
                                                    </b>
                                                </label>
                                                <textarea
                                                    onChange={handleRate}
                                                    name="suggest"
                                                    type="text"
                                                    placeholder=""
                                                    className="border p-2 h-40  rounded w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3">
                                    <div className="flex w-full">
                                        <div className="flex flex-col gap-4 mb-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="">
                                                    <b>
                                                        5. Do you feel you
                                                        received adequate
                                                        support to enable to do
                                                        your job?
                                                    </b>
                                                </label>
                                                <textarea
                                                    onChange={handleRate}
                                                    name="apprec"
                                                    type="text"
                                                    placeholder=""
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Instructions: Please rate the following
                                    items based on your experience work in the
                                    company.
                                </p>
                                <div className="flex flex-1 w-full gap-8 mt-1">
                                    <h1>
                                        <b>1. Very Satisfied,</b>
                                    </h1>
                                    <h1>
                                        <b>2. Satisfied,</b>
                                    </h1>
                                    <h1>
                                        <b>3. Neutral,</b>
                                    </h1>
                                    <h1>
                                        <b>4. Dissatisfied,</b>
                                    </h1>
                                    <h1>
                                        <b>5. Very Dissatisfied</b>
                                    </h1>
                                </div>
                                <RateJobSection />
                                <RateSupWorkerSection />
                                <div className="flex justify-end mt-2.5">
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 rounded text-white focus:outline-none transition-colors ${
                                            loading || hasExistingInterview
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                        disabled={
                                            loading || hasExistingInterview
                                        }
                                    >
                                        {loading
                                            ? "Submitting..."
                                            : hasExistingInterview
                                            ? "INTERVIEW COMPLETED"
                                            : "SUBMIT EXIT INTERVIEW"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {isSubmitted && (
                        <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full max-w-2xl">
                            <div className="flex items-center justify-center p-3">
                                <img
                                    className="w-60"
                                    src="/images/newlogo.png"
                                    alt="logo"
                                />
                            </div>
                            <div className="text-center py-8">
                                <div className="mb-6">
                                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                                        Thank You!
                                    </h1>
                                    <p className="text-lg text-gray-700 mb-4">
                                        Your exit interview has been successfully submitted.
                                    </p>
                                    <p className="text-md text-gray-600">
                                        We appreciate your time and valuable feedback. Your responses will help us improve our workplace for future employees.
                                    </p>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-green-800 font-medium">
                                        🎉 Exit Interview Completed Successfully
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {hasExistingInterview && (
                        <>
                            <ExitInterviewResultSection />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
