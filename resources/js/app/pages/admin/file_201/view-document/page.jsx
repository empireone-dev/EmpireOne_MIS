import React from "react";
import ViewDocumentSection from "./sections/view-document-section";
import AdminLayout from "../../admin-layout";
import { useEffect } from "react";
import store from "@/app/store/store";
import { get_onboarding_ackdoc_by_app_id_thunk } from "../redux/file-201-thunk";
import { get_onboarding_docu_by_id_thunk } from "../../onboarding/onboarding_docu/redux/onboarding-docu-thunk";
import { get_applicant_by_app_id_thunk } from "../../final_rate/redux/final-rate-thunk";

export default function page() {
    const app_id = window.location.pathname.split("/")[4];
    const id = window.location.pathname.split("/")[5];
    useEffect(() => {
        store.dispatch(get_onboarding_ackdoc_by_app_id_thunk(app_id));
        store.dispatch(get_onboarding_docu_by_id_thunk(id));
        store.dispatch(get_applicant_by_app_id_thunk(app_id));
    }, []);
    return (
        <>
            <ViewDocumentSection />
        </>
    );
}
