import React, { useEffect, useRef, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoreOutlined,
    UserOutlined,
    HolderOutlined,
    UsergroupAddOutlined,
    FileSearchOutlined,
    SignatureOutlined,
    MedicineBoxOutlined,
    UserDeleteOutlined,
    ContactsOutlined,
    IdcardOutlined,
    AppstoreOutlined,
    DashboardOutlined,
    BookOutlined,
    PoweroffOutlined,
    SettingOutlined,
    CheckCircleFilled,
    TeamOutlined,
    QuestionOutlined,
    AuditOutlined,
    HistoryOutlined,
    FieldTimeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal, message } from "antd";
import { Link, router, usePage } from "@inertiajs/react";
import AdminFooterComponents from "./_components/admin-footer-components";
import { KeyIcon } from "@heroicons/react/24/outline";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import {
    get_user_thunk,
    get_users_thunk,
    change_password_thunk,
} from "../redux/app-thunk";
import UpdateProfile from "../_components/update-profile";
const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [changePassModalOpen, setChangePassModalOpen] = useState(false);
    const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [passwordErrors, setPasswordErrors] = useState({});
    const [passwordLoading, setPasswordLoading] = useState(false);
    const { user } = useSelector((state) => state.app);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        async function loadData() {
            await store.dispatch(get_users_thunk());
            await store.dispatch(get_user_thunk());
        }
        loadData();
    }, [user.id]);

    // Special menu items for role_id == 10 (ERF users)
    const erfUserItems = [
        {
            key: "sourcing",
            icon: <BookOutlined />,
            label: "Sourcing",
            children: [
                {
                    key: "erf_record",
                    icon: <HolderOutlined />,
                    label: "ERF Record",
                    onClick: () => router.visit("/employee/erf_record"),
                },
            ],
        },
    ];

    // Full admin menu items for other roles
    const adminItems = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            onClick: () => router.visit("/admin/dashboard"),
        },
        {
            key: "sourcing",
            icon: <BookOutlined />,
            label: "Sourcing",
            children: [
                {
                    key: "account",
                    icon: <HolderOutlined />,
                    label: "Accounts",
                    onClick: () => router.visit("/admin/sourcing/account"),
                },
                {
                    key: "department",
                    icon: <HolderOutlined />,
                    label: "Department",
                    onClick: () => router.visit("/admin/sourcing/department"),
                },
                {
                    key: "job_title_section",
                    icon: <HolderOutlined />,
                    label: "Job Title Section",
                    onClick: () =>
                        router.visit("/admin/sourcing/job_title_section"),
                },
                {
                    key: "erf_record",
                    icon: <HolderOutlined />,
                    label: "ERF Record",
                    onClick: () => router.visit("/admin/sourcing/erf_record"),
                },
            ],
        },
        {
            key: "recruitment",
            icon: <UsergroupAddOutlined />,
            label: "Recruitment",
            children: [
                {
                    key: "guide_question",
                    icon: <QuestionOutlined />,
                    label: "Guide Questions",
                    onClick: () =>
                        router.visit("/admin/recruitment/guide_question"),
                },
                // {
                //     key: "applicants",
                //     icon: <HolderOutlined />,
                //     label: "Applicants Section",
                //     children: [
                //         {
                //             key: "applicant_records",
                //             icon: <MoreOutlined />,
                //             label: "Application Records",
                //             onClick: () =>
                //                 router.visit(
                //                     "/admin/recruitment/applicants/applicant_records?page=1"
                //                 ),
                //         },
                //     ],
                // },
                {
                    key: "applicant_records",
                    icon: <TeamOutlined />,
                    label: "Application Records",
                    children: [
                        {
                            key: "applicant_recordss",
                            icon: <HolderOutlined />,
                            label: "All Records",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1",
                                ),
                        },
                        {
                            key: "pending",
                            icon: <HolderOutlined />,
                            label: "Pending",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=Pending&site=null",
                                ),
                        },
                        {
                            key: "initial_phase",
                            icon: <HolderOutlined />,
                            label: "Initial Phase",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=Initial%20Phase&site=null",
                                ),
                        },
                        {
                            key: "for_final_phase",
                            icon: <HolderOutlined />,
                            label: "For Final Phase",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=For%20Final%20Phase&site=null",
                                ),
                        },
                        {
                            key: "final_phase",
                            icon: <HolderOutlined />,
                            label: "Final Phase",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=Final%20Phase&site=null",
                                ),
                        },
                        {
                            key: "failed",
                            icon: <HolderOutlined />,
                            label: "Failed",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=Failed&site=null",
                                ),
                        },
                        {
                            key: "send_failed",
                            icon: <HolderOutlined />,
                            label: "Send Failed",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=Send%20Failed&site=null",
                                ),
                        },
                        {
                            key: "passed",
                            icon: <HolderOutlined />,
                            label: "Passed",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=Passed&site=null",
                                ),
                        },
                        {
                            key: "pooling",
                            icon: <HolderOutlined />,
                            label: "Pooling",
                            onClick: () =>
                                router.visit(
                                    "/admin/recruitment/applicant_records?page=1&status=Pooling&site=null",
                                ),
                        },
                        // {
                        //     key: "shortlisted",
                        //     icon: <HolderOutlined />,
                        //     label: "Short Listed",
                        //     onClick: () => router.visit("/admin/recruitment/applicant_records?page=1&status=Shortlisted&site=null"),
                        // },
                    ],
                },
            ],
        },
        {
            key: "hiring",
            icon: <FileSearchOutlined />,
            label: "Hiring",
            children: [
                {
                    key: "pre_employment",
                    icon: <HolderOutlined />,
                    label: "Pre-Employment ",
                    onClick: () => router.visit("/admin/hiring/pre_employment"),
                },
                {
                    key: "hiring_section",
                    icon: <HolderOutlined />,
                    label: "Hiring Section",
                    onClick: () => router.visit("/admin/hiring/hiring_section"),
                },
            ],
        },
        {
            key: "onboarding",
            icon: <SignatureOutlined />,
            label: "Onboarding",
            children: [
                {
                    key: "onboarding_docu",
                    icon: <HolderOutlined />,
                    label: "Documents",
                    onClick: () =>
                        router.visit("/admin/onboarding/onboarding_docu"),
                },
                // {
                //     key: "acknowledgement",
                //     icon: <HolderOutlined />,
                //     label: "Acknowledgement",
                //     onClick: () =>
                //         router.visit("/admin/onboarding/acknowledgement"),
                // },
            ],
        },
        {
            key: "employee_relation",
            icon: <IdcardOutlined />,
            label: "Employee Relation",
            children: [
                {
                    key: "employee_section",
                    icon: <HolderOutlined />,
                    label: "Employee Section",
                    onClick: () =>
                        router.visit(
                            "/admin/employee_relation/employee_section?page=1",
                        ),
                },
                // {
                //     key: "upload_memo",
                //     icon: <HolderOutlined />,
                //     label: "Upload Memo",
                //     onClick: () =>
                //         router.visit("/admin/employee_relation/upload_memo"),
                // },
            ],
        },
        {
            key: "attrition",
            icon: <UserDeleteOutlined />,
            label: "Attrition",
            children: [
                {
                    key: "attrition_section",
                    icon: <HolderOutlined />,
                    label: "Attrition Section",
                    onClick: () =>
                        router.visit("/admin/attrition/attrition_section"),
                },
            ],
        },
        {
            key: "compliance_training",
            icon: <AuditOutlined />,
            label: "Compliance Training",
            onClick: () => router.visit("/admin/compliance"),
        },
        {
            key: "coaching_logs",
            icon: <FieldTimeOutlined />,
            label: "Coaching Logs",
            onClick: () => router.visit("/admin/coaching_logs"),
        },
        // {
        //     key: "employee_wellness",
        //     icon: <MedicineBoxOutlined />,
        //     label: "Employee Wellness",
        //     children: [
        //         {
        //             key: "medicine_records",
        //             icon: <HolderOutlined />,
        //             label: "Medicine Records",
        //             onClick: () =>
        //                 router.visit(
        //                     "/admin/employee_wellness/medicine_records"
        //                 ),
        //         },
        //         {
        //             key: "employee_health_data",
        //             icon: <HolderOutlined />,
        //             label: "Employee Health Data",
        //             onClick: () =>
        //                 router.visit(
        //                     "/admin/employee_wellness/employee_health_data"
        //                 ),
        //         },
        //     ],
        // },
        // {
        //     key: "engagement_section",
        //     icon: <ContactsOutlined />,
        //     label: "Engagement Section",
        //     children: [
        //         {
        //             key: "engagement_dashboard",
        //             icon: <HolderOutlined />,
        //             label: "Engagement Dashboard",
        //             onClick: () =>
        //                 router.visit(
        //                     "/admin/engagement_section/engagement_dashboard"
        //                 ),
        //         },
        //         {
        //             key: "calendar_activities",
        //             icon: <HolderOutlined />,
        //             label: "Calendar of Activities",
        //             onClick: () =>
        //                 router.visit(
        //                     "/admin/engagement_section/calendar_activities"
        //                 ),
        //         },
        //         {
        //             key: "emart",
        //             icon: <HolderOutlined />,
        //             label: "E-mart Section",
        //             onClick: () =>
        //                 router.visit(
        //                     "/admin/engagement_section/emart"
        //                 ),
        //         },
        //     ],
        // },
        // {
        //     key: "ceo_Section",
        //     icon: <UserOutlined />,
        //     label: "CEO Section",
        //     onClick: () => router.visit("/admin/ceo_section"),
        // },
    ];

    // Choose which menu items to show based on user role
    const items = user.role_id == "10" ? erfUserItems : adminItems;

    const dropdownRef = useRef(null);

    const handleButtonClick = () => {
        console.log("click left button");
        setVirtualFinalModalOpen(true);
        alert("");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (passwordErrors[name]) {
            setPasswordErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordLoading(true);
        setPasswordErrors({});

        // Basic validation
        const errors = {};
        if (!passwordForm.current_password) {
            errors.current_password = "Current password is required";
        }
        if (!passwordForm.password) {
            errors.password = "New password is required";
        }
        if (!passwordForm.password_confirmation) {
            errors.password_confirmation = "Password confirmation is required";
        }
        if (passwordForm.password !== passwordForm.password_confirmation) {
            errors.password_confirmation = "Passwords do not match";
        }
        if (passwordForm.password && passwordForm.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        }

        if (Object.keys(errors).length > 0) {
            setPasswordErrors(errors);
            setPasswordLoading(false);
            return;
        }

        try {
            const result = await store.dispatch(
                change_password_thunk(passwordForm),
            );

            if (result.success) {
                // Success
                setChangePassModalOpen(false);
                resetPasswordForm();
                message.success("Password changed successfully!");
            }
        } catch (error) {
            console.error("Password change error:", error);

            // Handle validation errors from server
            if (error.errors && Object.keys(error.errors).length > 0) {
                // Convert Laravel validation errors (arrays) to strings
                const formattedErrors = {};
                Object.keys(error.errors).forEach((key) => {
                    formattedErrors[key] = Array.isArray(error.errors[key])
                        ? error.errors[key][0] // Take first error message
                        : error.errors[key];
                });
                setPasswordErrors(formattedErrors);
                message.error("Please check the form for errors.");
            } else if (error.status === 422) {
                // Handle direct response errors
                setPasswordErrors({
                    general:
                        error.message ||
                        "Validation failed. Please check your inputs.",
                });
                message.error("Validation failed. Please check your inputs.");
            } else if (
                error.status === 401 ||
                error.message.includes("password is incorrect")
            ) {
                setPasswordErrors({
                    current_password: "Current password is incorrect.",
                });
                message.error("Current password is incorrect.");
            } else {
                setPasswordErrors({
                    general:
                        error.message ||
                        "An error occurred while changing password. Please try again.",
                });
                message.error("An error occurred. Please try again.");
            }
        } finally {
            setPasswordLoading(false);
        }
    };

    const resetPasswordForm = () => {
        setPasswordForm({
            current_password: "",
            password: "",
            password_confirmation: "",
        });
        setPasswordErrors({});
    };

    const path = url.split("/").slice(1, -1);
    const active = url.split("/")[5]
        ? url.split("/")[url.split("/").length - 2]
        : url.split("/")[url.split("/").length - 1];

    return (
        <div>
            <Layout className="h-screen">
                <Sider
                    width={260}
                    theme="light"
                    className="shadow-lg"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <img src="/images/logo.png" />
                    <div className="flex items-center justify-between px-5 py-5">
                        <div className="flex items-center mr-5">
                            <div className="mr-5">
                                <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                                    <img
                                        className="w-[45px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                                        src="/images/pngegg.png"
                                        alt="avatar image"
                                    />
                                </div>
                            </div>
                            <div
                                className={`${collapsed ? "hidden" : ""} mr-2`}
                            >
                                <a className=" flex hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium text-secondary-inverse">
                                    {user.employee_fname} {user.employee_lname}
                                </a>
                                <span className=" font-medium block text-[0.85rem]">
                                    {user.position}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Menu
                        className="text-lg font-sans"
                        mode="inline"
                        defaultSelectedKeys={active.split("?")[0]}
                        defaultOpenKeys={path.slice(1 - path.length)}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div className="flex flex-1">
                            <div>
                                <Button
                                    type="text"
                                    icon={
                                        collapsed ? (
                                            <MenuUnfoldOutlined />
                                        ) : (
                                            <MenuFoldOutlined />
                                        )
                                    }
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: "16px",
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </div>
                            <div className="flex flex-auto justify-end mr-5">
                                <button onClick={toggleDropdown}>
                                    <SettingOutlined className="text-2xl" />
                                </button>
                                <div
                                    ref={dropdownRef}
                                    id="dropdown"
                                    className={`z-10 ${
                                        isOpen ? "block" : "hidden"
                                    } absolute w-auto p-3 px-5 bg-white rounded-lg shadow-lg  mt-4`}
                                >
                                    <h6 className="mb-3 text-sm font-medium ">
                                        Account Controls
                                    </h6>
                                    <ul
                                        className="space-y-2 text-sm"
                                        aria-labelledby="dropdownDefault"
                                    >
                                        <li class="flex items-center text-lg  px-2">
                                            <UpdateProfile user={user} />
                                            {/* <button
                                                onClick={() => {
                                                    setUpdateProfileModalOpen(
                                                        true
                                                    );
                                                    toggleDropdown(false);
                                                }}
                                            >
                                                <h6 className="text-lg">
                                                    <UserOutlined className="text-lg mr-2" />
                                                    Update Profile
                                                </h6>
                                            </button> */}
                                        </li>
                                        <li className="flex items-center text-lg  px-2">
                                            <button
                                                className="flex flex-1"
                                                onClick={() => {
                                                    resetPasswordForm();
                                                    setChangePassModalOpen(
                                                        true,
                                                    );
                                                    toggleDropdown(false);
                                                }}
                                            >
                                                <KeyIcon className="h-5 mt-1 mr-2" />
                                                <h6 className="text-lg">
                                                    Change Password
                                                </h6>
                                            </button>
                                        </li>

                                        <hr class=" h-0.5 w-full border-t-0 bg-neutral-200" />
                                        <li class="flex justify-center items-center text-lg mt-2.5">
                                            <Link
                                                method="post"
                                                as="button"
                                                href={route("logout")}
                                                className=" w-full pb-1 bg-slate-300 rounded-md hover:bg-slate-400 hover:text-white "
                                            >
                                                <h6 className="text-lg font-medium">
                                                    <PoweroffOutlined className="text-sm mr-1 mt-2" />
                                                    Log out
                                                </h6>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <Modal
                                    title="Update My Profile"
                                    centered
                                    visible={updateProfileModalOpen}
                                    onOk={() =>
                                        setUpdateProfileModalOpen(false)
                                    }
                                    onCancel={() =>
                                        setUpdateProfileModalOpen(false)
                                    }
                                    width={1200}
                                    footer={null}
                                >
                                    <li className="bg-gray-300 h-0.5"></li>
                                    <div className="flex flex-1 w-full mt-1">
                                        <form class="w-full h-full">
                                            <h1 className="text-xl">
                                                <b>My Personal Information</b>
                                            </h1>
                                            <div class="flex flex-col -mx-3 mb-3 mt-3">
                                                <div class="w-full px-2.5">
                                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1">
                                                        Employee's ID
                                                    </label>
                                                    <input
                                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="number"
                                                        placeholder=""
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="flex flex-1">
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Employee's Firstname
                                                        </label>
                                                        <input
                                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            type="text"
                                                            placeholder=""
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Employee's
                                                            Middlename
                                                        </label>
                                                        <input
                                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            type="text"
                                                            placeholder=""
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Employee's Lastname
                                                        </label>
                                                        <input
                                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            type="text"
                                                            placeholder=""
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Employee's Suffix
                                                        </label>
                                                        <select
                                                            className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name=""
                                                            id=""
                                                        >
                                                            <option value=""></option>
                                                            <option value="">
                                                                Jr.
                                                            </option>
                                                            <option value="">
                                                                Sr.
                                                            </option>
                                                            <option value="">
                                                                II
                                                            </option>
                                                            <option value="">
                                                                III
                                                            </option>
                                                            <option value="">
                                                                IV
                                                            </option>
                                                            <option value="">
                                                                V
                                                            </option>
                                                            <option value="">
                                                                VI
                                                            </option>
                                                            <option value="">
                                                                VII
                                                            </option>
                                                            <option value="">
                                                                VIII
                                                            </option>
                                                            <option value="">
                                                                IX
                                                            </option>
                                                            <option value="">
                                                                X
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 ">
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Employee's Gender
                                                        </label>
                                                        <select
                                                            className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name=""
                                                            id=""
                                                        >
                                                            <option value=""></option>
                                                            <option value="">
                                                                Male
                                                            </option>
                                                            <option value="">
                                                                Female
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Department
                                                        </label>
                                                        <input
                                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            type="text"
                                                            placeholder=""
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Position
                                                        </label>
                                                        <input
                                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            type="text"
                                                            placeholder=""
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div class="w-full px-2.5">
                                                        <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                                            Profile Picture
                                                        </label>
                                                        <input
                                                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            type="file"
                                                            placeholder=""
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                                                <CheckCircleFilled /> Save
                                                Changes
                                            </button>
                                        </form>
                                    </div>
                                </Modal>
                                <Modal
                                    title="Change Account Password"
                                    centered
                                    visible={changePassModalOpen}
                                    onOk={() => {
                                        setChangePassModalOpen(false);
                                        resetPasswordForm();
                                    }}
                                    onCancel={() => {
                                        setChangePassModalOpen(false);
                                        resetPasswordForm();
                                    }}
                                    footer={null}
                                >
                                    <li className="bg-gray-300 h-0.5"></li>
                                    <div className="flex flex-1 gap-2 w-full mt-1">
                                        <form
                                            className="w-full h-full"
                                            onSubmit={handlePasswordSubmit}
                                        >
                                            {passwordErrors.general && (
                                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                                    {passwordErrors.general}
                                                </div>
                                            )}
                                            <div className="flex flex-col -mx-3 mb-3 mt-3">
                                                <div className="w-full px-2.5">
                                                    <label className="block uppercase tracking-wide text-xs font-bold mb-1">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        className={`appearance-none block w-full border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white ${
                                                            passwordErrors.current_password
                                                                ? "border-red-500"
                                                                : "border-gray-400 focus:border-gray-500"
                                                        }`}
                                                        type="password"
                                                        name="current_password"
                                                        value={
                                                            passwordForm.current_password
                                                        }
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                        placeholder="Enter your current password"
                                                    />
                                                    {passwordErrors.current_password && (
                                                        <p className="text-red-500 text-xs mb-3">
                                                            {
                                                                passwordErrors.current_password
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="w-full px-2.5">
                                                    <label className="block uppercase tracking-wide text-xs font-bold mb-1">
                                                        New Password
                                                    </label>
                                                    <input
                                                        className={`appearance-none block w-full border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white ${
                                                            passwordErrors.password
                                                                ? "border-red-500"
                                                                : "border-gray-400 focus:border-gray-500"
                                                        }`}
                                                        type="password"
                                                        name="password"
                                                        value={
                                                            passwordForm.password
                                                        }
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                        placeholder="Enter your new password"
                                                    />
                                                    {passwordErrors.password && (
                                                        <p className="text-red-500 text-xs mb-3">
                                                            {
                                                                passwordErrors.password
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="w-full px-2.5">
                                                    <label className="block uppercase tracking-wide text-xs font-bold mb-1">
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        className={`appearance-none block w-full border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white ${
                                                            passwordErrors.password_confirmation
                                                                ? "border-red-500"
                                                                : "border-gray-400 focus:border-gray-500"
                                                        }`}
                                                        type="password"
                                                        name="password_confirmation"
                                                        value={
                                                            passwordForm.password_confirmation
                                                        }
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                        placeholder="Confirm your new password"
                                                    />
                                                    {passwordErrors.password_confirmation && (
                                                        <p className="text-red-500 text-xs mb-3">
                                                            {
                                                                passwordErrors.password_confirmation
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={passwordLoading}
                                                className={`w-full text-white font-bold py-2 px-4 rounded-lg ${
                                                    passwordLoading
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-blue-500 hover:bg-blue-700"
                                                }`}
                                            >
                                                <CheckCircleFilled />
                                                {passwordLoading
                                                    ? "Changing..."
                                                    : "Change Password"}
                                            </button>
                                        </form>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </Header>
                    <Content
                        className="overflow-auto"
                        style={{
                            // margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                    <AdminFooterComponents />
                </Layout>
            </Layout>
        </div>
    );
};
export default AdminLayout;
