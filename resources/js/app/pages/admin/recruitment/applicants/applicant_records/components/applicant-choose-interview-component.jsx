import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import ApplicantVirtualScheduleComponent from "./applicant-virtual-schedule-component";
import ApplicantF2fScheduleComponent from "./applicant-f2f-schedule-component";

export default function ApplicantChooseInterviewComponent({
    open,
    setOpen,
    data,
    status
}) {
    const [f2f, setF2f] = useState(false);
    const [virtual, setVirtual] = useState(false);
    return (
        <div>
            <Modal
                title={`${status} Interview`}
                centered
                visible={open}
                onOk={() => {
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <div className="flex flex-1 gap-2 w-full">
                    <Button
                        type="primary"
                        className="w-full"
                        onClick={() => setF2f(true)}
                    >
                        Face to face Interview
                    </Button>
                    <Button
                        type="primary"
                        className="w-full"
                        onClick={() => setVirtual(true)}
                    >
                        Virtual Interview
                    </Button>
                </div>
            </Modal>
            
            <ApplicantVirtualScheduleComponent
            setOpenDialog={setOpen}
               openDialog={open}
            status={status}
            data={data} open={virtual} setOpen={setVirtual} />
            <ApplicantF2fScheduleComponent 
            status={status}
            setOpenDialog={setOpen}
            openDialog={open}
            data={data}  open={f2f} setOpen={setF2f}/>
        </div>
    );
}
