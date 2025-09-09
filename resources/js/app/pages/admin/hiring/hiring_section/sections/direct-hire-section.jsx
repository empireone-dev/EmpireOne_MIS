import { Menu, Modal, Button, message } from "antd";
import React from "react";
import { useState } from "react";
import store from "@/app/store/store";
import { DeliveredProcedureOutlined } from "@ant-design/icons";
import {
    get_job_offer_thunk,
    proceed_direct_hire_thunk,
} from "../redux/hiring-thunk";
import { get_applicant_thunk } from "../../../recruitment/applicants/applicant_records/redux/applicant-thunk";
import { get_job_position_thunk } from "../../../sourcing/job_title_section/redux/job-title-thunk";

export default function DirectHireSection({ data, item, status }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function openHandler() {
        setOpen(true);
    }

    function closeHandler() {
        setOpen(false);
    }

    async function handleProceed() {
        setLoading(true);
        try {
            store.dispatch(proceed_direct_hire_thunk(data));
            store.dispatch(get_applicant_thunk());
            store.dispatch(get_job_offer_thunk());
            store.dispatch(get_job_position_thunk());
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Applicant has been hired successfully.");
            closeHandler();
        } catch (error) {
            console.error("Error proceeding with interview:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={openHandler}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
            >
                <DeliveredProcedureOutlined />
            </button>
            <Modal
                title="Direct Hire"
                centered
                open={open}
                onCancel={closeHandler}
                footer={[
                    <Button key="cancel" onClick={closeHandler}>
                        Cancel
                    </Button>,
                    <Button
                        key="proceed"
                        type="primary"
                        loading={loading}
                        onClick={handleProceed}
                    >
                        Proceed
                    </Button>,
                ]}
            >
                <div className="flex flex-col gap-4 mb-7">
                    <h1>
                        Are you sure you want to hire this applicant directly?
                    </h1>
                    {data && (
                        <div className="text-sm text-gray-600">
                            <p>
                                <strong>Applicant:</strong>{" "}
                                {data.applicant.fname || data.applicant.lname
                                    ? `${data.applicant.fname ?? ""} ${
                                          data.applicant.lname ?? ""
                                      }`.trim()
                                    : "N/A"}
                            </p>
                            <p>
                                <strong>Status:</strong> {data.status || "N/A"}
                            </p>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
