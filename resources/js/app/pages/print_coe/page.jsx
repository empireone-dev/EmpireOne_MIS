import React, { useEffect } from "react";
import PrintCOEContentSection from "./sections/print-coe-content-section";
import store from "@/app/store/store";
import { get_employee_by_id_thunk } from "../admin/employee_relation/employee_section/redux/employee-section-thunk";

export default function PrintCOEPage() {
  const emp_id = window.location.pathname.split('/')[2]

  useEffect(() => {
    store.dispatch(get_employee_by_id_thunk(emp_id))
  }, [])
  return (
    <div className="px-10">
      <PrintCOEContentSection />
    </div>
  );
}
