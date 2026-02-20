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
        site: user?.site || "",
        user_id: user?.id || "",
    });

    const [applicationCount, setApplicationCount] = useState(0);
    const [reqs, setReqs] = useState("");

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

        if (selectedJob) {
            setForm((prevForm) => ({
                ...prevForm,
                account: selectedJob.outsourcing_erf.account,
                department: selectedJob.outsourcing_erf.department,
                budgetCost: selectedJob.salary,
                jobTitle: selectedJobTitle,
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                department: "",
                account: "",
                budgetCost: "",
                jobTitle: selectedJobTitle,
            }));
        }
        setReqs(selectedJobTitle);
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const submitErf = async () => {
        setLoading(true);
        try {
            await store.dispatch(
                create_outsourcing_erf_thunk({
                    submitted: moment().format("YYYY-MM-DD"),
                    ...form,
                    ...user,
                }),
            );
            message.success("Successfully Added!");
            setTimeout(() => {
                setLoading(false);
                router.visit("/employee/erf_record");
            }, 2000);
        } catch (error) {
            console.error("Error submitting ERF:", error);
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
                    className="mb-4 flex items-center gap-2 bg-gray-100 border-gray-300 hover:bg-gray-200"
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
                            className="border p-2 rounded w-full"
                            onChange={handleJobTitleChange}
                            value={form.jobTitle}
                        >
                            <option value=""></option>
                            {job_positions
                                .filter((res) => res.status === "Approved")
                                .map((res, i) => (
                                    <option value={res.jPosition} key={i}>
                                        {res.jPosition}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-1 w-full gap-4 mb-4">
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Job Type</b>
                        </label>
                        <select
                            onChange={(e) =>
                                setForm({ ...form, jobType: e.target.value })
                            }
                            className="border p-2 rounded w-full"
                            value={form.jobType}
                        >
                            <option value=""></option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>No. of Required Personnel</b>
                        </label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full"
                            onChange={(e) =>
                                setForm({ ...form, personnel: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Target Onboarding Date</b>
                        </label>
                        <input
                            type="date"
                            className="border p-2 rounded w-full"
                            onChange={(e) =>
                                setForm({ ...form, dateNeed: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-1 w-full gap-4 mb-4">
                    <div className="w-full flex flex-col">
                        <label>
                            <b>Position Status</b>
                        </label>
                        <select
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    positionStatus: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full"
                            value={form.positionStatus}
                        >
                            <option value=""></option>
                            <option>Replacement</option>
                            <option>Reorganization</option>
                            <option>Other</option>
                        </select>
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
                        <label>
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
                            value={form.sourcingMethod}
                        >
                            <option value=""></option>
                            <option>Internal Candidates</option>
                            <option>External Candidates</option>
                            <option>Both</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4">
                    <label>
                        <b>Reason or Justification of the Request</b>
                    </label>
                    <textarea
                        className="border h-40 p-2 rounded w-full"
                        onChange={(e) =>
                            setForm({ ...form, justification: e.target.value })
                        }
                    />
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
                            readOnly
                        />
                    </div>
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
