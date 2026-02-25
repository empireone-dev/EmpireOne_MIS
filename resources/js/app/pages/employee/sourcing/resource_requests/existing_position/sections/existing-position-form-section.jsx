import store from "@/app/store/store";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { create_outsourcing_erf_thunk } from "../../erf_record/redux/erf-record-thunk";
import moment from "moment";
import axios from "axios";
import { message, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ExistingPositionFormSection() {
    const { job_positions } = useSelector((state) => state.job_positions);
    const { erfCount } = useSelector((state) => state.departments);
    const { user } = useSelector((state) => state.app);
    const { users } = useSelector((state) => state.app);
    const { accounts } = useSelector((state) => state.accounts);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        department: "",
        account: "",
        budgetCost: "",
        jobTitle: "",
        jobType: "",
        personnel: "",
        dateNeed: "",
        positionStatus: "",
        sourcingMethod: "",
        justification: "",
        reviewer: "",
        site: user?.site || "",
        user_id: user?.id || "",
        requestor_name: `${user?.employee_fname || ""} ${user?.employee_lname || ""}`,
    });

    const [applicationCount, setApplicationCount] = useState(0);
    const [reqs, setReqs] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchApplicationCount = async () => {
            try {
                const response = await axios.get("/api/applications/today");
                setApplicationCount(response.data.count);
            } catch (error) {
                console.error("Error fetching application count:", error);
            }
        };
        fetchApplicationCount();
    }, []);

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            ref_id: generateUniqueAppId(),
        }));
    }, [erfCount]);

    useEffect(() => {
        if (user?.id) {
            setForm((prevForm) => ({
                ...prevForm,
                user_id: user.id,
                site: user.site || "",
                requestor_name: `${user.employee_fname || ""} ${user.employee_lname || ""}`,
            }));
        }
    }, [user]);

    const generateUniqueAppId = () => {
        const today = new Date();
        const datePart = moment(today).format("MMDDYYYY");
        const seq = (applicationCount + erfCount).toString().padStart(2, "0");
        return `${datePart}${seq}`;
    };

    const handleJobTitleChange = (e) => {
        const selectedJobTitle = e.target.value;
        const selectedJob = job_positions.find(
            (job) => job.jPosition === selectedJobTitle,
        );

        // Clear error when user selects a value
        if (errors.jobTitle) {
            setErrors((prev) => ({ ...prev, jobTitle: "" }));
        }

        if (selectedJob) {
            setForm((prevForm) => ({
                ...prevForm,
                department: selectedJob.outsourcing_erf.department,
                budgetCost: selectedJob.salary,
                jobTitle: selectedJobTitle,
                // Auto-populate account from job position if available, otherwise keep existing
                account:
                    selectedJob.outsourcing_erf?.account || prevForm.account,
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                department: "",
                budgetCost: "",
                jobTitle: selectedJobTitle,
                // Keep existing account selection when no job is found
                account: prevForm.account,
            }));
        }
        setReqs(selectedJobTitle);
    };

    const handleAccountChange = (e) => {
        const selectedAccount = e.target.value;
        console.log("Account changed to:", selectedAccount);

        // Clear error when user selects a value
        if (errors.account) {
            setErrors((prev) => ({ ...prev, account: "" }));
        }

        setForm((prevForm) => {
            const updatedForm = {
                ...prevForm,
                account: selectedAccount,
            };
            console.log("Updated form state:", updatedForm);
            return updatedForm;
        });
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const submitErf = async () => {
        // Reset errors
        setErrors({});

        // Debug: Log the form data to see what's being submitted
        console.log("Form state before submission:", form);
        console.log("User object:", user);

        // Validate required fields (all fields except budgetCost)
        const newErrors = {};

        if (!form.account) {
            newErrors.account = "Please select an account before submitting.";
        }

        if (!form.jobTitle) {
            newErrors.jobTitle = "Please select a job title before submitting.";
        }

        if (!form.jobType) {
            newErrors.jobType = "Please select a job type before submitting.";
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
            newErrors.department =
                "Department is required. Please select a job title first.";
        }

        if (!form.sourcingMethod) {
            newErrors.sourcingMethod = "Please select a sourcing method.";
        }

        if (!form.justification || form.justification.trim() === "") {
            newErrors.justification =
                "Please provide a reason or justification for the request.";
        }

        if (!form.reviewer || form.reviewer.trim() === "") {
            newErrors.reviewer = "Please select a reviewer.";
        }

        // If there are errors, set them and return
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Show first error message
            const firstError = Object.values(newErrors)[0];
            message.error(firstError);
            return;
        }

        setLoading(true);
        try {
            // Create the submit data object carefully to ensure account is not overridden
            const submitData = {
                submitted: moment().format("YYYY-MM-DD"),
                user_id: user?.id || form.user_id,
                site: user?.site || form.site,
                ref_id: form.ref_id,
                department: form.department,
                account: form.account, // Explicitly ensure account is included
                budgetCost: form.budgetCost,
                jobTitle: form.jobTitle,
                jobType: form.jobType,
                personnel: form.personnel,
                dateNeed: form.dateNeed,
                positionStatus: form.positionStatus,
                sourcingMethod: form.sourcingMethod,
                justification: form.justification,
                reviewer: form.reviewer,
                requestor_name: form.requestor_name,
            };

            console.log("Final data being sent to thunk:", submitData);

            await store.dispatch(create_outsourcing_erf_thunk(submitData));
            message.success("Successfully Added!");
            setTimeout(() => {
                setLoading(false);
                router.visit("/employee/erf_record");
            }, 2000);
        } catch (error) {
            console.error("Error submitting ERF:", error);
            message.error("Error submitting form. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Back Button */}
            <div className="mb-4">
                <Button
                    onClick={handleGoBack}
                    icon={<ArrowLeftOutlined />}
                    className="mb-4 flex items-center gap-2 bg-gray-100  hover:bg-gray-200"
                >
                    Back
                </Button>
            </div>

            <form>
                <h1 className="text-xl font-semibold mb-3 text-gray-900 mt-6 text-center">
                    EMPLOYEE REQUISITION FORM
                </h1>
                <h1 className="text-lg">
                    <b>Instructions/Hiring Information</b>
                </h1>
                <p>
                    &emsp;&emsp;Use this form to initiate the recruitment
                    process for all new and existing staff. Please complete all
                    applicable sections of this form.{" "}
                    <b>
                        NO OFFERS should be made, either verbally or in written
                        form, before all approvals on the form are completed
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
                />
                <div className="flex flex-1 w-full gap-4 mb-4 mt-4">
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Reference No.</b>
                        </label>
                        <input
                            type="text"
                            value={form.ref_id || ""}
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Job Title</b>
                        </label>
                        <select
                            className={`border p-2 rounded w-full ${errors.jobTitle ? "border-red-500" : ""}`}
                            onChange={handleJobTitleChange}
                            value={form.jobTitle}
                            required
                        >
                            <option value="">Select a job title</option>
                            {job_positions
                                .filter((res) => res.status === "Approved")
                                .map((res, i) => (
                                    <option value={res.jPosition} key={i}>
                                        {res.jPosition}
                                    </option>
                                ))}
                        </select>
                        {errors.jobTitle && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.jobTitle}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-1 w-full gap-4 mb-4">
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Job Type</b>
                        </label>
                        <select
                            onChange={(e) => {
                                setForm({ ...form, jobType: e.target.value });
                                if (errors.jobType) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        jobType: "",
                                    }));
                                }
                            }}
                            className={`border p-2 rounded w-full ${errors.jobType ? "border-red-500" : ""}`}
                            value={form.jobType}
                            required
                        >
                            <option value="">Select a job type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contractual">Contractual</option>
                            <option value="Project-based">Project-based</option>
                            <option value="Temporary">Temporary</option>
                        </select>
                        {errors.jobType && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.jobType}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>No. of Required Personnel</b>
                        </label>
                        <input
                            type="number"
                            className={`border p-2 rounded w-full ${errors.personnel ? "border-red-500" : ""}`}
                            onChange={(e) => {
                                setForm({ ...form, personnel: e.target.value });
                                if (errors.personnel) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        personnel: "",
                                    }));
                                }
                            }}
                            value={form.personnel}
                            required
                        />
                        {errors.personnel && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.personnel}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Target Onboarding Date</b>
                        </label>
                        <input
                            type="date"
                            className={`border p-2 rounded w-full ${errors.dateNeed ? "border-red-500" : ""}`}
                            onChange={(e) => {
                                setForm({ ...form, dateNeed: e.target.value });
                                if (errors.dateNeed) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        dateNeed: "",
                                    }));
                                }
                            }}
                            value={form.dateNeed}
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
                        <label>
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
                            className={`border p-2 rounded w-full ${errors.positionStatus ? "border-red-500" : ""}`}
                            value={form.positionStatus}
                            required
                        >
                            <option value="">Select a position status</option>
                            <option>
                                Replacement (due to
                                resignation/termination/personnel movement)
                            </option>
                            <option>Additional manpower</option>
                            <option>New Role</option>
                            <option>Internal Job Posting</option>
                        </select>
                        {errors.positionStatus && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.positionStatus}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Department</b>
                        </label>
                        <input
                            type="text"
                            value={form.department}
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Account</b>
                        </label>
                        <select
                            onChange={handleAccountChange}
                            value={form.account || ""}
                            className={`border p-2 rounded w-full ${errors.account ? "border-red-500" : ""}`}
                            name="account"
                            id="account"
                            required
                        >
                            <option value="">Select an account</option>
                            {[...accounts]
                                .sort((a, b) => a.acc.localeCompare(b.acc))
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
                        <label>
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
                            value={form.sourcingMethod}
                            required
                        >
                            <option value="">Select a sourcing method</option>
                            <option>Internal Candidates</option>
                            <option>External Candidates</option>
                            <option>Both</option>
                        </select>
                        {errors.sourcingMethod && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.sourcingMethod}
                            </span>
                        )}
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4">
                    <label>
                        <b>Reason or Justification of the Request</b>
                    </label>
                    <textarea
                        className={`border h-40 p-2 rounded w-full ${errors.justification ? "border-red-500" : ""}`}
                        onChange={(e) => {
                            setForm({ ...form, justification: e.target.value });
                            if (errors.justification) {
                                setErrors((prev) => ({
                                    ...prev,
                                    justification: "",
                                }));
                            }
                        }}
                        value={form.justification}
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
                        <label>
                            <b>Manager Submitting Request</b>
                        </label>
                        <input
                            type="text"
                            value={`${user?.employee_fname || ""} ${user?.employee_lname || ""}`}
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Budget/Cost per head:</b>
                        </label>
                        <input
                            type="text"
                            value={form.budgetCost}
                            className="border p-2 rounded w-full"
                            onChange={(e) =>
                                setForm({ ...form, budgetCost: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4">
                    <label>
                        <b>Reviewer</b>
                    </label>
                    <select
                        onChange={(e) => {
                            setForm({
                                ...form,
                                reviewer: e.target.value,
                            });
                            if (errors.reviewer) {
                                setErrors((prev) => ({
                                    ...prev,
                                    reviewer: "",
                                }));
                            }
                        }}
                        value={form.reviewer || ""}
                        className={`border p-2 rounded w-full ${errors.reviewer ? "border-red-500" : ""}`}
                        name="reviewer"
                        id="reviewer"
                        required
                    >
                        <option value="" disabled>
                            Select a reviewer
                        </option>
                        {users
                            .filter(
                                (res) =>
                                    res.id == "717" ||
                                    res.id == "892" ||
                                    res.id == "742",
                                // res.id == "4",
                            )
                            .sort((a, b) =>
                                a.employee_fname.localeCompare(
                                    b.employee_fname,
                                ),
                            )
                            .map((res, i) => {
                                return (
                                    <option key={i} value={res.id}>
                                        {res.employee_fname}{" "}
                                        {res.employee_lname}
                                    </option>
                                );
                            })}
                    </select>
                    {errors.reviewer && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.reviewer}
                        </span>
                    )}
                </div>
                <div className="flex flex-1 gap-2 justify-end items-center">
                    <Button
                        className="rounded-md hover:bg-blue-100 w-32 h-10 mt-2"
                        type="button"
                        onClick={handleGoBack}
                    >
                        Back
                    </Button>
                    <Button
                        className="bg-blue-600 rounded-md hover:bg-blue-700 text-white w-32 h-10 mt-2"
                        type="primary"
                        onClick={submitErf}
                        loading={loading}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
