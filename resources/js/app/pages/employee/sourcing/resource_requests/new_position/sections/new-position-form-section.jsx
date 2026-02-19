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

export default function NewPositionFormSection() {
    const [activeStep, setActiveStep] = useState(0);
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments, erfCount } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const { user } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    // console.log('job_positions',job_positions)
    // Define form data state for each step
    // const [step1FormData, setStep1FormData] = useState({ step1Field: '' });
    // const [step2FormData, setStep2FormData] = useState({ jobAnalysisDetails: '' });
    // const [step3FormData, setStep3FormData] = useState({ jobDescriptionDetails: '' });

    const [form, setForm] = useState({
        positionStatus: "New Position",
        site: user?.site || "",
        user_id: user?.id || "",
        department: "",
        account: "",
    });

    const handleNext = () => {
        if (activeStep === 0) {
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
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            jobTitle: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder=""
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 w-full gap-4 mb-4">
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Job Type</b>
                                </label>
                                <select
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            jobType: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full"
                                    name=""
                                    id=""
                                >
                                    <option selected disabled></option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Partime">Partime</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>No. of Required Personnel</b>
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            personnel: e.target.value,
                                        })
                                    }
                                    type="number"
                                    placeholder=""
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Target Onboarding Date</b>
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dateNeed: e.target.value,
                                        })
                                    }
                                    type="date"
                                    placeholder=""
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 w-full gap-4 mb-4">
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Position Status</b>
                                </label>
                                <input
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            positionStatus: e.target.value,
                                        })
                                    }
                                    type="text"
                                    value={form.positionStatus}
                                    className="border p-2 rounded w-full"
                                    readOnly
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Department</b>
                                </label>
                                <select
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            department: e.target.value,
                                        })
                                    }
                                    value={form.department || ""}
                                    className="border p-2 rounded w-full"
                                    name="department"
                                    id="department"
                                >
                                    <option value="" disabled>
                                        Select a department
                                    </option>
                                    {departments.map((res, i) => {
                                        return (
                                            <option key={i} value={res.dept}>
                                                <b>{res.dept}</b> ({res.site})
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Account</b>
                                </label>
                                <select
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            account: e.target.value,
                                        })
                                    }
                                    value={form.account || ""}
                                    className="border p-2 rounded w-full"
                                    name="account"
                                    id="account"
                                >
                                    <option value="" disabled>
                                        Select an account
                                    </option>
                                    {accounts.map((res, i) => {
                                        return (
                                            <option key={i} value={res.acc}>
                                                {res.acc}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="w-full flex flex-col">
                                <label htmlFor="">
                                    <b>Sourcing Method</b>
                                </label>
                                <select
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            sourcingMethod: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full"
                                    name=""
                                    id=""
                                >
                                    <option value="" selected disabled></option>
                                    <option value="Internal Candidates">
                                        Internal Candidates
                                    </option>
                                    <option value="External Candidates">
                                        External Candidates
                                    </option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mb-4">
                            <label htmlFor="">
                                <b>Reason or Justification of the Request</b>
                            </label>
                            <textarea
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        justification: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder=""
                                className="border h-40 p-2 rounded w-full"
                            />
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
                    className="mb-4 flex items-center gap-2 bg-gray-100 border-gray-300 hover:bg-gray-200"
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
