import { useDispatch, useSelector } from "react-redux";
import store from "@/app/store/store";
import region from "@/app/address/region.json";
import province from "@/app/address/province.json";
import city from "@/app/address/city.json";
import barangay from "@/app/address/barangay.json";
import moment from "moment";
// import Input from '../../_components/input';
// import Select from '../../_components/select';
import Select2 from "@/app/pages/_components/select2";
import { useEffect } from "react";
import { InboxOutlined, UserAddOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React, { useState } from "react";
import UploadResumeSection from "./upload-resume-section";
import WorkingExperienceSection from "./working-experience-section";
import { setApplicantForm } from "../../../recruitment/applicants/applicant_records/redux/applicant-slice";
import {
    get_applicant_thunk,
    store_applicant_thunk,
} from "../../../recruitment/applicants/applicant_records/redux/applicant-thunk";
import Input from "@/app/pages/_components/input";
import Select from "@/app/pages/_components/select";
import {
    get_employee_thunk,
    store_employee_thunk,
} from "../redux/employee-section-thunk";
import { wait } from "ckeditor5";
import { get_job_position_thunk } from "../../../sourcing/job_title_section/redux/job-title-thunk";
import { get_department_thunk } from "../../../sourcing/department/redux/department-thunk";
import { useForm } from "react-hook-form";
import Dragger from "antd/es/upload/Dragger";
import Input2 from "@/app/pages/_components/input2";
import Checkbox from "@/app/pages/_components/checkbox";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddExistingEmployeeSection() {
    const [open, setOpen] = useState(false);
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const { users } = useSelector((state) => state.app);
    const { user } = useSelector((state) => state.app);
    const [showWorkingExperience, setShowWorkingExperience] = useState(false);
    const [showFirstTimeJobseeker, setShowFirstTimeJobseeker] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState({});

    const [files, setFiles] = useState([]);

    const [applicationCount, setApplicationCount] = useState(0);
    const { applicantForm } = useSelector((state) => state.applicants);
    const [newProvince, setNewProvince] = useState([]);
    const [newCity, setNewCity] = useState([]);
    const [newBarangay, setNewBarangay] = useState([]);

    const [hasExperience, setHasExperience] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm({
        defaultValues: {
            work_experience: [
                { company: "", position: "", started_at: "", end_at: "" },
            ],
        },
    });

    useEffect(() => {
        if (open) {
            store.dispatch(get_job_position_thunk());
            store.dispatch(get_department_thunk());
        }
    }, [open]);

    useEffect(() => {
        const fetchApplicationCount = async () => {
            const count = 0;
            setApplicationCount(count);
        };
        fetchApplicationCount();
        setLoading(false);
    }, []);

    function changeHandler(e) {
        const data = e.target.name;
        if (data == "image") {
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [data]: e.target.files,
                }),
            );
        } else {
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [data]: e.target.value,
                }),
            );
        }
    }
    console.log("query", applicantForm);

    async function submitApplicant(data) {
        console.log("aaaaaaaaaaaaaaaaa", data);
        // const fd = new FormData()
        // fd.append('files', uploadedFile)
        // fd.append('site', user.site ?? "")
        // fd.append('app_id', applicantForm.app_id ?? "")
        // fd.append('fname', applicantForm.fname ?? "")
        // fd.append('mname', applicantForm.mname ?? "")
        // fd.append('lname', applicantForm.lname ?? "")
        // fd.append('suffix', applicantForm.suffix ?? "")
        // fd.append('dob', applicantForm.dob ?? "")
        // fd.append('religion', applicantForm.religion ?? "")
        // fd.append('email', applicantForm.email ?? "")
        // fd.append('nationality', applicantForm.nationality ?? "")
        // fd.append('phone', applicantForm.phone ?? "")
        // fd.append('mmname', applicantForm.mmname ?? "")
        // fd.append('ffname', applicantForm.ffname ?? "")
        // fd.append('courset', applicantForm.courset ?? "")
        // fd.append('hired', applicantForm.hired ?? "")
        // fd.append('lot', applicantForm.lot ?? "")
        // fd.append('sss', applicantForm.sss ?? "")
        // fd.append('pagibig', applicantForm.pagibig ?? "")
        // fd.append('tin', applicantForm.tin ?? "")
        // fd.append('philh', applicantForm.philh ?? "")
        // fd.append('ename', applicantForm.ename ?? "")
        // fd.append('eaddress', applicantForm.eaddress ?? "")
        // fd.append('relationship', applicantForm.relationship ?? "")
        // fd.append('ephone', applicantForm.ephone ?? "")
        // fd.append('marital', applicantForm.marital ?? "")
        // fd.append('gender', applicantForm.gender ?? "")
        // fd.append('account', applicantForm.account ?? "")
        // fd.append('region', applicantForm.region ?? "")
        // fd.append('city', applicantForm.city ?? "")
        // fd.append('brgy', applicantForm.brgy ?? "")
        // fd.append('position', applicantForm.position ?? "")
        // fd.append('dept', applicantForm.dept ?? "")
        // fd.append('account', applicantForm.account ?? "")
        // fd.append('sup_id', applicantForm.sup_id ?? "")
        // fd.append('province', applicantForm.province ?? "")
        // fd.append('status', applicantForm.status ?? "")

        try {
            // applicantForm.work_experience.forEach((value) => {
            //     fd.append("work_experience[]", JSON.stringify({
            //         app_id: applicantForm.app_id,
            //         company: value.company,
            //         position: value.position,
            //         started_at: value.started_at,
            //         end_at: value.end_at,
            //     }));
            // });
            // await dispatch(
            //     setApplicantForm({
            //         ...applicantForm,
            //         submitted: moment().format('YYYY-MM-DD'),
            //         app_id: applicantForm.app_id
            //     })
            // );
            await store.dispatch(
                store_employee_thunk({
                    ...data,
                    province: JSON.parse(data?.province).name,
                    city: JSON.parse(data?.city).name,
                    region: JSON.parse(data?.region).name,
                    files: files.map((res) => res.files),
                    is_experience: hasExperience,
                }),
            );
            await store.dispatch(get_applicant_thunk());
            await store.dispatch(get_employee_thunk());
            message.success("Employee Saved successfully");
            reset();
            setFiles([]);
            setOpen(false);
        } catch (error) {
            console.log("bbbbbb", error);
            message.error("Employee failed to saved");
        }
    }

    // const handleWorkingExperienceChange = (e) => {
    //     setShowWorkingExperience(e.target.checked);
    //     setShowFirstTimeJobseeker(false);
    // };

    // const handleFirstTimeJobseekerChange = (e) => {
    //     setShowFirstTimeJobseeker(e.target.checked);
    //     setShowWorkingExperience(false);
    // };

    function data_handler(e) {
        if (e.target.name == "region") {
            const region = JSON.parse(e.target.value);
            const prov = province.filter(
                (obj) => obj.region_code === region.region_code,
            );
            setNewProvince(prov);
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: region.name,
                }),
            );
        } else if (e.target.name == "province") {
            const province = JSON.parse(e.target.value);
            const ct = city.filter(
                (obj) => obj.province_code === province.province_code,
            );
            setNewCity(ct);
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: province.name,
                }),
            );
        } else if (e.target.name == "city") {
            const city = JSON.parse(e.target.value);
            const brgy = barangay.filter(
                (obj) => obj.city_code === city.city_code,
            );
            setNewBarangay(brgy);
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: city.name,
                }),
            );
        } else {
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: e.target.value,
                }),
            );
        }
    }

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

    const props = {
        name: "file",
        multiple: true,
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
    console.log("ssssssssss", users);
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UserAddOutlined className="text-xl" />
                    Add Existing Employee
                </button>
            </div>
            <Modal
                title="Existing Employee"
                // centered
                confirmLoading={loading}
                open={open}
                onOk={submitApplicant}
                onCancel={() => setOpen(false)}
                width={1200}
                okText="Save"
                cancelText="Cancel"
                footer={null}
            >
                <form
                    onSubmit={handleSubmit(submitApplicant)}
                    className="space-y-4 px-8 py-8"
                >
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                        Site Information
                    </h1>
                    <div className="flex-1">
                        <Select2
                            register={{
                                ...register("site", {
                                    required: "Site is required",
                                }),
                            }}
                            options={[
                                { label: "San Carlos", value: "San Carlos" },
                                { label: "Carcar", value: "Carcar" },
                                { label: "Cebu", value: "Cebu" },
                            ]}
                            errorMessage={errors?.site?.message}
                            label="Site"
                            name="site"
                        />
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                        Personal Information
                    </h1>
                    <div className="flex-1">
                        <Input2
                            register={{
                                ...register("app_id", {
                                    required: "Employee ID is required",
                                }),
                            }}
                            errorMessage={errors?.app_id?.message}
                            name="app_id"
                            label="Employee ID"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div className="flex-1">
                            <Input2
                                register={{
                                    ...register("fname", {
                                        required: "First Name is required",
                                    }),
                                }}
                                errorMessage={errors?.fname?.message}
                                name="fname"
                                label="First Name"
                                type="text"
                            />
                        </div>
                        <div className="flex-1">
                            <Input2
                                register={{
                                    ...register("mname", {
                                        // required: "Middle Name is required",
                                    }),
                                }}
                                // errorMessage={errors?.mname?.message}
                                name="mname"
                                label="Middle Name"
                                type="text"
                            />
                        </div>
                        <div className="flex-1">
                            <Input2
                                register={{
                                    ...register("lname", {
                                        required: "Last Name is required",
                                    }),
                                }}
                                errorMessage={errors?.lname?.message}
                                name="lname"
                                label="Last Name"
                                type="text"
                            />
                        </div>
                        <div className="flex-none w-24">
                            <Select2
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
                                name="suffix"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div className="flex-1">
                            <Select2
                                register={{
                                    ...register("gender", {
                                        required: "Gender is required",
                                    }),
                                }}
                                options={[
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                ]}
                                errorMessage={errors?.gender?.message}
                                label="Gender"
                                name="gender"
                            />
                        </div>
                        <div className="flex-1">
                            <Input2
                                register={{
                                    ...register("dob", {
                                        required: "Date of Birth is required",
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
                                        required: "Email is required",
                                    }),
                                }}
                                errorMessage={errors?.email?.message}
                                name="email"
                                label="Email"
                                type="email"
                            />
                        </div>
                        <div className="flex-1">
                            <Input2
                                register={{
                                    ...register("phone", {
                                        required: "Phone is required",
                                    }),
                                }}
                                errorMessage={errors?.phone?.message}
                                name="phone"
                                label="Phone"
                                type="tel"
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
                                    { label: "Single", value: "Single" },
                                    { label: "Married", value: "Married" },
                                    { label: "Widowed", value: "Widowed" },
                                    { label: "Divorced", value: "Divorced" },
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

                    <div className="flex flex-1 gap-4">
                        <div className="flex flex-col w-full mb-4">
                            <div className="flex flex-1 gap-3">
                                <select
                                    {...register("position", {
                                        required: false,
                                    })}
                                    name="position"
                                    className="border p-2 rounded  w-full"
                                >
                                    <option disabled selected value="">
                                        Job Position
                                    </option>
                                    {job_positions
                                        .filter(
                                            (res) => res.site === "San Carlos",
                                        )
                                        .map((res, i) => (
                                            <option
                                                value={res.jPosition}
                                                key={i}
                                            >
                                                {res.jPosition}
                                            </option>
                                        ))}
                                </select>
                                <select
                                    {...register("dept", {
                                        required: false,
                                    })}
                                    name="dept"
                                    className="border p-2 rounded  w-full"
                                >
                                    <option disabled selected value="">
                                        Department
                                    </option>
                                    {departments
                                        .filter(
                                            (res) => res.site === "San Carlos",
                                        )
                                        .map((res, i) => (
                                            <option value={res.dept} key={i}>
                                                {res.dept}
                                            </option>
                                        ))}
                                </select>
                                <select
                                    {...register("account", {
                                        required: false,
                                    })}
                                    name="account"
                                    className="border p-2 rounded  w-full"
                                >
                                    <option disabled selected value="">
                                        Account (If Applicable)
                                    </option>
                                    {accounts
                                        // .filter(res => res.site === "San Carlos")
                                        .map((res, i) => (
                                            <option value={res.acc} key={i}>
                                                {res.acc}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4">
                        <div className="flex flex-col w-full mb-4">
                            <div className="flex flex-1 gap-3">
                                <select
                                    {...register("sup_id", {
                                        required: false,
                                    })}
                                    name="sup_id"
                                    value={applicantForm.sup_id}
                                    className="border p-2 rounded  w-full"
                                >
                                    <option disabled selected value="">
                                        Supervisor
                                    </option>
                                    {users
                                        .filter(
                                            (res) =>
                                                (!user?.site ||
                                                    res.site === user.site ||
                                                    !res.site) &&
                                                [
                                                    "Manager",
                                                    "Account Manager",
                                                    "Supervisor",
                                                    "Team Leader",
                                                    "Director",
                                                    "CEO",
                                                    "HR Lead",
                                                    "Accounting Head",
                                                    "TQA Manager",
                                                    "TQA Director",
                                                    "IT Manager",
                                                    "I.T Manager",
                                                    "IT Lead",
                                                    "I.T Lead",
                                                    "Compliance Officer",
                                                    "Site Admin",
                                                    "Talent Acquisition Manager",
                                                    "HR Director",
                                                    "Director of Operations",
                                                    "Operations Manager",
                                                    "Site Director",
                                                    "Site Manager",
                                                    "Director, Learning Leadership & Development",
                                                    "Director, Accounting & Finance",
                                                    "Director, Marketing & Communications",
                                                    "Director, Quality & Training",
                                                ].includes(res.position),
                                        )
                                        .sort((a, b) => {
                                            const nameA =
                                                `${a.employee_fname} ${a.employee_lname}`.toLowerCase();
                                            const nameB =
                                                `${b.employee_fname} ${b.employee_lname}`.toLowerCase();
                                            return nameA.localeCompare(nameB);
                                        })
                                        .map((res) => (
                                            <option key={res.id} value={res.id}>
                                                {res.employee_fname}{" "}
                                                {res.employee_lname}
                                            </option>
                                        ))}
                                </select>
                                <Input2
                                    register={{
                                        ...register("hired", {
                                            required: false,
                                        }),
                                    }}
                                    value={applicantForm.hired ?? ""}
                                    name="hired"
                                    label="Hired Date"
                                    type="date"
                                />
                                <select
                                    {...register("status", {
                                        required: false,
                                    })}
                                    name="status"
                                    className="border p-2 rounded  w-full"
                                    required
                                >
                                    <option disabled selected>
                                        Employee Status
                                    </option>
                                    <option> Probationary</option>
                                    <option> Regular</option>
                                    <option> Contractual</option>
                                    <option> Trainee Fallout</option>
                                </select>
                            </div>
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
                                        required: "Please Select Region",
                                    }),
                                }}
                                onChange={(event) => data_handler(event)}
                                options={region.map((res) => ({
                                    label: res.region_name,
                                    value: JSON.stringify({
                                        name: res.region_name,
                                        region_code: res.region_code,
                                    }),
                                }))}
                                // value={address.region}
                                errorMessage={errors?.region?.message}
                                label="Region"
                                name="region"
                            />
                        </div>
                        <div className="flex-1">
                            <Select
                                register={{
                                    ...register("province", {
                                        required: "Please Select Province",
                                    }),
                                }}
                                onChange={(event) => data_handler(event)}
                                options={newProvince.map((res) => ({
                                    label: res.province_name,
                                    value: JSON.stringify({
                                        name: res.province_name,
                                        province_code: res.province_code,
                                    }),
                                }))}
                                errorMessage={errors?.province?.message}
                                label="Province"
                                name="province"
                            />
                        </div>
                        <div className="flex-1">
                            <Select
                                register={{
                                    ...register("city", {
                                        required: "Please Select City",
                                    }),
                                }}
                                onChange={(event) => data_handler(event)}
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
                                        required: "Please Select Barangay",
                                    }),
                                }}
                                onChange={(event) => data_handler(event)}
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
                    {/* <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                        Working Experience
                    </h1>

                    <div className="flex-col">
                        <div className="flex items-center mb-3 justify-between">
                            <Checkbox
                                label="With Working Experience?"
                                name="hasExperience"
                                // error=""
                                onChange={(e) =>
                                    setHasExperience(e.target.checked)
                                }
                            />
                            {hasExperience && (
                                <button
                                    type="button"
                                    onClick={() => append({ name: "" })}
                                    className="bg-blue-600 text-white px-4 flex gap-2 py-2 rounded"
                                >
                                    <PlusIcon className="h-6" /> Experience
                                </button>
                            )}
                        </div>
                        {hasExperience && (
                            <div className="flex gap-3 flex-col">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="flex items-center border border-blue-500 rounded-lg p-3 flex-col w-full gap-4"
                                    >
                                        {index != 0 && (
                                            <div className="flex w-full items-end justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}

                                        <div className="w-full flex gap-3">
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
                                                    errors?.work_experience?.[
                                                        index
                                                    ]?.company?.message
                                                }
                                                name="company"
                                                label="Company"
                                                type="text"
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
                                                    errors?.work_experience?.[
                                                        index
                                                    ]?.position?.message
                                                }
                                                name="position"
                                                label="Position"
                                                type="text"
                                            />
                                        </div>

                                        <div className="w-full flex gap-3">
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
                                                    errors?.work_experience?.[
                                                        index
                                                    ]?.started_at?.message
                                                }
                                                label="Started At"
                                                type="date"
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
                                                    errors?.work_experience?.[
                                                        index
                                                    ]?.end_at?.message
                                                }
                                                label="End At"
                                                type="date"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div> */}
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
                                type="tel"
                            />
                        </div>
                    </div>
                    <br />
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload CV
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly
                            prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                    <div className="flex items-end justify-end">
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
