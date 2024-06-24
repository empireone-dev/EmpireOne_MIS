import React from "react";
import File201ChecklistButtonSection from "./file-201-checklist-button-section";
import File201UploadReqsButtonSection from "./file-201-upload-reqs-button-section";
export default function File201ButtonSection() {
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <File201ChecklistButtonSection/>
                <File201UploadReqsButtonSection/>
            </div>
        </div>
    );
}
