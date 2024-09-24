import { PictureFilled, StopOutlined } from "@ant-design/icons";
import { Image, Modal } from "antd";
import React from "react";
import { useState } from "react";
import File201ApprovedSection from "./file-201-approved-section";
import File201ButtonDeclinedSection from "./file-201-button-declined-section";

export default function File201ImageSection({ data }) {
    const [open, setOpen] = useState(false);
    
    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
            >
                <PictureFilled />
            </button>
            <Modal
                title={data.reqs}
                visible={open}
                onCancel={() => setOpen(false)}
                width={800}
                footer={null}
            >
                {data?.reqs_img ? (
                    <Image 
                    src={data.reqs_img}
                    />
                ) : (
                    <p className="flex items-center justify-center text-gray-400 font-sans">
                        <StopOutlined />
                        &nbsp;No image available
                    </p>
                )}
                <div className="flex flex-1 gap-1.5 w-full items-center justify-center mt-3 text-white">
                    {data.status === "Uploaded" ? (
                        <>
                            <File201ApprovedSection
                            setOpen={setOpen}
                            data={data}/>
                            <File201ButtonDeclinedSection
                             setOpen={setOpen}
                            data={data}
                            />
                        </>
                    ) : (
                        <p className="text-center">Status: {data.status}</p>
                    )}
                </div>
            </Modal>
        </div>
    );
}
