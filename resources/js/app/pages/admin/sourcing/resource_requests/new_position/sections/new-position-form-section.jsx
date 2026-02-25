import React, { useEffect, useState } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Wysiwyg from "@/app/pages/_components/wysiwyg";
import App from "@/app/pages/_components/summernote-editor";
import App2 from "@/app/pages/_components/summernote-editor2";
import store from "@/app/store/store";
import { create_outsourcing_erf_thunk } from "../../erf_record/redux/erf-record-thunk";
import { useSelector } from "react-redux";
import moment from "moment";
import { router } from "@inertiajs/react";
import axios from "axios";

export default function NewPositionFormSection() {
    const [activeStep, setActiveStep] = useState(0);
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments, erfCount } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const { user } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    // console.log('job_positions',job_positions)
    // Define form data state for each step
    // const [step1FormData, setStep1FormData] = useState({ step1Field: '' });
    // const [step2FormData, setStep2FormData] = useState({ jobAnalysisDetails: '' });
    // const [step3FormData, setStep3FormData] = useState({ jobDescriptionDetails: '' });

    const [form, setForm] = useState({
        positionStatus: "",
        site: user?.site || "",
        department: "",
        account: "",
    });

    const handleNext = () => {
        if (activeStep === 0) {
            // Validate form before proceeding to next step
            const newErrors = {};

            if (!form.jobTitle || form.jobTitle.trim() === "") {
                newErrors.jobTitle = "Please enter a job title.";
            }

            if (!form.jobType) {
                newErrors.jobType = "Please select a job type.";
            }

            if (!form.personnel) {
                newErrors.personnel =
                    "Please enter the number of required personnel.";
            }

            if (!form.dateNeed) {
                newErrors.dateNeed = "Please select a target onboarding date.";
            }

            if (!form.positionStatus) {
                newErrors.positionStatus = "Please select a position status.";
            }

            if (!form.department) {
                newErrors.department = "Please select a department.";
            }

            if (!form.account) {
                newErrors.account = "Please select an account.";
            }

            if (!form.sourcingMethod) {
                newErrors.sourcingMethod = "Please select a sourcing method.";
            }

            if (!form.justification || form.justification.trim() === "") {
                newErrors.justification =
                    "Please provide a reason or justification for the request.";
            }

            // If there are errors, set them and return
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                // Show first error message
                const firstError = Object.values(newErrors)[0];
                message.error(firstError);
                return;
            }

            // Clear errors and proceed
            setErrors({});
            setActiveStep(1);
        } else if (activeStep === 1) {
            setActiveStep(2);
        }
    };
    const generateUniqueAppId = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");
        const datePart = `${month}${day}${year}`;

        const seq = (applicationCount + erfCount).toString().padStart(2, "0"); // Ensuring two-digit sequence
        return `${datePart}${seq}`;
    };
    useEffect(() => {
        setForm({
            ...form,
            ref_id: generateUniqueAppId(),
        });
    }, [erfCount]);

    useEffect(() => {
        if (user?.id) {
            setForm((prevForm) => ({
                ...prevForm,
                user_id: user.id,
                site: user.site || "",
            }));
        }
    }, [user]);

    const handlePrev = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    async function submit_new_erf(params) {
        setLoading(true);
        try {
            await store.dispatch(
                create_outsourcing_erf_thunk({
                    submitted: moment().format("YYYY-MM-DD"),
                    user_id: user?.id,
                    site: user?.site || "",
                    ...form,
                    // ...user,
                }),
            );
            message.success("Successfully Added!");
            setTimeout(() => {
                setLoading(false);
                router.visit("/admin/sourcing/resource_requests/erf_record");
            }, 2000);
        } catch (error) {
            setLoading(false);
        }
    }

    const [applicationCount, setApplicationCount] = useState(0); // State to hold count of submissions

    useEffect(() => {
        // Fetch the count of today's submissions when the component mounts
        const fetchApplicationCount = async () => {
            try {
                const response = await axios.get("/api/applications/today"); // Replace with your API endpoint
                setApplicationCount(response.data.count); // Assuming the API returns { count: <number> }
            } catch (error) {
                console.error("Error fetching application count:", error);
            }
        };
        fetchApplicationCount();
    }, []);

    const renderFormByStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <form>
                        <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-6 text-center">
                            EMPLOYEE REQUISITION FORM
                        </h1>
                        <h1 className="text-lg">
                            <b>Instructions/Hiring Information</b>
                        </h1>
                        <p>
                            &emsp;&emsp;Use this form to initiate the
                            recruitment process for all new and existing staff.
                            Please complete all applicable sections of this
                            form.{" "}
                            <b>
                                NO OFFERS should be made, either verbally or in
                                written form, before all approvals on the form
                                are completed
                            </b>
                            .
                        </p>
                        <input
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    site: e.target.value,
                                })
                            }
                            value={form?.site ?? ""}
                            type="hidden"
                            className="border p-2 rounded w-full"
                        />
                        <div className="flex flex-1 w-full gap-4 mb-4 mt-4">
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Reference No.</b>
                                </label>
                                <input
                                    type="text"
                                    value={form?.ref_id ?? ""}
                                    className="border p-2 rounded w-full"
                                    readOnly
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Job Title</b>
                                </label>
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            jobTitle: e.target.value,
                                        });
                                        if (errors.jobTitle) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                jobTitle: "",
                                            }));
                                        }
                                    }}
                                    type="text"
                                    placeholder=""
                                    className={`border p-2 rounded w-full ${errors.jobTitle ? "border-red-500" : ""}`}
                                    value={form.jobTitle || ""}
                                    required
                                />
                                {errors.jobTitle && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.jobTitle}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-1 w-full gap-4 mb-4">
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Job Type</b>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            jobType: e.target.value,
                                        });
                                        if (errors.jobType) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                jobType: "",
                                            }));
                                        }
                                    }}
                                    className={`border p-2 rounded w-full ${errors.jobType ? "border-red-500" : ""}`}
                                    name=""
                                    id=""
                                    value={form.jobType || ""}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a job type
                                    </option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Partime">Partime</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Others">Others</option>
                                </select>
                                {errors.jobType && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.jobType}
                                    </span>
                                )}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>No. of Required Personnel</b>
                                </label>
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            personnel: e.target.value,
                                        });
                                        if (errors.personnel) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                personnel: "",
                                            }));
                                        }
                                    }}
                                    type="number"
                                    placeholder=""
                                    className={`border p-2 rounded w-full ${errors.personnel ? "border-red-500" : ""}`}
                                    value={form.personnel || ""}
                                    required
                                />
                                {errors.personnel && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.personnel}
                                    </span>
                                )}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Target Onboarding Date</b>
                                </label>
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            dateNeed: e.target.value,
                                        });
                                        if (errors.dateNeed) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                dateNeed: "",
                                            }));
                                        }
                                    }}
                                    type="date"
                                    placeholder=""
                                    className={`border p-2 rounded w-full ${errors.dateNeed ? "border-red-500" : ""}`}
                                    value={form.dateNeed || ""}
                                    required
                                />
                                {errors.dateNeed && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.dateNeed}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-1 w-full gap-4 mb-4">
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Position Status</b>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            positionStatus: e.target.value,
                                        });
                                        if (errors.positionStatus) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                positionStatus: "",
                                            }));
                                        }
                                    }}
                                    value={form.positionStatus || ""}
                                    className={`border p-2 rounded w-full ${errors.positionStatus ? "border-red-500" : ""}`}
                                    required
                                >
                                    <option value="" disabled>
                                        Select position status
                                    </option>
                                    <option value="Replacement (due to resignation/termination/personnel movement)">
                                        Replacement (due to
                                        resignation/termination/personnel
                                        movement)
                                    </option>
                                    <option value="Additional manpower">
                                        Additional manpower
                                    </option>
                                    <option value="New Role">New Role</option>
                                    <option value=" Internal Job Posting">
                                        Internal Job Posting
                                    </option>
                                </select>
                                {errors.positionStatus && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.positionStatus}
                                    </span>
                                )}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Department</b>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            department: e.target.value,
                                        });
                                        if (errors.department) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                department: "",
                                            }));
                                        }
                                    }}
                                    value={form.department || ""}
                                    className={`border p-2 rounded w-full ${errors.department ? "border-red-500" : ""}`}
                                    name="department"
                                    id="department"
                                    required
                                >
                                    <option value="" disabled>
                                        Select a department
                                    </option>
                                    {departments.map((res, i) => {
                                        return (
                                            <option key={i} value={res.dept}>
                                                <b>{res.dept}</b>
                                                {res.site
                                                    ? ` (${res.site})`
                                                    : ""}
                                            </option>
                                        );
                                    })}
                                </select>
                                {errors.department && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.department}
                                    </span>
                                )}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Account</b>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            account: e.target.value,
                                        });
                                        if (errors.account) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                account: "",
                                            }));
                                        }
                                    }}
                                    value={form.account || ""}
                                    className={`border p-2 rounded w-full ${errors.account ? "border-red-500" : ""}`}
                                    name="account"
                                    id="account"
                                    required
                                >
                                    <option value="" disabled>
                                        Select an account
                                    </option>
                                    {[...accounts]
                                        .sort((a, b) =>
                                            a.acc.localeCompare(b.acc),
                                        )
                                        .map((res, i) => {
                                            return (
                                                <option key={i} value={res.acc}>
                                                    {res.acc}
                                                </option>
                                            );
                                        })}
                                </select>
                                {errors.account && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.account}
                                    </span>
                                )}
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Sourcing Method</b>
                                </label>
                                <select
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            sourcingMethod: e.target.value,
                                        });
                                        if (errors.sourcingMethod) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                sourcingMethod: "",
                                            }));
                                        }
                                    }}
                                    className={`border p-2 rounded w-full ${errors.sourcingMethod ? "border-red-500" : ""}`}
                                    name=""
                                    id=""
                                    value={form.sourcingMethod || ""}
                                    required
                                >
                                    <option value="" disabled>
                                        Select a sourcing method
                                    </option>
                                    <option value="Internal Candidates">
                                        Internal Candidates
                                    </option>
                                    <option value="External Candidates">
                                        External Candidates
                                    </option>
                                    <option value="Both">Both</option>
                                </select>
                                {errors.sourcingMethod && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.sourcingMethod}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label htmlFor="">
                                <b>Reason or Justification of the Request</b>
                            </label>
                            <textarea
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        justification: e.target.value,
                                    });
                                    if (errors.justification) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            justification: "",
                                        }));
                                    }
                                }}
                                type="text"
                                placeholder=""
                                className={`border h-40 p-2 rounded w-full ${errors.justification ? "border-red-500" : ""}`}
                                value={form.justification || ""}
                                required
                            />
                            {errors.justification && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.justification}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-1 w-full gap-4 mb-4">
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Manager Submitting Request</b>
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            submitted: e.target.value,
                                        })
                                    }
                                    type="text"
                                    value={`${user?.employee_fname || ""} ${user?.employee_lname || ""}`}
                                    className="border p-2 rounded w-full"
                                    readOnly
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Budget/Cost per head:</b>
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            budgetCost: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder=""
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>
                        <div className="mt-218 flex justify-between">
                            <Button
                                onClick={handlePrev}
                                disabled={activeStep === 0}
                                className="bg-blue-400 text-white w-32"
                            >
                                Prev
                            </Button>
                            <Button
                                onClick={handleNext}
                                className="bg-blue-600 hover:bg-blue-700 text-white w-32"
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                );
            case 1:
                return (
                    <form>
                        <div>
                            {/* <Wysiwyg
                                label="Job Analysis Details"
                                name="wysiwyg"
                                value={step2FormData.jobAnalysisDetails}
                                onChange={handleStep2FormChange}
                            /> */}
                            <App form={form} setForm={setForm} />
                        </div>
                        <div className="mt-20 flex justify-between">
                            <Button
                                onClick={handlePrev}
                                className="bg-blue-600 hover:bg-blue-500 text-white w-32"
                            >
                                Prev
                            </Button>
                            <Button
                                onClick={handleNext}
                                className="bg-blue-600 hover:bg-blue-700 text-white w-32"
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                );
            case 2:
                return (
                    <form>
                        <div>
                            {/* <Wysiwyg
                                label="Job Description Details"
                                name="wysiwyg"
                                value={step3FormData.jobDescriptionDetails}
                                onChange={handleStep3FormChange}
                            /> */}
                            <App2 form={form} setForm={setForm} />
                        </div>
                        <div className="mt-20 flex justify-between">
                            <Button
                                onClick={handlePrev}
                                className="bg-blue-600 hover:bg-blue-500 text-white w-32"
                            >
                                Prev
                            </Button>
                            <Button
                                loading={loading}
                                onClick={submit_new_erf}
                                className="bg-blue-600 hover:bg-blue-700 text-white w-32"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            {/* Back Button */}
            <div className="pt-4 pb-2">
                <Button
                    onClick={handleGoBack}
                    icon={<ArrowLeftOutlined />}
                    className="mb-4 flex items-center gap-2 bg-gray-100  hover:bg-gray-200"
                >
                    Back
                </Button>
            </div>

            <div className="px-8 w-full pt-4 pb-12">
                <div className="relative px-4">
                    <Stepper
                        activeStep={activeStep}
                        lineClassName="bg-gray-300"
                        activeLineClassName="bg-blue-600"
                    >
                        <Step
                            className="h-6 w-6 !bg-gray-300 relative"
                            activeClassName="ring-0 !bg-blue-600 text-white"
                            completedClassName="!bg-blue-600 text-white"
                        >
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-max text-center">
                                <Typography
                                    variant="small"
                                    className="font-medium text-gray-600"
                                >
                                    Employee Requisition
                                </Typography>
                            </div>
                        </Step>
                        <Step
                            className="h-6 w-6 !bg-gray-300 relative"
                            activeClassName="ring-0 !bg-blue-600 text-white"
                            completedClassName="!bg-blue-600 text-white"
                        >
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-max text-center">
                                <Typography
                                    variant="small"
                                    className="font-medium text-gray-600"
                                >
                                    Job Analysis
                                </Typography>
                            </div>
                        </Step>
                        <Step
                            className="h-6 w-6 !bg-gray-300 relative"
                            activeClassName="ring-0 !bg-blue-600 text-white"
                            completedClassName="!bg-blue-600 text-white"
                        >
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-max text-center">
                                <Typography
                                    variant="small"
                                    className="font-medium text-gray-600"
                                >
                                    Job Description
                                </Typography>
                            </div>
                        </Step>
                    </Stepper>
                </div>
                <div className="mt-20">{renderFormByStep()}</div>
            </div>
        </div>
    );
}
