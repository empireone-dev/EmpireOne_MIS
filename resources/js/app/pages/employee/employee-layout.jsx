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
    NotificationOutlined,
    FileTextOutlined,
    BankOutlined,
    FileProtectOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal, Badge, message } from "antd";
import { Link, router, usePage } from "@inertiajs/react";
import { KeyIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import AdminFooterComponents from "../admin/_components/admin-footer-components";
import store from "@/app/store/store";
import { get_user_thunk, get_users_thunk, change_password_thunk } from "../redux/app-thunk";
import UpdateProfile from "../_components/update-profile";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const EmployeeLayout = ({ children }) => {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { user } = useSelector((state) => state.app);

    useEffect(() => {
        store.dispatch(get_users_thunk());
        console.log("waaaa", user);
        store.dispatch(get_user_thunk());
    }, [user.id]);

    const items = [
        // {
        //     key: "announcement",
        //     icon: (
        //         <Badge count={99} offset={[195, 0]}>
        //             <NotificationOutlined />
        //         </Badge>
        //     ),
        //     label: "Announcement",
        //     onClick: () => router.visit("/employee/announcement"),
        // },
        // {
        //     key: "employee_relation",
        //     icon: <IdcardOutlined />,
        //     label: "Employee Relation",
        //     children: [
        //         {
        //             key: "employee_section",
        //             icon: <HolderOutlined />,
        //             label: "Employee Section",
        //             onClick: () =>
        //                 router.visit(
        //                     "/employee/employee_relation/employee_section",
        //                 ),
        //         },
        //     ],
        // },
        // {
        //     key: "engagement_section",
        //     icon: (
        //         <Badge dot offset={[200, 0]}>
        //             <ContactsOutlined />
        //         </Badge>
        //     ),
        //     label: "Engagement Section",
        //     children: [
        //         {
        //             key: "today_event",
        //             icon: (
        //                 <Badge count={2} offset={[170, 0]}>
        //                     <HolderOutlined />
        //                 </Badge>
        //             ),
        //             label: "Today's Event",
        //             onClick: () =>
        //                 router.visit("/employee/engagement/today_event"),
        //         },
        //         {
        //             key: "upcoming_event",
        //             icon: <HolderOutlined />,
        //             label: "Upcoming Events",
        //             onClick: () =>
        //                 router.visit("/employee/engagement/upcoming_event"),
        //         },
        //         {
        //             key: "birthday",
        //             icon: <HolderOutlined />,
        //             label: "Birthday(s)",
        //             onClick: () =>
        //                 router.visit("/employee/engagement/birthday"),
        //         },
        //     ],
        // },
        // {
        //     key: "list_memo",
        //     icon: (
        //         <Badge count={2} offset={[195, 0]}>
        //             <FileTextOutlined />
        //         </Badge>
        //     ),
        //     label: "List of MEMO",
        //     onClick: () => router.visit("/employee/list_memo"),
        // },
        {
            key: "cocd",
            icon: <FileProtectOutlined />,
            label: "COCD (Code of Conduct and Discipline)",
            onClick: () => router.visit("/employee/cocd"),
        },
        {
            key: "employee_handbook",
            icon: <IdcardOutlined />,
            label: "Employee Handbook",
            onClick: () => router.visit("/employee/employee_handbook"),
        },
         {
            key: "code_of_ethics",
            icon: <BankOutlined />,
            label: "Code of Ethics",
            onClick: () => router.visit("/employee/code_of_ethics"),
        },
        // {
        //     key: "code_of_ethics",
        //     icon: <BankOutlined />,
        //     label: "Code of Ethics and Business Conduct",
        //     children: [
        //         {
        //             key: "employee_section",
        //             icon: <HolderOutlined />,
        //             label: "Employee Section",
        //             onClick: () => router.visit("/employee/code_of_ethics"),
        //         },
        //     ],
        // },
    ];

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
                setChangePassModalOpen(false);
                resetPasswordForm();
                message.success("Password changed successfully!");
            }
        } catch (error) {
            console.error("Password change error:", error);

            if (error.errors && Object.keys(error.errors).length > 0) {
                const formattedErrors = {};
                Object.keys(error.errors).forEach((key) => {
                    formattedErrors[key] = Array.isArray(error.errors[key])
                        ? error.errors[key][0]
                        : error.errors[key];
                });
                setPasswordErrors(formattedErrors);
                message.error("Please check the form for errors.");
            } else if (error.status === 422) {
                setPasswordErrors({
                    general:
                        error.message ||
                        "Validation failed. Please check your inputs.",
                });
                message.error("Validation failed. Please check your inputs.");
            } else if (
                error.status === 401 ||
                (error.message && error.message.includes("password is incorrect"))
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
                                <span className=" font-sm block text-[0.85rem]">
                                    {user.position}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Menu
                        className="text-lg font-sans"
                        mode="inline"
                        defaultSelectedKeys={active}
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
                        <div className="flex flex-1 ">
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
                                        </li>
                                        <li class="flex items-center text-lg  px-2">
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
                                                        value={passwordForm.current_password}
                                                        onChange={handlePasswordChange}
                                                        placeholder="Enter your current password"
                                                    />
                                                    {passwordErrors.current_password && (
                                                        <p className="text-red-500 text-xs mb-3">
                                                            {passwordErrors.current_password}
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
                                                        value={passwordForm.password}
                                                        onChange={handlePasswordChange}
                                                        placeholder="Enter your new password"
                                                    />
                                                    {passwordErrors.password && (
                                                        <p className="text-red-500 text-xs mb-3">
                                                            {passwordErrors.password}
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
                                                        value={passwordForm.password_confirmation}
                                                        onChange={handlePasswordChange}
                                                        placeholder="Confirm your new password"
                                                    />
                                                    {passwordErrors.password_confirmation && (
                                                        <p className="text-red-500 text-xs mb-3">
                                                            {passwordErrors.password_confirmation}
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
export default EmployeeLayout;
