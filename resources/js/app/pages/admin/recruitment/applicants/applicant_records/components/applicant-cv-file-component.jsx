import { NewspaperIcon } from "@heroicons/react/24/outline";
import { Menu, Tooltip } from "antd";
import React from "react";

export default function ApplicantCvFileComponent({ data, item }) {
    function openHandler() {
        if (data?.cvfile?.file) {
            window.open(data?.cvfile?.file, "_blank");
        } else {
            alert("No CV file available.");
        }
    }

    return (
        <>
            <Tooltip title="View CV File">
                <button type="button" onClick={openHandler}>
                    <NewspaperIcon className="h-8 w-7 text-blue-500" />
                </button>
            </Tooltip>
        </>
    );
}
