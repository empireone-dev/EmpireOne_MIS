import React from 'react'
import AdminSidenavComponents from '../_components/admin-sidenav-components'
import { ArrowLeftEndOnRectangleIcon, BriefcaseIcon, Cog6ToothIcon, DocumentMagnifyingGlassIcon, GiftIcon, HomeIcon, InboxArrowDownIcon, ShieldCheckIcon, SquaresPlusIcon, UserCircleIcon, UserMinusIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/outline'
export default function AdminSidenavSection() {

    return (
        <div className="container flex flex-col mx-auto bg-white">
            <aside className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start" id="sidenav-main">
                <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
                    <a className="transition-colors duration-200 ease-in-out" href="https://www.loopple.com">
                        <img alt="Logo" src="/images/logo.png" className="inline" />
                    </a>
                </div>

                <div className="hidden border-b border-dashed lg:block  border-neutral-200"></div>

                <div className="flex items-center justify-between px-8 py-5">
                    <div className="flex items-center mr-5">
                        <div className="mr-5">
                            <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                                <img className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg" alt="avatar image" />
                            </div>
                        </div>
                        <div className="mr-2">
                            <a href="javascript:void(0)" className=" flex hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium  text-secondary-inverse">Sarah Bangbang</a>
                            <span className="  font-medium block text-[0.85rem]">SEO Manager</span>
                        </div>
                    </div>
                   
                </div>

                <div className="hidden border-b border-dashed lg:block  border-neutral-200"></div>

                <div className="relative px-3 my-5">
                    <div className="flex flex-col w-full font-medium">
                        <AdminSidenavComponents
                            icon={<HomeIcon className='h-6'/>}
                            name="Dashboard"
                            link="/admin/dashboard"
                        />
                        <AdminSidenavComponents
                            icon={<SquaresPlusIcon className='h-6'/>}
                            name="Sourcing"
                            link="/admin/sourcing"
                        />
                        <AdminSidenavComponents
                            icon={<UserPlusIcon className='h-6'/>}
                            name="Recruitment"
                            link="/admin/recruitment"
                        />
                        <AdminSidenavComponents
                            icon={<DocumentMagnifyingGlassIcon className='h-6'/>}
                            name="Hiring"
                            link="/admin/hiring"
                        />
                        <AdminSidenavComponents
                            icon={<BriefcaseIcon className='h-6'/>}
                            name="Onboarding"
                            link="/admin/onboarding"
                        />
                        <AdminSidenavComponents
                            icon={<UsersIcon className='h-6'/>}
                            name="Employee Relation"
                            link="/admin/employee_relation"
                        />
                        <AdminSidenavComponents
                            icon={<ShieldCheckIcon className='h-6'/>}
                            name="Employee Wellness"
                            link="/admin/employee_wellness"
                        />
                        <AdminSidenavComponents
                            icon={<UserMinusIcon className='h-6'/>}
                            name="Attrition"
                            link="/admin/attrition"
                        />
                        <AdminSidenavComponents
                            icon={<GiftIcon className='h-6'/>}
                            name="Engagement Section"
                            link="/admin/engagement_section"
                        />
                        <AdminSidenavComponents
                            icon={<UserCircleIcon className='h-6'/>}
                            name="Profile"
                            link="/admin/profile"
                        />
                        <AdminSidenavComponents
                            icon={<ArrowLeftEndOnRectangleIcon className='h-6'/>}
                            name="Logout"
                            link="#"
                        />

                    </div>
                </div>
            </aside>
        </div>
    )
}
