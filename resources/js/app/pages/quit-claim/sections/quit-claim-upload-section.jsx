import { FileJpgOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import store from "@/app/store/store";
import { sendiv_contract_email_thunk } from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
import { message } from "antd";
import UploadQuitClaimSection from "./upload-quit-claim-section";
import {
    get_employee_attrition_thunk,
    upload_quit_claim_thunk,
} from "../../admin/attrition/attrition_section/redux/employee-attrition-thunk";

export default function QuitClaimUploadSection() {
    const { employee_attritions } = useSelector(
        (state) => state.employee_attritions
    );
    const { applicant } = useSelector((state) => state.final_rate);
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [file, setFile] = useState(null);
    const jo = applicant?.joboffer?.find(
        (res) => res.status == "Contract Signing"
    );
    const job_offer_id = window.location.pathname.split("/")[3];

    // Get the first (and should be only) employee attrition record
    const employee_attrition = employee_attritions?.[0];

    // Helper function to handle undefined/null/empty values
    const getCleanValue = (value) => {
        if (
            value === undefined ||
            value === null ||
            value === "" ||
            value === "undefined"
        ) {
            return "";
        }
        return value;
    };

    console.log("file", file);
    async function handleUpload() {
        try {
            setLoading(true); // Set loading before starting the submission

            // Check if file is selected
            if (!file) {
                message.error("Please select a file to upload.");
                setLoading(false);
                return;
            }

            // Convert file to base64
            const base64File = await convertFileToBase64(file);

            console.log("File to upload:", file.name);
            console.log("Base64 file size:", base64File.length);

            const result = await store.dispatch(
                upload_quit_claim_thunk({
                    files: [base64File], // Send as array with single file
                    app_id: employee_attrition?.applicant?.app_id,
                    emp_id: employee_attrition?.emp_id,
                    fname: employee_attrition?.applicant?.fname,
                    mname: employee_attrition?.applicant?.mname,
                    lname: employee_attrition?.applicant?.lname,
                    email: employee_attrition?.applicant?.email,
                    site: employee_attrition?.applicant?.site,
                })
            );

            if (result?.payload?.status === "already_exists") {
                message.warning(
                    "You have already uploaded a quit claim. Multiple uploads are not allowed."
                );
                return;
            }
            await store.dispatch(get_employee_attrition_thunk());
            message.success("Quit claim uploaded successfully!");
            setFile(null);
            setUploadedFile(null);
        } catch (error) {
            console.error("Upload error:", error);

            if (error?.response?.data?.status === "already_exists") {
                message.warning(
                    "You have already uploaded a quit claim. Multiple uploads are not allowed."
                );
            } else if (error?.response?.data?.error) {
                message.error(error.response.data.error);
            } else {
                message.error("Failed to upload quit claim. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    console.log("attrition", employee_attrition);
    console.log("attritions", employee_attritions);
    return (
        <div>
            <div className="h-screen overflow-hidden">
                <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                    <div className="container mx-auto flex justify-center">
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
                                    <b>UPLOAD SIGNED QUIT CLAIM</b>
                                </h1>
                            </div>
                            <form className="border rounded-lg p-3.5">
                                <div className="flex flex-col w-full mb-4">
                                    <label htmlFor="">
                                        <b>Employee No.</b>
                                    </label>
                                    <div className="flex flex-1 gap-3">
                                        <input
                                            value={getCleanValue(
                                                employee_attrition?.emp_id
                                            )}
                                            type="text"
                                            placeholder="Employee No"
                                            className="border p-2 rounded w-full"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row flex-1 gap-4">
                                    <div className="flex flex-col w-full mb-4">
                                        <label
                                            htmlFor=""
                                            className="text-sm sm:text-base"
                                        >
                                            <b>Full Name</b>
                                        </label>
                                        <div className="flex flex-1">
                                            <input
                                                type="text"
                                                className="border p-2 rounded w-full text-sm sm:text-base"
                                                value={
                                                    employee_attrition?.applicant
                                                        ? `${getCleanValue(
                                                              employee_attrition
                                                                  .applicant
                                                                  .fname
                                                          )} ${getCleanValue(
                                                              employee_attrition
                                                                  .applicant
                                                                  .mname
                                                          )} ${getCleanValue(
                                                              employee_attrition
                                                                  .applicant
                                                                  .lname
                                                          )} ${getCleanValue(
                                                              employee_attrition
                                                                  .applicant
                                                                  .suffix
                                                          )}`
                                                              .replace(
                                                                  /\s+/g,
                                                                  " "
                                                              )
                                                              .trim()
                                                        : ""
                                                }
                                                readOnly
                                                placeholder="Full Name"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 gap-4 mb-1 w-full">
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Job Position</b>
                                        </label>
                                        <input
                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.position
                                            )}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Department</b>
                                        </label>
                                        <input
                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.dept
                                            )}
                                            readOnly
                                        />
                                    </div>
                                    {/* <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Account <i>(If Applicable)</i>
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.account} readOnly />
                            </div> */}
                                </div>

                                <div className="flex flex-1 gap-4 mb-1 w-full">
                                    {/* <div class="w-full">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                    Supervisor
                                </label>
                                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={data?.sup_id} readOnly />
                            </div> */}
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>EOGS Email</b>
                                        </label>
                                        <input
                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="email"
                                            value={getCleanValue(
                                                employee_attrition?.eogs
                                            )}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Employment Status</b>
                                        </label>
                                        <input
                                            className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.status
                                            )}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-1 gap-4 mb-1 w-full">
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Hired Date</b>
                                        </label>
                                        <input
                                            className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.hired
                                            )}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Separation Date</b>
                                        </label>
                                        <input
                                            className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.separation
                                            )}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-1 gap-4 w-full">
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Reason for Separation</b>
                                        </label>
                                        <input
                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.reas
                                            )}
                                            readOnly
                                        />
                                    </div>
                                    <div class="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>Reason for End of Contract</b>
                                        </label>
                                        <input
                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.reas
                                            )}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="text-sm sm:text-base">
                                            <b>
                                                Exit Interview & Clearance
                                                Status
                                            </b>
                                        </label>
                                        <input
                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            type="text"
                                            value={getCleanValue(
                                                employee_attrition?.estatus
                                            )}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <UploadQuitClaimSection
                                    uploadedFile={uploadedFile}
                                    setFile={setFile}
                                    setUploadedFile={setUploadedFile}
                                />

                                <div className="flex mt-4">
                                    <button
                                        type="button"
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${
                                            loading || !file
                                                ? "cursor-not-allowed opacity-75"
                                                : ""
                                        }`}
                                        onClick={handleUpload}
                                        disabled={loading || !file}
                                    >
                                        {loading ? (
                                            <LoadingOutlined spin />
                                        ) : (
                                            <FileJpgOutlined />
                                        )}
                                        {loading ? " UPLOADING..." : " UPLOAD"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
