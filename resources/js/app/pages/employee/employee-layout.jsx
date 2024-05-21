import React from 'react'
import EmployeeSidenavSection from './_section/employee-sidenav-section'

export default function EmployeeLayout({children}) {
  return (
    <>
    <EmployeeSidenavSection />
    <div className="flex flex-wrap ml-9 my-5">
      <div className="w-full max-w-full sm:w-1/4 mx-auto text-center">
      {children}
        <p className="text-lg text-slate-500 py-1">
          Tailwind CSS Component from <a href="https://www.loopple.com/theme/riva-dashboard-tailwind?ref=tailwindcomponents" className="text-slate-700 hover:text-slate-900" target="_blank">Riva Dashboard Library</a> by <a href="https://www.loopple.com" className="text-slate-700 hover:text-slate-900" target="_blank">Loopple Builder</a>.
        </p>
      </div>
    </div>
    </>
  )
}
