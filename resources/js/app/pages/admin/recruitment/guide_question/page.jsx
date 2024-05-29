import React from "react";
import AdminLayout from "../../admin-layout";
import GuideQuestionTableSection from "./section/guide-question-table-section";
import store from "@/app/pages/store/store";
import { get_guide_question_thunk } from "./redux/guide-question-thunk";
import { useEffect } from "react";

export default function GuideQuestionPage() {
    useEffect(() => {
        store.dispatch(get_guide_question_thunk())
    }, []);
    return (
        <AdminLayout>
            <GuideQuestionTableSection/>
        </AdminLayout>
    );
}
