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
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal } from "antd";
import { Link, router, usePage } from "@inertiajs/react";
import AdminFooterComponents from "./_components/admin-footer-components";
import { KeyIcon } from "@heroicons/react/24/outline";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import { get_user_thunk, get_users_thunk } from "../redux/app-thunk";
import UpdateProfile from "../_components/update-profile";
const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [changePassModalOpen, setChangePassModalOpen] = useState(false);
    const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
    const { user } = useSelector((state) => state.app);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        store.dispatch(get_users_thunk());
        console.log('waaaa', user)
        store.dispatch(get_user_thunk());
    }, [user.id]);
    const items = [
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
                    onClick: () =>
                        router.visit(
                            "/admin/sourcing/erf_record"
                        ),
                },
                // {
                //     key: "resource_requests",
                //     icon: <HolderOutlined />,
                //     label: "Resource Request",
                //     children: [
                //         {
                //             key: "erf_record",
                //             icon: <MoreOutlined />,
                //             label: "ERF Record",
                //             onClick: () =>
                //                 router.visit(
                //                     "/admin/sourcing/resource_requests/erf_record"
                //                 ),
                //         },
                //     ],
                // },
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
                    // onClick: () =>
                    //     router.visit(
                    //         "/admin/recruitment/applicant_records?page=1"
                    //     ),
                    children: [
                        {
                            key: "applicant_recordss",
                            icon: <HolderOutlined />,
                            label: "All Records",
                            onClick: () => router.visit("/admin/recruitment/applicant_records?page=1"),
                        },
                        {
                            key: "pending",
                            icon: <HolderOutlined />,
                            label: "Pending",
                            onClick: () => router.visit("/admin/recruitment/applicant_records?page=1&status=Pending&site=null"),
                        },
                        {
                            key: "initial_phase",
                            icon: <HolderOutlined />,
                            label: "Initial Phase",
                            onClick: () => router.visit("/admin/recruitment/applicant_records?page=1&status=Initial%20Phase&site=null"),
                        },
                        {
                            key: "final_phase",
                            icon: <HolderOutlined />,
                            label: "Final Phase",
                            onClick: () => router.visit("/admin/recruitment/applicant_records?page=1&status=Final%20Phase&site=null"),
                        },
                        {
                            key: "pooling",
                            icon: <HolderOutlined />,
                            label: "Pooling",
                            onClick: () => router.visit("/admin/recruitment/applicant_records?page=1&status=Pooling&site=nul"),
                        },
                        {
                            key: "shortlisted",
                            icon: <HolderOutlined />,
                            label: "Short Listed",
                            onClick: () => router.visit("/admin/recruitment/applicant_records?page=1&status=Shortlisted&site=null"),
                        },
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
                {
                    key: "acknowledgement",
                    icon: <HolderOutlined />,
                    label: "Acknowledgement",
                    onClick: () =>
                        router.visit("/admin/onboarding/acknowledgement"),
                },
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
                            "/admin/employee_relation/employee_section?page=1"
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
                        defaultSelectedKeys={active.split('?')[0]}
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
                                    className={`z-10 ${isOpen ? "block" : "hidden"
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
                                        <li class="flex items-center text-lg  px-2">
                                            <button
                                                className="flex flex-1"
                                                onClick={() => {
                                                    setChangePassModalOpen(
                                                        true
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
                                    onOk={() => setChangePassModalOpen(false)}
                                    onCancel={() =>
                                        setChangePassModalOpen(false)
                                    }
                                    footer={null}
                                >
                                    <li className="bg-gray-300 h-0.5"></li>
                                    <div className="flex flex-1 gap-2 w-full mt-1">
                                        <form class="w-full h-full">
                                            <h1 className="text-xl">
                                                <b>Account Information</b>
                                            </h1>
                                            <div class="flex flex-col -mx-3 mb-3 mt-3">
                                                <div class="w-full px-2.5">
                                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="password"
                                                        placeholder=""
                                                    />
                                                </div>
                                                <div class="w-full px-2.5">
                                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1">
                                                        New Password
                                                    </label>
                                                    <input
                                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="password"
                                                        placeholder=""
                                                    />
                                                </div>
                                                <div class="w-full px-2.5">
                                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1">
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="password"
                                                        placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                                                <CheckCircleFilled /> Change
                                                Password
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
