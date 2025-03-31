import { Menu } from "antd";
import React from "react";

export default function ApplicantCvFileComponent({ data, item }) {
    function openHandler() {
        if (data?.cvfile?.file) {
            window.open(data.cvfile.file, "_blank"); // Opens the file in a new tab
        } else {
            alert("No CV file available.");
        }
    }

    return (
        <>
            <Menu.Item onClick={openHandler} icon={item.icon}>
                {item.label}
            </Menu.Item>
        </>
    );
}
