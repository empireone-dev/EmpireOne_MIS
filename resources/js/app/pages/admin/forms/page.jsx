import React, { useState } from "react";
import FormsTableSection from "./sections/forms-table-section";
import AdminLayout from "../admin-layout";
import UploadFormSection from "./sections/upload-form-section";

export default function page() {
    const [uploadOpen, setUploadOpen] = useState(false);

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => setUploadOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-white-500 rounded-lg hover:bg-blue-100 hover:text-blue-500 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1"
                >
                    + Upload Form
                </button>
            </div>
            <UploadFormSection
                open={uploadOpen}
                onClose={() => setUploadOpen(false)}
            />
            <FormsTableSection />
        </AdminLayout>
    );
}
