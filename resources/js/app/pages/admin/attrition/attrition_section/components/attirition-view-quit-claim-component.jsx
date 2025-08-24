import { Menu } from "antd";
import React from "react";

export default function AttritionViewQuitClaimComponent({ data, item }) {
    function openHandler() {
        if (data?.quit_claim?.file) {
            window.open(data.quit_claim.file, "_blank");
        } else {
            alert("No Quit Claim available.");
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
