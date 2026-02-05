// MyForm.jsx
import Input2 from "@/app/pages/_components/input2";
import Select from "@/app/pages/_components/select";
import Select2 from "@/app/pages/_components/select2";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import region from "@/app/address/region.json";
import province from "@/app/address/province.json";
import city from "@/app/address/city.json";
import barangay from "@/app/address/barangay.json";
import Checkbox from "@/app/pages/_components/checkbox";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import { store_applicant_thunk } from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
const { Dragger } = Upload;

export default function ApplicationFormSection() {
    const { user } = useSelector((state) => state.app);
    const [newProvince, setNewProvince] = useState([]);
    const [newCity, setNewCity] = useState([]);
    const [newBarangay, setNewBarangay] = useState([]);
    const [address, setAddress] = useState({});
    const [open, setOpen] = useState(false);
    const [hasExperience, setHasExperience] = useState(false);
    const [hasBPOExperience, setHasBPOExperience] = useState(false);
    const [files, setFiles] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            work_experience: [
                { company: "", position: "", started_at: "", end_at: "" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "work_experience",
    });

    const handleFiles = async (fileList) => {
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
            });

        const fileArray = Array.from(fileList);

        // Remove files that already exist in state
        const newUniqueFiles = fileArray.filter(
            (file) =>
                !files.some(
                    (existing) =>
                        existing.file.name === file.name &&
                        existing.file.size === file.size &&
                        existing.file.lastModified === file.lastModified,
                ),
        );

        const base64Files = await Promise.all(
            newUniqueFiles.map(async (file) => ({
                file,
                files: await toBase64(file),
            })),
        );

        setFiles((prevFiles) => [...prevFiles, ...base64Files]);
    };

    console.log("files", files);
    const props = {
        name: "file",
        multiple: false,
        accept: "application/pdf",
        method: "GET",
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                const newFiles = info.fileList
                    .map((file) => file.originFileObj)
                    .filter(Boolean);
                handleFiles(newFiles);
                message.success(
                    `${info.file.name} file uploaded successfully.`,
                );
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(file) {
            setFiles((prevFiles) =>
                prevFiles.filter((f) => f.file.name !== file.name),
            );
            return true; // allow UI to remove it too
        },

        // onDrop(e) {
        //     console.log("Dropped files", e.dataTransfer.files);
        // },
    };
    const onSubmit = async (data) => {
        // data.prevent.defaultValues
        // console.log("Form Submitted:");
        if (files.length === 0) {
            message.error("CV file is required. Please upload your CV.");
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Simulate progress steps
            const progressSteps = [
                { step: 10, message: "Validating form data..." },
                { step: 30, message: "Processing files..." },
                { step: 50, message: "Uploading application..." },
                { step: 80, message: "Finalizing submission..." },
                { step: 85, message: "Finalizing submission..." },
                { step: 90, message: "Finalizing submission..." },
                { step: 95, message: "Finalizing submission..." },
                { step: 96, message: "Finalizing submission..." },
                { step: 97, message: "Finalizing submission..." },
                { step: 98, message: "Finalizing submission..." },
                { step: 100, message: "Complete!" },
            ];

            // Simulate progressive upload with delays
            for (let i = 0; i < progressSteps.length - 1; i++) {
                setUploadProgress(progressSteps[i].step);
                await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms delay between steps
            }

            const result = await store.dispatch(
                store_applicant_thunk({
                    ...data,
                    province: JSON.parse(data?.province).name,
                    city: JSON.parse(data?.city).name,
                    region: JSON.parse(data?.region).name,
                    files: files.map((res) => res.files),
                    is_experience: hasExperience,
                    agreed: "true",
                }),
            );

            // Complete the progress
            setUploadProgress(100);
            await new Promise((resolve) => setTimeout(resolve, 500));

            // await store.dispatch(get_applicant_thunk())
            reset();
            setFiles([]);
            setUploadProgress(0);
            setIsUploading(false);
            setShowSuccessModal(true);
            message.success(
                "Application has been submitted successfully! Please check your email regularly for updates on your application status.",
            );
        } catch (error) {
            setUploadProgress(0);
            setIsUploading(false);
            if (error?.response?.status === 422) {
                message.error(
                    "Application failed: Data validation error or already exists",
                );
            } else {
                message.error("Something went wrong. Please try again later.");
            }
        }

        // reset(); // optional: reset the form after submit
    };

    function data_handler(e) {
        console.log("dadwa", e.target.value);
        if (e.target.name == "region") {
            const region = JSON.parse(e.target.value);
            const prov = province.filter(
                (obj) => obj.region_code === region.region_code,
            );
            setNewProvince(prov);
            setAddress({
                ...address,
                [e.target.name]: region.name,
            });
        } else if (e.target.name == "province") {
            const province = JSON.parse(e.target.value);
            const ct = city.filter(
                (obj) => obj.province_code === province.province_code,
            );
            setNewCity(ct);
            setAddress({
                ...address,
                [e.target.name]: province.name,
            });
        } else if (e.target.name == "city") {
            const city = JSON.parse(e.target.value);
            const brgy = barangay.filter(
                (obj) => obj.city_code === city.city_code,
            );
            setNewBarangay(brgy);
            setAddress({
                ...address,
                [e.target.name]: city.name,
            });
        }
    }
    return (
        <>
            {/* Success Modal */}
            <Modal
                title={null}
                open={showSuccessModal}
                onCancel={() => setShowSuccessModal(false)}
                footer={null}
                centered
                width={600}
            >
                <div className="text-center p-6">
                    <div className="mb-4">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                            <svg
                                className="h-8 w-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        🎉 Application Submitted Successfully!
                    </h3>

                    <div className="text-left bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-700 mb-3">
                            <strong>Dear Applicant,</strong>
                        </p>
                        <p className="text-gray-700 mb-3">
                            Thank you for your interest in joining{" "}
                            <strong>EmpireOne</strong>! Your application has
                            been successfully submitted and is now being
                            reviewed by our HR team.
                        </p>
                        <p className="text-gray-700 mb-3">
                            <strong>What happens next:</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-3">
                            <li>Our HR team will review your application</li>
                            <li>
                                You'll receive email updates about your
                                application status
                            </li>
                            <li>
                                If shortlisted, we'll contact you for the next
                                steps
                            </li>
                        </ul>
                        <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-400">
                            <p className="text-yellow-800 text-sm">
                                <strong>📧 Important:</strong> Please check your
                                email regularly (including spam/junk folder) for
                                updates and further instructions.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowSuccessModal(false)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            <div className="h-screen overflow-hidden ">
                <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                    <div className="container mx-auto px-2 flex justify-center">
                        <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                            <div className="flex items-center justify-center p-3">
                                <img
                                    className="w-60"
                                    src="images/newlogo.png"
                                    alt="logo"
                                />
                            </div>
                            <div className="flex text-2xl items-center justify-center">
                                <h1 className="text-center">
                                    <b>ONLINE APPLICATION FORM</b>
                                </h1>
                            </div>

                            {/* Greeting Message */}
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 mb-6">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            <strong>
                                                Welcome to EmpireOne!
                                            </strong>{" "}
                                            Thank you for your interest in
                                            joining our team. Please fill out
                                            this application form completely and
                                            accurately. After submission, please
                                            check your email regularly for
                                            updates on your application status.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4 px-1 py-8"
                            >
                                <div className="flex gap-4 mb-6 lg:flex-row flex-col">
                                    <div className="w-full">
                                        <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                                            Where did you find out about this
                                            job posting?
                                        </h1>
                                        <div className="w-full lg:flex-row flex-none">
                                            <Select2
                                                register={{
                                                    ...register("source", {
                                                        required:
                                                            "Source is required",
                                                    }),
                                                }}
                                                options={[
                                                    {
                                                        label: "Facebook",
                                                        value: "Facebook",
                                                    },
                                                    {
                                                        label: "Instagram",
                                                        value: "Instagram",
                                                    },
                                                    {
                                                        label: "Indeed",
                                                        value: "Indeed",
                                                    },
                                                    {
                                                        label: "LinkedIn",
                                                        value: "LinkedIn",
                                                    },
                                                    {
                                                        label: "Poster",
                                                        value: "Poster",
                                                    },
                                                    {
                                                        label: "Job Board",
                                                        value: "Job Board",
                                                    },
                                                    {
                                                        label: "Job Fair",
                                                        value: "Job Fair",
                                                    },
                                                    {
                                                        label: "Employee Referral",
                                                        value: "Employee Referral",
                                                    },
                                                    {
                                                        label: "Other",
                                                        value: "Other",
                                                    },
                                                ]}
                                                errorMessage={
                                                    errors?.source?.message
                                                }
                                                label="Source"
                                                name="source"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                                            Site Information
                                        </h1>
                                        <div className="w-full lg:flex-row flex-none">
                                            <Select2
                                                register={{
                                                    ...register("site", {
                                                        required:
                                                            "Site is required",
                                                    }),
                                                }}
                                                options={[
                                                    {
                                                        label: "San Carlos",
                                                        value: "San Carlos",
                                                    },
                                                    {
                                                        label: "Carcar",
                                                        value: "Carcar",
                                                    },
                                                ]}
                                                errorMessage={
                                                    errors?.site?.message
                                                }
                                                label="Site"
                                                name="site"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                                    Personal Information
                                </h1>

                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("fname", {
                                                    required:
                                                        "First Name is required",
                                                }),
                                            }}
                                            errorMessage={
                                                errors?.fname?.message
                                            }
                                            name="fname"
                                            label="First Name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("mname", {
                                                    required:
                                                        "Middle Name is required",
                                                }),
                                            }}
                                            errorMessage={
                                                errors?.mname?.message
                                            }
                                            name="mname"
                                            label="Middle Name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("lname", {
                                                    required:
                                                        "Last Name is required",
                                                }),
                                            }}
                                            errorMessage={
                                                errors?.lname?.message
                                            }
                                            name="lname"
                                            label="Last Name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-none lg:w-24 lg:flex-row">
                                        <Select
                                            register={{
                                                ...register("suffix", {
                                                    required: false,
                                                }),
                                            }}
                                            options={[
                                                { label: "--", value: "" },
                                                { label: "Sr.", value: "Sr." },
                                                { label: "Jr.", value: "Jr." },
                                                { label: "II", value: "II" },
                                                { label: "III", value: "III" },
                                                { label: "IV", value: "IV" },
                                                { label: "V", value: "V" },
                                            ]}
                                            label="Suffix"
                                            name="name"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Select2
                                            register={{
                                                ...register("gender", {
                                                    required:
                                                        "Gender is required",
                                                }),
                                            }}
                                            options={[
                                                {
                                                    label: "Male",
                                                    value: "Male",
                                                },
                                                {
                                                    label: "Female",
                                                    value: "Female",
                                                },
                                            ]}
                                            errorMessage={
                                                errors?.gender?.message
                                            }
                                            label="Gender"
                                            name="gender"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("dob", {
                                                    required:
                                                        "Date of Birth is required",
                                                }),
                                            }}
                                            errorMessage={errors?.dob?.message}
                                            name="dob"
                                            label="Date of Birth"
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("email", {
                                                    required:
                                                        "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message:
                                                            "Please enter a valid email address",
                                                    },
                                                }),
                                            }}
                                            errorMessage={
                                                errors?.email?.message
                                            }
                                            name="email"
                                            label="Email"
                                            type="email"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("phone", {
                                                    required:
                                                        "Phone is required",
                                                }),
                                            }}
                                            errorMessage={
                                                errors?.phone?.message
                                            }
                                            name="phone"
                                            label="Phone"
                                            type="number"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Select
                                            register={{
                                                ...register("marital", {
                                                    required: false,
                                                }),
                                            }}
                                            options={[
                                                {
                                                    label: "Single",
                                                    value: "Single",
                                                },
                                                {
                                                    label: "Married",
                                                    value: "Married",
                                                },
                                                {
                                                    label: "Widowed",
                                                    value: "Widowed",
                                                },
                                                {
                                                    label: "Divorced",
                                                    value: "Divorced",
                                                },
                                            ]}
                                            label="Marital Status"
                                            name="marital"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("religion", {
                                                    required: false,
                                                }),
                                            }}
                                            name="religion"
                                            label="Religion"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("nationality", {
                                                    required: false,
                                                }),
                                            }}
                                            name="nationality"
                                            label="Nationality"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("mmname", {
                                                    required: false,
                                                }),
                                            }}
                                            name="mmname"
                                            label="Mother's maiden name"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("ffname", {
                                                    required: false,
                                                }),
                                            }}
                                            name="ffname"
                                            label="Father's fullname"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Select
                                            register={{
                                                ...register("educ", {
                                                    required: false,
                                                }),
                                            }}
                                            options={[
                                                {
                                                    label: "Highest Educational Attainmen",
                                                    value: "Highest Educational Attainmen",
                                                },
                                                {
                                                    label: "Elementary Undergraduate",
                                                    value: "Elementary Undergraduate",
                                                },
                                                {
                                                    label: "Elementary Graduate",
                                                    value: "Elementary Graduate",
                                                },
                                                {
                                                    label: "Highschool/K-12 Undergraduate",
                                                    value: "Highschool/K-12 Undergraduate",
                                                },
                                                {
                                                    label: "Highschool/K-12 Graduate",
                                                    value: "Highschool/K-12 Graduate",
                                                },
                                                {
                                                    label: "College Level",
                                                    value: "College Level",
                                                },
                                                {
                                                    label: "College Graduate",
                                                    value: "College Graduate",
                                                },
                                                {
                                                    label: "Vocational Graduate",
                                                    value: "Vocational Graduate",
                                                },
                                                {
                                                    label: "Masteral Degree",
                                                    value: "Masteral Degree",
                                                },
                                                {
                                                    label: "Doctoral Degree",
                                                    value: "Doctoral Degree",
                                                },
                                            ]}
                                            label="Highest Educational Attainment"
                                            name="educ"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("courset", {
                                                    required: false,
                                                }),
                                            }}
                                            name="courset"
                                            label="Course taken"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                                    Address Information
                                </h1>
                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Select
                                            register={{
                                                ...register("region", {
                                                    required:
                                                        "Please Select Region",
                                                }),
                                            }}
                                            onChange={(event) =>
                                                data_handler(event)
                                            }
                                            options={region.map((res) => ({
                                                label: res.region_name,
                                                value: JSON.stringify({
                                                    name: res.region_name,
                                                    region_code:
                                                        res.region_code,
                                                }),
                                            }))}
                                            // value={address.region}
                                            errorMessage={
                                                errors?.region?.message
                                            }
                                            label="Region"
                                            name="region"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Select
                                            register={{
                                                ...register("province", {
                                                    required:
                                                        "Please Select Province",
                                                }),
                                            }}
                                            onChange={(event) =>
                                                data_handler(event)
                                            }
                                            options={newProvince.map((res) => ({
                                                label: res.province_name,
                                                value: JSON.stringify({
                                                    name: res.province_name,
                                                    province_code:
                                                        res.province_code,
                                                }),
                                            }))}
                                            errorMessage={
                                                errors?.province?.message
                                            }
                                            label="Province"
                                            name="province"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Select
                                            register={{
                                                ...register("city", {
                                                    required:
                                                        "Please Select City",
                                                }),
                                            }}
                                            onChange={(event) =>
                                                data_handler(event)
                                            }
                                            options={newCity.map((res) => ({
                                                label: res.city_name,
                                                value: JSON.stringify({
                                                    name: res.city_name,
                                                    city_code: res.city_code,
                                                }),
                                            }))}
                                            errorMessage={errors?.city?.message}
                                            name="city"
                                            label="City/Municipality"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Select
                                            register={{
                                                ...register("brgy", {
                                                    required:
                                                        "Please Select Barangay",
                                                }),
                                            }}
                                            onChange={(event) =>
                                                data_handler(event)
                                            }
                                            options={newBarangay.map((res) => ({
                                                label: res.brgy_name,
                                                value: res.brgy_name,
                                            }))}
                                            errorMessage={errors?.brgy?.message}
                                            name="brgy"
                                            label="Barangay"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("lot", {
                                                    required:
                                                        "House/Lot No., Street, Purok/Sitio is required",
                                                }),
                                            }}
                                            errorMessage={errors?.lot?.message}
                                            name="lot"
                                            label="House/Lot No., Street, Purok/Sitio"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                                    Government ID Information
                                </h1>
                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("sss", {}),
                                            }}
                                            name="sss"
                                            label="SSS"
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("pagibig", {}),
                                            }}
                                            name="pagibig"
                                            label="Pagibig"
                                            type="number"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("tin", {}),
                                            }}
                                            name="tin"
                                            label="Tin"
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("philh", {}),
                                            }}
                                            name="philh"
                                            label="Philhealth No."
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                                    Working Experience
                                </h1>

                                {/* <div className="flex-col">
                                    <div className="flex items-center mb-3 justify-between">
                                        <Checkbox
                                            label="With Working Experience?"
                                            name="hasExperience"
                                            // error=""
                                            onChange={(e) =>
                                                setHasExperience(
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    </div>
                                    {hasExperience && (
                                        <div className="flex flex-col gap-3 w-full">
                                            {fields.map((field, index) => (
                                                <div
                                                    key={field.id}
                                                    className="flex flex-col border border-blue-500 rounded-lg p-4 w-full gap-4"
                                                >
                                                    {index !== 0 && (
                                                        <div className="flex w-full justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    remove(
                                                                        index,
                                                                    )
                                                                }
                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    )}

                                                    <div className="flex flex-col md:flex-row gap-3 w-full">
                                                        <Input2
                                                            register={{
                                                                ...register(
                                                                    `work_experience.${index}.company`,
                                                                    {
                                                                        required:
                                                                            "Company is required",
                                                                    },
                                                                ),
                                                            }}
                                                            errorMessage={
                                                                errors
                                                                    ?.work_experience?.[
                                                                    index
                                                                ]?.company
                                                                    ?.message
                                                            }
                                                            name="company"
                                                            label="Company"
                                                            type="text"
                                                            className="w-full"
                                                        />
                                                        <Input2
                                                            register={{
                                                                ...register(
                                                                    `work_experience.${index}.position`,
                                                                    {
                                                                        required:
                                                                            "Position is required",
                                                                    },
                                                                ),
                                                            }}
                                                            errorMessage={
                                                                errors
                                                                    ?.work_experience?.[
                                                                    index
                                                                ]?.position
                                                                    ?.message
                                                            }
                                                            name="position"
                                                            label="Position"
                                                            type="text"
                                                            className="w-full"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col md:flex-row gap-3 w-full">
                                                        <Input2
                                                            register={{
                                                                ...register(
                                                                    `work_experience.${index}.started_at`,
                                                                    {
                                                                        required:
                                                                            "Started at is required",
                                                                    },
                                                                ),
                                                            }}
                                                            errorMessage={
                                                                errors
                                                                    ?.work_experience?.[
                                                                    index
                                                                ]?.started_at
                                                                    ?.message
                                                            }
                                                            label="Started At"
                                                            type="date"
                                                            className="w-full"
                                                        />
                                                        <Input2
                                                            register={{
                                                                ...register(
                                                                    `work_experience.${index}.end_at`,
                                                                    {
                                                                        required:
                                                                            "End at is required",
                                                                    },
                                                                ),
                                                            }}
                                                            errorMessage={
                                                                errors
                                                                    ?.work_experience?.[
                                                                    index
                                                                ]?.end_at
                                                                    ?.message
                                                            }
                                                            label="End At"
                                                            type="date"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {hasExperience && (
                                        <button
                                            type="button"
                                            onClick={() => append({ name: "" })}
                                            className="bg-blue-600 text-white justify-center items-center px-4 flex gap-2 py-2 rounded-md w-full mt-4"
                                        >
                                            <PlusIcon className="h-6" />{" "}
                                            Experience
                                        </button>
                                    )}
                                </div> */}
                                <div className="flex items-center mb-3 justify-between">
                                    <Checkbox
                                        label="With BPO Experience?"
                                        name="with_bpo"
                                        checked={hasBPOExperience}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setHasBPOExperience(isChecked);
                                            setValue(
                                                "with_bpo",
                                                isChecked ? "Yes" : "No",
                                            );
                                        }}
                                    />
                                </div>
                                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                                    Emergency Contact Information
                                </h1>
                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("ename", {
                                                    required: false,
                                                }),
                                            }}
                                            name="ename"
                                            label="Emergency Contact Fullname"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("eaddress", {
                                                    required: false,
                                                }),
                                            }}
                                            name="eaddress"
                                            label="Address"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 lg:flex-row">
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("relationship", {
                                                    required: false,
                                                }),
                                            }}
                                            // register={{
                                            //     ...register("relationship", {
                                            //         required:
                                            //             "Emergency Contact Relationship is required",
                                            //     }),
                                            // }}
                                            // errorMessage={
                                            //     errors?.relationship?.message
                                            // }
                                            name="relationship"
                                            label="Relationship"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input2
                                            register={{
                                                ...register("ephone", {
                                                    required: false,
                                                }),
                                            }}
                                            name="ephone"
                                            label="Contact No."
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        CV Upload{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Dragger {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag PDF file to this area
                                            to upload your CV
                                        </p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload.
                                            Only PDF files are allowed.
                                        </p>
                                    </Dragger>
                                    {files.length === 0 && (
                                        <p className="text-red-500 text-sm">
                                            Please upload your CV or resume here
                                            in PDF format.
                                        </p>
                                    )}
                                </div>

                                {/* Email Check Reminder */}
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                <strong>
                                                    Important Reminder:
                                                </strong>{" "}
                                                Please ensure your email address
                                                is correct. After submitting
                                                your application, regularly
                                                check your email (including
                                                spam/junk folder) for updates
                                                regarding your application
                                                status and any further
                                                instructions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 border-l-4 border-gray-400 p-4">
                                    <div className="ml-3">
                                        <div className="flex items-start gap-2 text-sm text-gray-700">
                                            <Checkbox
                                                register={{
                                                    ...register(
                                                        "privacy_policy",
                                                        {
                                                            required:
                                                                "You must agree to the Privacy Policy to proceed.",
                                                        },
                                                    ),
                                                }}
                                                name="privacy_policy"
                                            />
                                            <p className="leading-5">
                                                I have read and agree to the
                                                Privacy Policy. Read our full
                                                Privacy Policy{" "}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        window.open(
                                                            "/privacy_policy",
                                                            "_blank",
                                                        )
                                                    }
                                                    className="text-blue-600 underline"
                                                >
                                                    Here
                                                </button>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                    {errors?.privacy_policy && (
                                        <div className="ml-11">
                                            <p className="text-red-500 text-sm">
                                                <i>
                                                    {
                                                        errors.privacy_policy
                                                            .message
                                                    }
                                                </i>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-end justify-end">
                                    <div className="w-full">
                                        {/* Progress Bar */}
                                        {(isSubmitting || isUploading) && (
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                    <span>
                                                        Submitting
                                                        Application...
                                                    </span>
                                                    <span>
                                                        {uploadProgress}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                                                        style={{
                                                            width: `${uploadProgress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            disabled={
                                                isSubmitting || isUploading
                                            }
                                            type="submit"
                                            className={`w-full text-white px-4 py-2 rounded flex items-center justify-center gap-2 transition-all duration-200 ${
                                                isSubmitting || isUploading
                                                    ? "bg-blue-400 cursor-not-allowed"
                                                    : "bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
                                            }`}
                                        >
                                            {(isSubmitting || isUploading) && (
                                                <svg
                                                    className="animate-spin h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            )}
                                            {isSubmitting || isUploading
                                                ? `Submitting Application... (${uploadProgress}%)`
                                                : "Submit Application"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
