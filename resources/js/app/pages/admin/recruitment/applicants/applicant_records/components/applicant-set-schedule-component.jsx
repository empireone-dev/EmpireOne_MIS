import { Menu } from "antd";
import React from "react";
import { useState } from "react";
import ApplicantChooseInterviewComponent from "./applicant-choose-interview-component";

export default function ApplicantSetScheduleComponent({ data, item,status }) {
    const [open, setOpen] = useState(false);

    function openHandler(params) {
        setOpen(true);
    }
    return (
        <>
            <Menu.Item onClick={() => openHandler(true)} icon={item.icon}>
                {item.label}
            </Menu.Item>
            <ApplicantChooseInterviewComponent 
            status={status}
            setOpen={setOpen}
            open={open}
            data={data}
            />
        </>
    );
}
