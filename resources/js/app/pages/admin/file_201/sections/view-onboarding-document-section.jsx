import App from "@/app/pages/_components/summernote-editor2";
import Wysiwyg from "@/app/pages/_components/wysiwyg";
import store from "@/app/store/store";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import { FileTextFilled } from "@ant-design/icons";

export default function ViewOnboardingDocumentSection({ data }) {
    const { onboarding_ackdoc } = useSelector((state) => state.onboarding_ackdocs);
    const [loading, setLoading] = useState(false);

    const handleViewDocument = () => {
        setLoading(true);
        router.visit(`/admin/file_201/view-document/${data.app_id}/${data.onboarding_doc.id}`, {
            onFinish: () => setLoading(false)
        });
    };

    return (
        <div>
            <div className="">
                <div className="text-center">
                    <button
                        onClick={handleViewDocument}
                        disabled={loading}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
                    >
                        <FileTextFilled />
                    </button>
                </div>
            </div>
        </div>
    );
}
