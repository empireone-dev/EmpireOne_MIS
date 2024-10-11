import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrintCOEContentSection() {
    const { employee } = useSelector((store) => store.employees);
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    function get_province() {
        if (employee?.applicant?.site == "San Carlos") {
            return "Negros Occidental";
        } else if (employee?.applicant?.site == "Carcar") {
            return "Cebu";
        }
    }
    return (
        <div>
            <div className="container mt-5 flex items-center justify-center">
                <div className="m-auto">
                    <header style={{ margin: "auto" }}>
                        <div className="flex items-center justify-center">
                            <img
                                className="w-60"
                                src="/images/newlogo.png"
                                alt="EmpireOne BPO"
                            />
                        </div>
                    </header>

                    <div>
                        <h3 className="text-center text-lg mt-5 text-bold text-sky-500 mb-5">
                            <b>CERTIFICATE OF EMPLOYMENT</b>
                        </h3>
                        <hr />
                        <div className="mt-5" style={{ textAlign: "justify" }}>
                            <p className="mb-4">
                                This is to certify that{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                    {employee?.applicant?.fname}{" "}
                                    {employee?.applicant?.mname}{" "}
                                    {employee?.applicant?.lname}
                                </b>{" "}
                                has been employed with EmpireOne BPO Solutions
                                Inc. from <b>July 11, 2023</b>{" "}
                                {employee?.attrition ? (
                                    <>
                                        to{" "}
                                        <b>
                                            {" "}
                                            {moment(
                                                employee?.attrition?.separation
                                            ).format("LL") ?? ""}
                                        </b>
                                    </>
                                ) : (
                                    ", and remains employed to date."
                                )}
                            </p>

                            <p className="mb-4">
                                This certificate is issued at the request of the
                                aforementioned individual for any legal purpose
                                that may serve him/her best.
                            </p>

                            <ul>
                                <li>
                                    <b>Job Title:</b>{" "}
                                    <i>{employee?.position}</i>
                                </li>
                                <li>
                                    <b>Department:</b> <i>{employee?.dept}</i>
                                </li>
                                <li>
                                    <b>Employee ID:</b>{" "}
                                    <i>{employee?.emp_id}</i>
                                </li>
                            </ul>
                            <br />

                            <p className="mb-4">
                                If you have any further questions or require
                                additional information, please contact us at
                                hr@empireonegs.com and schr@empireonegroup.com.
                            </p>

                            <p className="mb-5">
                                Given this <b>{moment().format("Do")}</b> day of{" "}
                                <b>{moment().format("MMMM YYYY")}</b> at{" "}
                                <b>
                                    {employee?.applicant?.site} City,{" "}
                                    {get_province()}, Philippines.
                                </b>
                            </p>
                            <br />
                            <br />

                            <footer>
                                <p className="text-bold mb-4">Approved By:</p>
                                <br />
                                <p className="text-bold">
                                    Cielo V. Cupta
                                    <br />
                                    Director
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
