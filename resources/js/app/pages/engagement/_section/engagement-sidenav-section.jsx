import React from 'react'
import EngagementSidenavComponents from '../_components/engagement-sidenav-components'
import { ArrowLeftEndOnRectangleIcon, Cog6ToothIcon, GiftIcon, HomeIcon, ShieldCheckIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function EngagementSidenavSection() {
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
                            <a href="javascript:void(0)" className=" hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium  text-secondary-inverse">Sarah Bangbang</a>
                            <span className="  font-medium block text-[0.85rem] italic">SEO Manager</span>
                        </div>
                    </div>
                </div>

                <div className="hidden border-b border-dashed lg:block  border-neutral-200"></div>

                <div className="relative px-3 my-5 ">
                    <div className="flex flex-col w-full font-medium">
                        <EngagementSidenavComponents
                            icon={<HomeIcon className='h-6'/>}
                            name="Dashboard"
                            link="/engagement/dashboard"
                        />
                        
                        <EngagementSidenavComponents
                            icon={<UsersIcon className='h-6'/>}
                            name="Employee Relation"
                            link="/engagement/employee_relation"
                        />

                        <EngagementSidenavComponents
                            icon={<ShieldCheckIcon className='h-6'/>}
                            name="Employee Wellness"
                            link="/engagement/employee_wellness"
                        />
                      
                        <EngagementSidenavComponents
                            icon={<GiftIcon className='h-6'/>}
                            name="Engagement Section"
                            link="/engagement/engagement_section"
                        />
                        <EngagementSidenavComponents
                            icon={<UserCircleIcon className='h-6'/>}
                            name="Profile"
                            link="/engagement/profile"
                        />
                        <EngagementSidenavComponents
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
