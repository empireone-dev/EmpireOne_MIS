import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import Wysiwyg from "../../_components/wysiwyg";
import { useSelector } from "react-redux";
import { create_onboarding_ack_service, update_onboarding_ack_service } from "../../services/onboarding-ack-service";
import SignaturePadSection from "./signature-pad-section";

export function OnboardingDocsStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);
    const [isSignaturePadVisible, setIsSignaturePadVisible] = useState(false);
    const { onboarding_ackdoc, job_offer } = useSelector((state) => state.onboarding_ackdocs);
    const [form, setForm] = useState({ signature: "" });
    const [agree, setAgree] = useState([]);
    const isReadOnly = false; // Add this if it's meant to control read-only mode

    console.log('job_offer', job_offer?.status)

    // Add guard clause to handle case where onboarding_ackdoc is not available
    if (!onboarding_ackdoc || !Array.isArray(onboarding_ackdoc)) {
        return (
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] bg-center transition-colors duration-300 overflow-y-scroll h-screen p-4 sm:p-8 md:p-14">
                <div className="container mx-auto items-center justify-center w-full px-4 sm:px-6 py-6 sm:py-9 shadow-2xl shadow-black bg-white rounded-lg max-w-4xl">
                    <div className="flex items-center justify-center p-3 mb-6">
                        <img
                            className="w-48 sm:w-64 md:w-72"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <div className="items-center justify-center text-center">
                        <h3 className="text-lg sm:text-xl md:text-2xl mb-6">
                            <b>Loading onboarding documents...</b>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    const handleNext = () => {
        if (!isLastStep) {
            setActiveStep((cur) => cur + 1);
        }
    };
    const handlePrev = () => {
        setAgree(agree.slice(1));
        !isFirstStep && setActiveStep((cur) => cur - 1);
    };

    const handleStepClick = (step) => setActiveStep(step);

    function agree_handler(e) {
        if (e.target.checked) {
            setAgree([...agree, "yes"]);
        } else {
            setAgree(agree.slice(1));
        }
    }

    async function finish_handler(data) {

        console.log('form', data);
        await update_onboarding_ack_service({
            ...data,
            job_offer_id: window.location.pathname.split('/')[3],
            app_id: window.location.pathname.split('/')[2],
        })
        setIsSignaturePadVisible(false);
        setOnboardingCompleted(true);
    }

    function esignature_handler(e) {
        setIsSignaturePadVisible(true);
    }

    if (job_offer?.status == "For Acknowledgment" && !onboardingCompleted && isSignaturePadVisible) {
        return (
            <SignaturePadSection
                submit={finish_handler}
                data={form}
                setForm={setForm}

            />
        );
    }
    
    if (job_offer?.status == "For Acknowledgment" && onboardingCompleted) {
        return (
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] bg-center transition-colors duration-300 overflow-y-scroll h-screen p-4 sm:p-8 md:p-14">
                <div className="container mx-auto items-center justify-center w-full px-4 sm:px-6 py-6 sm:py-9 shadow-2xl shadow-black bg-white rounded-lg max-w-4xl animate-[slideInUp_0.8s_ease-out,fadeIn_0.8s_ease-out] opacity-0 translate-y-8 [animation-fill-mode:forwards]">
                    <div className="flex items-center justify-center p-3 mb-6 animate-[fadeIn_1.2s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                        <img
                            className="w-48 sm:w-64 md:w-72"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <div className="items-center justify-center text-center px-2 animate-[fadeIn_1.2s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
                        <h3 className="text-lg sm:text-xl md:text-2xl mb-6">
                            <b>ONBOARDING - EmpireOne BPO Solutions Inc.</b>
                        </h3>
                        <h3 className="text-sm sm:text-base md:text-xl">
                            <i>
                                Thank you for cooperating and acknowledging the
                                Onboarding documents of EmpireOne BPO Solutions
                                Inc.
                            </i>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
    
    if (job_offer?.status != "For Acknowledgment") {
        return (
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] bg-center transition-colors duration-300 overflow-y-scroll h-screen p-4 sm:p-8 md:p-14">
                <div className="container mx-auto items-center justify-center w-full px-4 sm:px-6 py-6 sm:py-9 shadow-2xl shadow-black bg-white rounded-lg max-w-4xl animate-[slideInUp_0.8s_ease-out,fadeIn_0.8s_ease-out] opacity-0 translate-y-8 [animation-fill-mode:forwards]">
                    <div className="flex items-center justify-center p-3 mb-6 animate-[fadeIn_1.2s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                        <img
                            className="w-48 sm:w-64 md:w-72"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <div className="items-center justify-center text-center px-2 animate-[fadeIn_1.2s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
                        <h3 className="text-lg sm:text-xl md:text-2xl mb-6">
                            <b>ONBOARDING - EmpireOne BPO Solutions Inc.</b>
                        </h3>
                        <h3 className="text-sm sm:text-base md:text-xl">
                            <i>
                                Thank you for cooperating and acknowledging the
                                Onboarding documents of EmpireOne BPO Solutions
                                Inc.
                            </i>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    if (job_offer?.status == "For Acknowledgment" && !onboardingCompleted && !isSignaturePadVisible) {
        return (
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 overflow-y-scroll h-screen p-2 sm:p-6 md:p-14">
                <div className="container mx-auto items-center justify-center w-full px-3 sm:px-6 py-3 sm:py-5 shadow-2xl shadow-black bg-white rounded-lg max-w-6xl">
                    <div className="flex items-center justify-center p-2 sm:p-3 mb-4 sm:mb-6">
                        <img
                            className="w-40 sm:w-56 md:w-72"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                        <b>ONBOARDING DOCUMENTS</b>
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Important Reminders Before Acknowledging
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><strong>Read Carefully:</strong> Please read the entire document thoroughly before acknowledging.</li>
                                        <li><strong>Understand Terms:</strong> Ensure you fully understand all terms, conditions, and requirements outlined in this document.</li>
                                        <li><strong>Ask Questions:</strong> If you have any questions or concerns, please contact HR before proceeding.</li>
                                        <li><strong>Legal Implications:</strong> Your acknowledgment confirms that you have read, understood, and agree to comply with the document contents.</li>
                                        <li>Following the acknowledgment, you will be asked to provide your e-signature using a signature pad.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <Stepper
                            activeStep={activeStep}
                            isLastStep={(value) => setIsLastStep(value)}
                            isFirstStep={(value) => setIsFirstStep(value)}
                            lineClassName="bg-gray-300"
                            activeLineClassName="bg-blue-600"
                        >
                            {onboarding_ackdoc?.map((res, i) => {
                                return (
                                    <Step
                                        key={`step-${i}-${res.id || i}`}
                                        onClick={() => {
                                            if (!isReadOnly) handleStepClick(i);
                                        }}
                                        className="p-1 sm:p-2 w-8 sm:w-10 !bg-blue-gray-50 cursor-pointer items-center justify-center text-xs sm:text-sm"
                                        activeClassName="ring-0 !bg-blue-600 text-white"
                                        completedClassName="!bg-blue-600 text-white"
                                    >
                                        {i + 1}
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                    <div className="mb-2 mt-3 sm:mt-4">
                        {onboarding_ackdoc?.map((res, i) => {
                            if (i === activeStep) {
                                return (
                                    <div key={`content-${i}-${res.id || i}`}>
                                        {/* Important Reminders Section */}


                                        <div
                                            key={i}
                                            dangerouslySetInnerHTML={{
                                                __html: res.onboarding_doc?.doc_content,
                                            }}
                                            className="mb-4 sm:mb-7 text-sm sm:text-base overflow-x-auto"
                                        />
                                        <div className="overflow-x-auto">
                                            <Stepper
                                                activeStep={activeStep}
                                                isLastStep={(value) => setIsLastStep(value)}
                                                isFirstStep={(value) => setIsFirstStep(value)}
                                                lineClassName="bg-gray-300"
                                                activeLineClassName="bg-blue-600"
                                            >
                                                {onboarding_ackdoc?.map((res, i) => {
                                                    return (
                                                        <Step
                                                            key={`inner-step-${i}-${res.id || i}`}
                                                            onClick={() => {
                                                                if (!isReadOnly) handleStepClick(i);
                                                            }}
                                                            className="p-1 sm:p-2 w-8 sm:w-10 !bg-blue-gray-50 cursor-pointer items-center justify-center text-xs sm:text-sm"
                                                            activeClassName="ring-0 !bg-blue-600 text-white"
                                                            completedClassName="!bg-blue-600 text-white"
                                                        >
                                                            {i + 1}
                                                        </Step>
                                                    );
                                                })}
                                            </Stepper>
                                        </div>
                                        <div className="flex items-start sm:items-center mb-2 mt-6 sm:mt-11 pt-4">
                                            <input
                                                onChange={agree_handler}
                                                id="default-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 mt-1 sm:mt-0 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                                            />
                                            <label
                                                htmlFor="default-checkbox"
                                                className="ms-2 text-xs sm:text-sm font-medium text-gray-900"
                                            >
                                                <b>
                                                    I fully understand and acknowledge the document above.
                                                </b>
                                            </label>
                                        </div>
                                        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                                            <Button
                                                onClick={handlePrev}
                                                disabled={isFirstStep}
                                                className={`w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 ${isFirstStep
                                                    ? "disabledPrevButton bg-blue-400"
                                                    : "bg-blue-600 hover:bg-blue-700"
                                                    }`}
                                            >
                                                Prev
                                            </Button>
                                            {isLastStep ? (
                                                <Button
                                                    disabled={
                                                        agree.length !==
                                                        (onboarding_ackdoc?.length || 0)
                                                    }
                                                    onClick={esignature_handler}
                                                    className={`w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 ${agree.length ==
                                                        (onboarding_ackdoc?.length || 0)
                                                        ? "bg-blue-600 hover:bg-blue-700"
                                                        : "disabledNextButton bg-blue-400"
                                                        }`}
                                                >
                                                    Finish
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled={agree.length <= i}
                                                    onClick={handleNext}
                                                    className={`w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 ${agree.length > i
                                                        ? "bg-blue-600 hover:bg-blue-700"
                                                        : "disabledNextButton bg-blue-400"
                                                        }`}
                                                >
                                                    Next
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            return null; // Return null for non-matching steps
                        })}
                    </div>
                </div>
            </div>
        );
    }

}
