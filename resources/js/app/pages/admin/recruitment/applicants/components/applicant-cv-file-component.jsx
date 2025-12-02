import { IdentificationIcon, NewspaperIcon } from "@heroicons/react/24/outline";
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
            <Tooltip title={`View CV File of ${data?.fname} ${data?.lname}`}>
                <button type="button" onClick={openHandler}>
                    <IdentificationIcon className="h-9 w-9 text-yellow-500 hover:text-yellow-600" />
                </button>
            </Tooltip>
        </>
    );
}
