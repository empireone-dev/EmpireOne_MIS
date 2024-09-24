import { update_pre_employment_file_service } from "@/app/pages/services/pre-employment-file-service";
import store from "@/app/store/store";
import React from "react";
import { get_applicant_by_app_id_thunk } from "../../final_rate/redux/final-rate-thunk";

export default function File201ApprovedSection({data,setOpen}) {

    const app_id = window.location.pathname.split('/')[3]

   async function on_handler(params) {
      await  update_pre_employment_file_service({
            ...data,
            status:'Approved'
        })
      await  store.dispatch(get_applicant_by_app_id_thunk(app_id))
        setOpen(false)
    }
    return (
        <div className="flex w-full items-center justify-center">
            <button
            onClick={on_handler}
            className="bg-green-500 w-full rounded hover:bg-green-600 p-0.5">
                Approved
            </button>
        </div>
    );
}
