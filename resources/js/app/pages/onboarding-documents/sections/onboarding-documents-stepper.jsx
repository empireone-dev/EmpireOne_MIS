import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import Wysiwyg from "../../_components/wysiwyg";
import { useSelector } from "react-redux";
import { create_onboarding_ack_service, update_onboarding_ack_service } from "../../services/onboarding-ack-service";

export function OnboardingDocsStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);
    const { onboarding_docs,od } = useSelector((state) => state.onboarding_docs);
    const [agree, setAgree] = useState([]);


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

    function finish_handler(e) {
        update_onboarding_ack_service(window.location.pathname.split('/')[2])
        setOnboardingCompleted(true);
    }
    if (onboardingCompleted || od) {
        return (
            <div class="bg-cover bg-[url('/images/SCemp.jpg')] bg-center transition-colors duration-300 overflow-y-scroll h-screen p-14">
                <div className="container mx-auto items-center justify-center w-full px-6 py-9 shadow-2xl shadow-black bg-white rounded-lg">
                    <div className="flex items-center justify-center p-3 mb-6">
                        <img
                            className="w-72"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <div className="items-center justify-center text-center">
                        <h3 className="text-2xl mb-6">
                            <b>ONBOARDING - EmpireOne BPO Solutions Inc.</b>
                        </h3>
                        <h3 className="text-xl">
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
    if (!od){
        return (
            <div className="bg-cover bg-[url('/images/SCemp.jpg')]  transition-colors duration-300 overflow-y-scroll h-screen p-14">
                <div className="container mx-auto items-center justify-center w-full px-6 py-5 shadow-2xl shadow-black bg-white rounded-lg">
                    <div className="flex items-center justify-center p-3 mb-6">
                        <img
                            className="w-72"
                            src="/images/newlogo.png"
                            alt="logo"
                        />
                    </div>
                    <p className="mb-4">
                        <b>ONBOARDING</b>
                    </p>
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                        lineClassName="bg-gray-300"
                        activeLineClassName="bg-blue-600"
                    >
                        {onboarding_docs?.map((res, i) => {
                            return (
                                <Step
                                    key={i}
                                    onClick={() => {
                                        if (!isReadOnly) handleStepClick(i); 
                                    }}
                                    className="p-2 w-10 !bg-blue-gray-50 cursor-pointer items-center justify-center"
                                    activeClassName="ring-0 !bg-blue-600 text-white"
                                    completedClassName="!bg-blue-600 text-white"
                                >
                                    {i + 1}
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div className="mb-2 mt-4">
                        {onboarding_docs.map((res, i) => {
                            if (i === activeStep) {
                                return (
                                    <>
                                        <div
                                            key={i}
                                            dangerouslySetInnerHTML={{
                                                __html: res.doc_content,
                                            }}
                                        />
                                        <div className="flex items-center mb-2 mt-11 pt-4">
                                            <input
                                                onChange={agree_handler}
                                                id="default-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            <label
                                                htmlFor="default-checkbox"
                                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                <b>
                                                    I fully understand the
                                                    Attendance Policy.
                                                </b>
                                            </label>
                                        </div>
                                        <div className="mt-10 flex justify-between">
                                            <Button
                                                onClick={handlePrev}
                                                disabled={isFirstStep}
                                                className={
                                                    isFirstStep
                                                        ? "disabledPrevButton bg-blue-400"
                                                        : "bg-blue-600 hover:bg-blue-700"
                                                }
                                            >
                                                Prev
                                            </Button>
                                            {/* <Button
                                                    onClick={finish_handler}
                                                    className='bg-blue-600 hover:bg-blue-700 '
                                                >
                                                    Finish
                                                </Button> */}
                                            {isLastStep ? (
                                                <Button
                                                    disabled={
                                                        agree.length !==
                                                        onboarding_docs.length
                                                    }
                                                    onClick={finish_handler}
                                                    className={
                                                        agree.length ==
                                                            onboarding_docs.length
                                                            ? "bg-blue-600 hover:bg-blue-700 "
                                                            : "disabledNextButton bg-blue-400"
                                                    }
                                                >
                                                    Finish
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button
                                                        disabled={agree.length <= i}
                                                        onClick={handleNext}
                                                        className={
                                                            agree.length > i
                                                                ? "bg-blue-600 hover:bg-blue-700 "
                                                                : "disabledNextButton bg-blue-400"
                                                        }
                                                    >
                                                        Next
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </>
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
