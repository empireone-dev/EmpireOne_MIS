import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function ExistingPositionFormSection() {
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

    const generateUniqueAppId = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");
        const datePart = `${month}${day}${year}`;

        const seq = (applicationCount + 1).toString().padStart(2, "0"); // Ensuring two-digit sequence
        return `${datePart}${seq}`;
    };
    return (
        <div>
            <form>
                <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-6 text-center">
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
                <div className="flex flex-1 w-full gap-4 mb-4 mt-4">
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>Reference No.</b>
                        </label>
                        <input
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    ref_no: e.target.value,
                                })
                            }
                            type="text"
                            value={generateUniqueAppId}
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>Job Title</b>
                        </label>
                        <select
                            className="border p-2 rounded w-full"
                            name=""
                            id=""
                        >
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-1 w-full gap-4 mb-4">
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>Job Type</b>
                        </label>
                        <select
                            className="border p-2 rounded w-full"
                            name=""
                            id=""
                        >
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>No. of Required Personnel</b>
                        </label>
                        <input
                            type="number"
                            placeholder=""
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>Date Needed</b>
                        </label>
                        <input
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
                        <select
                            className="border p-2 rounded w-full"
                            name=""
                            id=""
                        >
                            <option value=""></option>
                        </select>
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>Department</b>
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>Sourcing Method</b>
                        </label>
                        <select
                            className="border p-2 rounded w-full"
                            name=""
                            id=""
                        >
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4">
                    <label htmlFor="">
                        <b>Reason or Justification of the Request</b>
                    </label>
                    <textarea
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
                            type="text"
                            placeholder=""
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="">
                            <b>Budget/Cost per head:</b>
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            className="border p-2 rounded w-full"
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex flex-1 gap-2 justify-end items-center">
                    <button
                        className="rounded-md hover:bg-blue-100 w-32 h-10 mt-2"
                        type="button"
                        onClick={() =>
                            router.visit(
                                "/admin/sourcing/resource_requests/erf_record"
                            )
                        }
                    >
                        Back
                    </button>
                    <button className="bg-blue-600 rounded-md hover:bg-blue-700 text-white w-32 h-10 mt-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
