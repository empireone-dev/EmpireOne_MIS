import React from "react";
import AdminLayout from "../../admin-layout";
import GuideQuestionTableSection from "./section/guide-question-table-section";
import { get_guide_question_thunk } from "./redux/guide-question-thunk";
import { useEffect } from "react";
import store from "@/app/store/store";

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
