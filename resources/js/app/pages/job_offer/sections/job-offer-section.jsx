import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { change_job_offer_service } from "../../services/job-offer-service";

export default function JobOfferSection() {
    const [open, setOpen] = useState(false);
    const { applicant } = useSelector((state) => state.final_rate);
    const [offerStatus, setOfferStatus] = useState(null);
    const [form, setForm] = useState({});
    
    const jo_id = window.location.search.split('=')[1]

    const handleAccept = async () => {
        const res = await change_job_offer_service({
            ...applicant,
            ...form,
            id:jo_id,
            status: "Accepted",
        });
        window.location.reload();
    };

    const handleDecline = () => {
        setOpen(true);
    };

    const handleDeclineSubmit = async () => {
        const res = await change_job_offer_service({
            ...applicant,
            ...form,
            id:jo_id,
            status: "Declined",
        });
        window.location.reload();

        setOpen(false);
    };

    // if (offerStatus === "accepted" || offerStatus === "declined") {
    //     return (

    //     );
    // }
    const jo = applicant?.joboffer?.find((res) => res.id == jo_id);
   
    return (
        <div className="h-screen overflow-hidden">
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto flex justify-center">
                    {jo?.status == "Pending" && (
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
                                    <b>JOB OFFER</b>
                                </h1>
                            </div>
                            <form className="border rounded-lg p-3.5">
                                Dear Mr./Ms. <b>{applicant.lname}</b>,<br />
                                <br /> Thank you for your interest in EmpireOne
                                Global Solution Inc. We’d like to offer you the
                                position of <b>POSITION</b>. Below is our Job
                                Offer:
                                <br /> <br />
                                1. <b>Employment Status</b>
                                <br />
                                You Employment Status is Probationary upon the
                                start of your employment with EmpireOne Global
                                Solution Inc.
                                <br /> <br /> 2. <b>Compensation</b>
                                <br />
                                You shall receive a monthly salary Package of
                                Php <b>SALARY + ALLOWANCE = PACKAGE</b>.
                                <br /> <br /> 3. <b>Benefits</b>
                                <br />
                                13th month pay, SSS, Philhealth, HDMF
                                (Pag-ibig), 10% Night Differential, EmpireOne
                                points and other government mandated benefits
                                applicable to your employment.
                                <br /> <br /> 4. <b>Employment Review</b>
                                <br />
                                The management will review your performance
                                during your probationary employment and your
                                continued employment will depend on your ability
                                to meet all required expectations and
                                performance set by the company.
                                <br /> <br /> We expect you to follow all the
                                policies and provisions indicated in the company
                                Code of Conduct and Discipline of EmpireOne
                                Global Solution Inc. which will be issued to you
                                when you start your career with us.
                                <br /> <br /> We are excited to welcome you to
                                our EmpireOne Global Solution Inc. family! Thank
                                you.
                                <br /> <br />
                                <div className="flex gap-2 justify-end mt-2.5">
                                    <button
                                        onClick={handleDecline}
                                        type="button"
                                        className="px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none transition-colors"
                                    >
                                        DECLINE
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        type="button"
                                        id="theme-toggle"
                                        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none transition-colors"
                                    >
                                        ACCEPT
                                    </button>
                                </div>
                            </form>
                            <Modal
                                title="Decline Job Offer"
                                centered
                                open={open}
                                onOk={handleDeclineSubmit}
                                onCancel={() => setOpen(false)}
                                width={1000}
                                okText="Submit"
                                cancelText="Cancel"
                            >
                                <hr />
                                <form className="w-full">
                                    <div className="w-full">
                                        <input
                                            className="border p-2 rounded w-full mt-1"
                                            id="grid-text"
                                            type="hidden"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <label htmlFor="">
                                            <b>
                                                Reason for Declining Job Offer
                                            </b>
                                        </label>
                                        <textarea
                                            placeholder=""
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            name="reas"
                                            value={form.reas ?? ""}
                                            className="border p-2 rounded w-full mt-1 h-40"
                                        />
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    )}
                </div>
                {(jo?.status == "Declined" || jo?.status == "Accepted") && (
                    <div className="bg-cover bg-[url('/images/SCemp.jpg')] bg-center transition-colors duration-300 overflow-y-scroll h-screen p-14">
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
                                    <b>
                                        Job Offer - EmpireOne BPO Solutions Inc.
                                    </b>
                                </h3>
                                <h3 className="text-xl">
                                    <i>
                                        Your response has been sent. Thank you
                                        for your Cooperation
                                    </i>
                                </h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}