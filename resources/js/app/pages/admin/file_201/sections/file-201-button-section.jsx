import React from "react";
import File201ChecklistButtonSection from "./file-201-checklist-button-section";
import File201UploadReqsButtonSection from "./file-201-upload-reqs-button-section";
import { useEffect } from "react";
import store from "@/app/store/store";
import { get_job_offer_thunk } from "../../hiring/hiring_section/redux/hiring-thunk";
import { get_applicant_by_app_id_thunk } from "../../final_rate/redux/final-rate-thunk";
export default function File201ButtonSection({data}) {
    useEffect(() => {
        // store.dispatch(get_applicant_by_app_id_thunk(app_id))
        store.dispatch(get_job_offer_thunk)
      }, []);
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <File201ChecklistButtonSection data={data}/>
                <File201UploadReqsButtonSection data={data}/>
            </div>
        </div>
    );
}
