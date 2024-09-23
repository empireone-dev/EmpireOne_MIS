import { PictureFilled } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { useState } from "react";

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
                title="(Pre Employment Requirements' Name)"
                visible={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <p>{data.reqs}</p>
                <img src={data.reqs_img} alt="" />
                <div className="flex flex-1 gap-1 w-full items-center justify-center mt-2 text-white">
                    {data.status === "Uploaded" ? (
                        <>
                            <div className="flex w-full items-center justify-center">
                                <button className="bg-green-500 w-full rounded hover:bg-green-600 p-0.5">
                                    Approved
                                </button>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <button className="bg-red-500 w-full rounded hover:bg-red-600 p-0.5">
                                    Declined
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center">Status: {data.status}</p>
                    )}
                </div>
            </Modal>
        </div>
    );
}
