import { Menu } from "antd";
import React from "react";
import { useState } from "react";

export default function ApplicantSetScheduleFinalComponent({ data, item }) {
    const [open, setOpen] = useState(false);
    function openHandler(params) {
        setOpen(true);
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
        </>
    );
}
