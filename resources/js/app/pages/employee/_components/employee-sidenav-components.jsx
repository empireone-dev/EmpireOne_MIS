import { Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function EmployeeSidenavComponents({name, link, icon}) {
    const { url } = usePage()
  return (
    <Link  href={link} className={`select-none flex gap-2 items-center px-4 py-2 ${url == link ? 'bg-blue-500 text-white' : 'text-stone-500 hover:bg-blue-100'} cursor-pointer my-1 rounded-md`}>
   {icon} <div className="flex items-center flex-grow text-[1.15rem] ">{name}</div>
    </Link>
  )
}
